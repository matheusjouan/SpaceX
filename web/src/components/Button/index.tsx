import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  typeOfButton?: 'back' | 'closed' | 'success';
};

const Button: React.FC<ButtonProps> = ({ typeOfButton, children, ...rest }) => (
  <Container type="button" typeOfButton={typeOfButton} {...rest}>
    {children}
  </Container>
);

export default Button;
