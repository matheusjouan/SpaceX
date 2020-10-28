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
    max-width: 1200px;
    min-height: 100%;
    margin: 0 auto 40px;
    background: #fff;
    padding: 30px 50px;
    border-radius: 20px;

    h1 {
      font-size: 26px;
      margin-bottom: 30px;
      border-bottom: 1px solid #7a7a7a;
    }

    div.list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-left: 30px;

      div.item {
        position: relative;

        height: 420px;
        width: 300px;
        background: #f2e9e4;
        padding: 20px;
        margin-bottom: 30px;
        border-radius: 20px;

        display: flex;
        flex-direction: column;

        h2 {
          margin-bottom: 10px;
          font-size: 18px;
        }

        img {
          width: 200px;
          height: 200px;
          align-self: center;
        }

        p {
          margin-top: 20px;
        }

        button {
          position: absolute;
          bottom: 20px;
          right: 30px;

          width: 120px;
          padding: 5px 10px;
          background: #000080;
          color: #fff;
          border: 0;
        }
      }
    }
  }
`;
