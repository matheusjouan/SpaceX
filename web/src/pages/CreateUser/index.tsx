import React, { useCallback, useRef } from 'react';

import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, Content } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface ICreateUser {
  firstName: string;
  surname: string;
  email: string;
  cpf: string;
  city: string;
  state: string;
  country: string;
}

const CreateUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack, push } = useHistory();

  const handleSubmit = useCallback(
    async (data: ICreateUser) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          firstName: Yup.string().required('Primeiro nome obrigatório'),
          surname: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          cpf: Yup.string().required('CPF obrigatório'),
          city: Yup.string().required('Cidade obrigatória'),
          state: Yup.string().required('Estado obrigatório'),
          country: Yup.string().required('País obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        push('/users');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        console.log(err);
      }
    },
    [push],
  );

  return (
    <Container>
      <Sidebar />

      <Content>
        <section>
          <h1>Cadastro Usuário</h1>

          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className="input-group">
              <Input
                name="firstName"
                label="Primeiro nome:"
                className="group"
                placeholder="Digite seu primeiro nome"
              />

              <Input
                name="surname"
                label="Sobrenome:"
                className="group"
                placeholder="Digite seu sobrenome"
              />
            </div>

            <div className="input-group">
              <Input
                name="email"
                label="E-mail:"
                className="group"
                placeholder="Digite seu e-mail"
              />

              <Input
                name="cpf"
                label="CPF:"
                className="group"
                placeholder="Digite seu CPF"
              />
            </div>

            <div className="input-group">
              <Input
                name="city"
                label="Cidade:"
                className="group"
                placeholder="Digite sua cidade"
              />

              <Input
                name="state"
                label="Estado:"
                className="group"
                placeholder="Digite seu estado"
              />

              <Input
                name="country"
                label="País:"
                className="group"
                placeholder="Digite seu país"
              />
            </div>

            <div className="actions">
              <Button typeOfButton="back" onClick={() => goBack()}>
                Voltar
              </Button>
              <Button type="submit" typeOfButton="success">
                Cadastrar
              </Button>
            </div>
          </Form>
        </section>
      </Content>
    </Container>
  );
};

export default CreateUser;
