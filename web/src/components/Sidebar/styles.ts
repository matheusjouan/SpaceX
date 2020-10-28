import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  height: 100%;
  padding: 15px 30px;

  border: 1px solid #eee;
  background: linear-gradient(329.54deg, #4a4e69 0%, #4a4259 100%);

  nav {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 18px;
      color: #fff;
      letter-spacing: 0.5px;

      &::after {
        content: '';
        width: calc(200px - 60px);
        border-bottom: 1px solid #fff;
        margin: 10px 0;
      }
    }

    a {
      display: flex;
      align-items: center;

      margin: 10px 0;
      color: #fff;
      transition: color 0.3s;

      &:hover {
        color: #22223b;
      }

      svg {
        margin-right: 20px;
      }
    }
  }
`;

/**
 * azul escuro: 22223b
 * azul-ciza: 4a4e69
 * cinza-roxo: 9a8c98
 * marrom: c9ada7
 * claro: f2e9e4
 */

//   background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);
