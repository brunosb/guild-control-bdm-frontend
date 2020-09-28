import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Redirect } from 'react-router-dom';
import sort from 'fast-sort';
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

interface Member {
  id: string;
  name: string;
  whatsapp: string;
  classe: string;
  sub_class: string;
  permission: 'Master' | 'Officer' | 'Player';
  cp: number;
  strike: number | null;
  active: boolean;
}

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

  const { data } = useFetch<Member[]>('/users/list');

  useEffect(() => {
    if (data) {
      sort(data).by([
        { asc: 'permission' },
        {
          asc: 'name',
          comparer: new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base',
          }).compare,
        },
      ]);
      data.sort((a, b) => {
        const scoreA = a.active ? 1 : 0;
        const scoreB = b.active ? 1 : 0;
        return scoreB - scoreA;
      });

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
      });
    } else {
      formRef.current?.reset();
      formRef.current?.setFieldValue('classe', 'default');
      formRef.current?.setFieldValue('sub_class', 'default');
      formRef.current?.setFieldValue('permission', 'default');
    }
  }, [playerSelect]);

  const handleChangeActive = useCallback(async (id: string) => {
    console.log(`change active id: ${id}`);
  }, []);

  const handleAddStrike = useCallback(async (id: string) => {
    console.log(`clicou no add strike no player: ${id}`);
  }, []);

  const handleRemoveStrike = useCallback(async (id: string) => {
    console.log(`clicou no remove strike no player: ${id}`);
  }, []);

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
      console.log(formData);
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

        addToast({
          type: 'success',
          title: 'Membro cadastrado/ atualizado!',
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
          title: 'Erro ao salvar',
          description:
            'Ocorreu um erro ao salvar/atualizar membro, tente novamente.',
        });
      }
    },
    [addToast],
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
                onClick={() => handleRemoveStrike(row.id)}
              >
                <FiMinus />
              </Button>
              <span>{row.strike}</span>
              <Button
                style={{ height: '16px', width: '16px', padding: 0, margin: 0 }}
                onClick={() => handleAddStrike(row.id)}
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
    [handleAddStrike, handleRemoveStrike, handleChangeActive],
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
            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
            <Input
              name="cp"
              type="text"
              icon={FiThermometer}
              placeholder="10000"
            />
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
            {user.permission === 'Master' && (
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
            )}
            <Input
              name="whatsapp"
              type="text"
              icon={FiPhone}
              placeholder="(99) 99999-9999"
            />
            {playerSelect === null && (
              <Input
                name="password"
                icon={FiLock}
                placeholder="Senha"
                type="password"
              />
            )}
            <Button type="submit">Salvar</Button>
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
