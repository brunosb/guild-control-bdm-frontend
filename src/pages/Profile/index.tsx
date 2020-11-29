import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { mask, unMask } from 'remask';

import {
  FiUser,
  FiThermometer,
  FiLock,
  FiPhone,
  FiAnchor,
  FiAperture,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Button from '../../components/Button';
import { loadIconClass, allClass } from '../../hooks/useClassIcon';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import Member from '../../providers/models/IMemberProvider';
import Header from '../../components/Header';
import {
  Container,
  Content,
  ProfileContent,
  ContentForm,
  FormLine,
  ClasseIconAvatar,
} from './styles';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [iconClasse, setIconClasse] = useState<string | null>(null);

  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const allClasses = allClass();
  const classesOptions = allClasses.map((classe) => {
    return { value: classe, label: classe };
  });

  const maskWhatsapp = [
    '(99) 9999-9999',
    '(99) 9 9999-9999',
    '+99 (99) 9999-9999',
    '+99 (99) 9 9999-9999',
  ];

  useEffect(() => {
    if (user) {
      setIconClasse(loadIconClass(user.classe));
      formRef.current?.setData({
        name: user?.name,
        cp: user?.cp,
        classe: user?.classe,
        sub_class: user?.sub_class,
        whatsapp: mask(user?.whatsapp, maskWhatsapp),
        password: '',
      });
    }
  }, [user, maskWhatsapp]);

  const handleClasseChange = useCallback((event) => {
    setIconClasse(loadIconClass(event.target.value));
  }, []);

  const handleOnChangeWhatsappField = useCallback(() => {
    formRef.current?.setFieldValue(
      'whatsapp',
      mask(unMask(formRef.current?.getFieldValue('whatsapp')), maskWhatsapp),
    );
  }, [maskWhatsapp]);

  const handleSubmit = useCallback(
    async (formData: Member) => {
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
          whatsapp: Yup.string().required('Número obrigatório'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        formData.name = formData.name.trim();
        formData.whatsapp = unMask(formData.whatsapp);

        const { id, permission } = user;
        const userForm = {
          id,
          permission,
          ...formData,
        };

        const memberUpdated = (await api.put<Member>('/profile', userForm))
          .data;

        if (memberUpdated) {
          updateUser(memberUpdated);

          history.push('/');

          addToast({
            type: 'success',
            title: 'Membro / atualizado!',
            description:
              'Informações do membro foram atualizada(s) com sucesso.',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: `Membro ${user.name} não  atualizado!`,
          description: err.response.data.message,
        });
      }
    },
    [addToast, user, history, updateUser],
  );

  return (
    <Container>
      <Header />
      <Content>
        <ProfileContent>
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
                <Input
                  name="whatsapp"
                  type="text"
                  icon={FiPhone}
                  placeholder="(99) 9 9999-9999"
                  onChange={handleOnChangeWhatsappField}
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
                <Button type="submit">Salvar</Button>
              </FormLine>
            </ContentForm>
          </Form>
        </ProfileContent>
      </Content>
    </Container>
  );
};

export default Profile;
