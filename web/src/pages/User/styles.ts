import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Content = styled.main`
  flex: 1;
  padding: 40px 80px;
  margin-left: 200px;

  section {
    width: 100%;
    margin: 0 auto 40px;
    background: #fff;
    padding: 30px 50px;
    border-radius: 20px;

    h1 {
      font-size: 26px;
      margin-bottom: 20px;
      border-bottom: 1px solid #7a7a7a;
    }

    table {
      width: 100%;
      border-spacing: 0 0px;

      thead {
        margin: 0 auto;
        padding-top: -20px;
        margin-top: -20px;

        th {
          color: #fff;
          text-align: left;
          padding: 20px 32px;
          line-height: 24px;
          background: #3a3a3a;
        }
      }

      td {
        text-align: left;
        padding: 20px 32px;
        background: #fff;
        border-bottom: 1px solid #7a7a7a;
      }
    }

    div.addUser {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;

      a {
        display: flex;
        align-items: center;

        max-width: 230px;
        padding: 10px 15px;
        color: #fff;
        background: #000080;
        border: 0;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
      }
      svg {
        margin-right: 10px;
      }
    }
  }
`;

export const Button = styled.button`
  color: #3a3a3a;
  border: 1px solid;
  padding: 5px 5px;
  border-radius: 6px;
  border: 0;

  & + button {
    margin-left: 10px;
  }

  &.trash {
    background: #c53030;
    color: #fff;
  }

  &.info {
    background: #000080;
    color: #fff;
  }

  &.edit {
    background: #ffbf00;
    color: #fff;
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 10px;
  padding-bottom: 20px;

  button {
    display: flex;
    justify-content: center;
    border: 0;
    background: transparent;
    margin: 0 10px;

    :disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  span {
    color: #389cf2;
  }
`;
