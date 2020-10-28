import styled, { css } from 'styled-components';

interface ButtonProps {
  typeOfButton?: 'back' | 'closed' | 'success';
}

const buttonTypeVariations = {
  back: css`
    background: #000080;
    color: #fff;
  `,

  closed: css`
    background: #c53030;
    color: #fff;
  `,

  success: css`
    background: #04ae28;
    color: #fff;
  `,
};

export const Container = styled.button<ButtonProps>`
  width: 120px;
  height: 40px;
  font-weight: bold;
  border: 0;
  border-radius: 8px;
  color: #fff;
  ${props => buttonTypeVariations[props.typeOfButton || 'back']}

  & + button {
    margin-left: 20px;
  }

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
