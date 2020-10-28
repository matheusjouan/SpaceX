import React, { useRef, useCallback } from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';

import Modal from '../index';
import Input from '../../Input';
import Button from '../../Button';
import TextArea from '../../TextArea';
import InputFile from '../../InputFile';

import { Container } from './styles';

export interface INewsEdit {
  id: string;
  title: string;
  image: File;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  newsData: INewsEdit;
  handleEditForm: (news: INewsEdit) => void;
}

const ModalEditUser: React.FC<IModalProps> = ({
  isOpen,
  handleEditForm,
  newsData,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: INewsEdit) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
          image: Yup.string().required('Imagem obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleEditForm({
          ...data,
          id: newsData.id,
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
    [handleEditForm, newsData.id, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <section>
          <h1>Editar Dados da Notícia</h1>

          <Form onSubmit={handleSubmit} ref={formRef} initialData={newsData}>
            <Input
              name="title"
              label="Título da Notícia:"
              placeholder="Digite o título da notícia"
              className="inputText"
            />

            <TextArea
              name="description"
              label="Descrição da notícia:"
              placeholder="Digite a notícia"
              className="textarea"
            />

            <InputFile
              name="image"
              label="Selecione uma imagem"
              className="inputFile"
            />

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
