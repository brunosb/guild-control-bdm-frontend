import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';

import DataTable, {
  IDataTableColumn,
  createTheme,
} from 'react-data-table-component';
import { Toggle } from 'react-toggle-component';
import {
  FiPlus,
  FiMinus,
  FiUser,
  FiThermometer,
  FiLock,
  FiPhone,
  FiAward,
  FiAnchor,
  FiAperture,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Header from '../../components/Header';

import {
  Container,
  Content,
  Profile,
  ContentForm,
  FormLine,
  Settings,
  ClasseIconAvatar,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { useFetch } from '../../hooks/useFetch';
import Button from '../../components/Button';
import { loadIconClass, allClass } from '../../hooks/useClassIcon';
import Input from '../../components/Input';
import Select from '../../components/Select';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import Member from '../../providers/models/IMemberProvider';
import sortMembers from '../../utils/sortMembers';

interface MemberFormData {
  name: string;
  whatsapp: string;
  classe: string;
  sub_class: string;
  permission: 'Master' | 'Officer' | 'Player';
  cp: number;
  password: string;
}

const GuildMembers: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [playerSelect, setPlayerSelect] = useState<Member | null>(null);
  const [iconClasse, setIconClasse] = useState<string | null>(null);

  const { user } = useAuth();
  const leader = user.permission === 'Master' || user.permission === 'Officer';
  const { addToast } = useToast();

  const allClasses = allClass();
  const classesOptions = allClasses.map((classe) => {
    return { value: classe, label: classe };
  });

  const { data } = useFetch<Member[]>({ url: '/users/list' });

  function clearForm(): void {
    formRef.current?.reset();
    formRef.current?.setFieldValue('classe', 'default');
    formRef.current?.setFieldValue('sub_class', 'default');
    formRef.current?.setFieldValue('permission', 'default');
  }

  useEffect(() => {
    if (data) {
      sortMembers(data);

      setMembers([...data]);
    }
  }, [data]);

  useEffect(() => {
    if (playerSelect) {
      formRef.current?.setData({
        name: playerSelect?.name,
        cp: playerSelect?.cp,
        classe: playerSelect?.classe,
        sub_class: playerSelect?.sub_class,
        permission: playerSelect?.permission,
        whatsapp: playerSelect?.whatsapp,
        password: '',
      });
    } else {
      clearForm();
    }
  }, [playerSelect]);

  const handleChangeActive = useCallback(
    async (id: string) => {
      const memberIndex = members.findIndex((member) => member.id === id);

      try {
        const memberResponse = await api.patch<Member>('/users/change-active', {
          user_id: id,
          active: !members[memberIndex].active,
        });

        const member = memberResponse.data;
        const updateMembers = members.slice();
        updateMembers[memberIndex].active = member.active;
        setMembers([...updateMembers]);

        addToast({
          type: 'success',
          title: 'Membro atualizado!',
          description: `Membro ${members[memberIndex].name} foi atualizado!.`,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: `Membro ${members[memberIndex].name} não atualizado!`,
          description: error.response.data.message,
        });
      }
    },
    [members, addToast],
  );

  const handleAddAndRemoveStrike = useCallback(
    async (id: string, operation: string) => {
      const memberIndex = members.findIndex((member) => member.id === id);
      try {
        const memberResponse = await api.patch<Member>(
          '/users/add-remove-strike',
          {
            user_id: id,
            operation,
          },
        );

        const member = memberResponse.data;
        const updateMembers = members.slice();
        updateMembers[memberIndex].strike = member.strike;
        setMembers([...updateMembers]);

        addToast({
          type: 'success',
          title: 'Membro atualizado!',
          description: `Membro ${members[memberIndex].name} foi atualizado!.`,
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: `Membro ${members[memberIndex].name} não atualizado!`,
          description: error.response.data.message,
        });
      }
    },
    [members, addToast],
  );

  const handleClickRowTable = useCallback(
    (member) => {
      const player = { ...member } as Member;
      setIconClasse(loadIconClass(player.classe));

      if (playerSelect === null) {
        setPlayerSelect(player);
      } else if (playerSelect.id !== player.id) {
        setPlayerSelect(player);
      } else {
        setPlayerSelect(null);
        setIconClasse(null);
      }
    },
    [playerSelect],
  );

  const handleClasseChange = useCallback((event) => {
    setIconClasse(loadIconClass(event.target.value));
  }, []);

  const handleSubmit = useCallback(
    async (formData: MemberFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          cp: Yup.number()
            .required('CP obrigatório')
            .positive('CP precisa ser número positivo')
            .integer(),
          classe: Yup.string()
            .notOneOf(['default'], 'Selecione sua Classe')
            .required(),
          sub_class: Yup.string()
            .notOneOf(['default'], 'Selecione sua Sub Classe')
            .required(),
          permission: Yup.string().notOneOf(['default'], 'Selecione seu Cargo'),
          whatsapp: Yup.string().required('Número obrigatório'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        let memberNewOrUpdated: Member;
        if (playerSelect) {
          memberNewOrUpdated = (
            await api.put<Member>('/profile', {
              id: playerSelect.id,
              ...formData,
            })
          ).data;
        } else {
          memberNewOrUpdated = (await api.post<Member>('/users', formData))
            .data;
        }

        if (memberNewOrUpdated) {
          const indexMember = members.findIndex(
            (member) => member.id === memberNewOrUpdated.id,
          );
          if (indexMember === -1) {
            setMembers(sortMembers([...members, memberNewOrUpdated]));
          } else {
            members[indexMember] = memberNewOrUpdated;
            setMembers(sortMembers([...members]));
          }
        }

        setPlayerSelect(null);
        setIconClasse(null);
        clearForm();

        addToast({
          type: 'success',
          title: 'Membro cadastrado / atualizado!',
          description:
            'Informações do membro foram cadastrada/atualizada com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: `Membro ${
            playerSelect !== null ? playerSelect.name : ''
          } não criado / atualizado!`,
          description: err.response.data.message,
        });
      }
    },
    [members, playerSelect, addToast],
  );

  createTheme('brasucas', {
    text: {
      primary: '#f4ede8',
      secondary: '#f99000',
      disabled: '#666360',
    },
    background: {
      default: '#312e38',
    },
    sortFocus: {
      default: '#f99000',
    },
    divider: {
      default: '#312e38',
    },
    highlightOnHover: {
      default: '#232129',
      text: '#f99000',
    },
  });

  const tableColumns = useMemo<IDataTableColumn[]>(
    () => [
      {
        name: 'id',
        selector: 'id',
        omit: true,
      },
      {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        minWidth: '120px',
      },
      {
        name: 'Classe',
        selector: 'classe',
        sortable: true,
        wrap: true,
        minWidth: '110px',
      },
      {
        name: 'Sub Classe',
        selector: 'sub_class',
        sortable: true,
        minWidth: '110px',
      },
      {
        name: 'Ativo',
        cell: (row) => (
          <Toggle
            name={`active-${row.id}`}
            className={`active-${row.id}`}
            checked={row.active}
            rightBackgroundColor="#312e38"
            leftBackgroundColor="#312e38"
            rightBorderColor="#f99000"
            rightKnobColor="#f99000"
            onToggle={() => handleChangeActive(row.id)}
          />
        ),
        selector: 'active',
        sortable: true,
        ignoreRowClick: true,
        allowOverflow: true,
      },
      {
        name: 'Strike',
        cell: (row) => (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button
                style={{ height: '16px', width: '16px', padding: 0, margin: 0 }}
                onClick={() => handleAddAndRemoveStrike(row.id, 'remove')}
              >
                <FiMinus />
              </Button>
              <span>{row.strike}</span>
              <Button
                style={{ height: '16px', width: '16px', padding: 0, margin: 0 }}
                onClick={() => handleAddAndRemoveStrike(row.id, 'add')}
              >
                <FiPlus />
              </Button>
            </div>
          </>
        ),
        selector: 'strike',
        sortable: true,
        center: true,
      },
      {
        name: 'Permissão',
        selector: 'permission',
        sortable: true,
        center: true,
      },
    ],
    [handleAddAndRemoveStrike, handleChangeActive],
  );

  return leader ? (
    <Container>
      <Header />
      <Content>
        <Profile>
          <h2>Perfil do Membro</h2>
          <ClasseIconAvatar>
            {iconClasse && <img src={iconClasse} alt="ClasseIcon" />}
          </ClasseIconAvatar>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <ContentForm>
              <FormLine>
                <Input
                  name="name"
                  type="text"
                  icon={FiUser}
                  placeholder="Nome"
                />
                <Input
                  name="cp"
                  type="text"
                  icon={FiThermometer}
                  placeholder="10000"
                />
              </FormLine>
              <FormLine>
                <Select
                  placeholder="Classe"
                  onChange={handleClasseChange}
                  name="classe"
                  options={classesOptions}
                  icon={FiAnchor}
                />
                <Select
                  placeholder="Sub Classe"
                  name="sub_class"
                  options={[
                    { label: 'Awakening', value: 'Awakening' },
                    { label: 'Ascension', value: 'Ascension' },
                  ]}
                  icon={FiAperture}
                />
              </FormLine>
              <FormLine>
                <Select
                  placeholder="Cargo"
                  name="permission"
                  options={[
                    { label: 'Master', value: 'Master' },
                    { label: 'Officer', value: 'Officer' },
                    { label: 'Player', value: 'Player' },
                  ]}
                  icon={FiAward}
                />
                <Input
                  name="whatsapp"
                  type="text"
                  icon={FiPhone}
                  placeholder="(99) 99999-9999"
                />
              </FormLine>
              <FormLine>
                <Input
                  name="password"
                  icon={FiLock}
                  placeholder="Senha"
                  type="password"
                />
              </FormLine>
              <FormLine>
                <Button type="submit">
                  {playerSelect === null ? 'Novo Membro' : 'Salvar'}
                </Button>
              </FormLine>
            </ContentForm>
          </Form>
        </Profile>
        <Settings>
          <DataTable
            className="table-members"
            title="Membros da Guild"
            data={members}
            columns={tableColumns}
            fixedHeader
            highlightOnHover
            theme="brasucas"
            onRowClicked={handleClickRowTable}
          />
        </Settings>
      </Content>
    </Container>
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default GuildMembers;
