import React, { useRef, useCallback, useMemo } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';

import Modal from '../index';
import Input from '../../Input';
import Button from '../../Button';

import { Container } from './styles';

interface IUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

export interface IUserEditData {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  cpf: string;
  city: string;
  state: string;
  country: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  userData: IUser;
  handleEditForm: (user: IUserEditData) => void;
}

const ModalEditUser: React.FC<IModalProps> = ({
  isOpen,
  handleEditForm,
  userData,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IUserEditData) => {
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

        handleEditForm({
          ...data,
          id: userData.id,
        });

        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        console.log(err);
      }
    },
    [handleEditForm, userData.id, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <section>
          <h1>Editar Dados do Usuário</h1>

          <Form
            onSubmit={handleSubmit}
            ref={formRef}
            initialData={{
              ...userData,
              firstName: userData.name ? userData.name.split(' ')[0] : '',
              surname: userData.name ? userData.name.split(' ')[1] : '',
            }}
          >
            <div className="input-group">
              <Input
                name="firstName"
                label="Primeiro nome:"
                className="group"
              />

              <Input name="surname" label="Sobrenome:" className="group" />
            </div>

            <div className="input-group">
              <Input name="email" label="E-mail:" className="group" />

              <Input name="cpf" label="CPF:" className="group" />
            </div>

            <div className="input-group">
              <Input name="city" label="Cidade:" className="group" />

              <Input name="state" label="Estado:" className="group" />

              <Input name="country" label="País:" className="group" />
            </div>

            <div className="actions">
              <Button typeOfButton="closed" onClick={setIsOpen}>
                Fechar
              </Button>
              <Button type="submit" typeOfButton="success">
                Editar
              </Button>
            </div>
          </Form>
        </section>
      </Container>
    </Modal>
  );
};

export default ModalEditUser;
