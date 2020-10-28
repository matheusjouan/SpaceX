import styled from 'styled-components';

export const Container = styled.main`
  height: 100%;

  h1 {
    font-size: 26px;
    margin-bottom: 20px;
    border-bottom: 1px solid #7a7a7a;
  }

  section {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 30px 50px;
    border-radius: 20px;

    form {
      div.input-group {
        width: 100%;
        display: flex;
        margin-bottom: 20px;

        div.group {
          width: 100%;
          & + div.group {
            margin-left: 40px;
          }
        }
      }

      div.actions {
        margin-top: 30px;
        width: 100%;

        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
`;
