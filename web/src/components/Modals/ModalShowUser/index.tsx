import React, { useCallback } from 'react';

import { Form } from '@unform/web';

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

// export interface IUserEditData {
//   id: string;
//   firstName: string;
//   surname: string;
//   email: string;
//   cpf: string;
//   city: string;
//   state: string;
//   country: string;
// }

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  userData: IUser;
}

const ModalShowUser: React.FC<IModalProps> = ({
  isOpen,
  userData,
  setIsOpen,
}) => {
  const handleSubmit = useCallback(() => {
    return false;
  }, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <section>
          <h1>Informação do Usuário</h1>

          <Form
            onSubmit={() => handleSubmit}
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
                readOnly
              />

              <Input
                name="surname"
                label="Sobrenome:"
                className="group"
                readOnly
              />
            </div>

            <div className="input-group">
              <Input name="email" label="E-mail:" className="group" readOnly />

              <Input name="cpf" label="CPF:" className="group" readOnly />
            </div>

            <div className="input-group">
              <Input name="city" label="Cidade:" className="group" readOnly />

              <Input name="state" label="Estado:" className="group" readOnly />

              <Input name="country" label="País:" className="group" readOnly />
            </div>

            <div className="actions">
              <Button typeOfButton="closed" onClick={setIsOpen}>
                Fechar
              </Button>
            </div>
          </Form>
        </section>
      </Container>
    </Modal>
  );
};

export default ModalShowUser;
