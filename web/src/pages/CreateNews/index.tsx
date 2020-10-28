import React, { useCallback, useRef } from 'react';

import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import InputFile from '../../components/InputFile';

import api from '../../services/api';

import { Container, Content } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import TextArea from '../../components/TextArea';

interface ICreateNews {
  title: string;
  description: string;
  image: File;
}

const CreateNews: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack, push } = useHistory();

  const handleSubmit = useCallback(
    async (data: ICreateNews) => {
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

        const dataFormData = new FormData();

        dataFormData.append('title', data.title);
        dataFormData.append('description', data.description);
        dataFormData.append('image', data.image);

        await api.post('/news', dataFormData);
        push('/news');
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
          <h1>Cadastro de Notícias</h1>

          <Form onSubmit={handleSubmit} ref={formRef}>
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

export default CreateNews;
