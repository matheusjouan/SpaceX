import React, { useState, useEffect } from 'react';

import Modal from '../index';
import Button from '../../Button';

import { Container, News } from './styles';

interface INews {
  id: string;
  title: string;
  url_image: string;
  description: string;
  formattedData: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  newsData: INews;
}

const ModalShowNews: React.FC<IModalProps> = ({
  isOpen,
  newsData,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <section>
          <h1>{newsData.title}</h1>

          <News>
            <div>
              <img src={newsData.url_image} alt={newsData.title} />
              <div className="newsInfo">
                <p>{newsData.description}</p>
                <span>Publicado em: {newsData.formattedData}</span>
              </div>
            </div>
          </News>

          <div className="actions">
            <Button typeOfButton="closed" onClick={setIsOpen}>
              Fechar
            </Button>
          </div>
        </section>
      </Container>
    </Modal>
  );
};

export default ModalShowNews;
