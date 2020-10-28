import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Content = styled.main`
  flex: 1;

  padding: 20px 80px;
  margin-left: 200px;

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

      div.inputText {
        margin-bottom: 20px;
      }

      div.textarea {
        margin-bottom: 20px;
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
  }
`;
