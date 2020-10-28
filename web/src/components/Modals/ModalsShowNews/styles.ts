import styled from 'styled-components';

export const Container = styled.main`
  height: 100%;

  h1 {
    font-size: 26px;
    margin-bottom: 50px;
    border-bottom: 1px solid #7a7a7a;
  }

  section {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    padding: 30px 50px;
    border-radius: 20px;

    div.actions {
      width: 100%;
      margin-top: 30px;

      display: flex;
      justify-content: flex-end;
    }
  }
`;

export const News = styled.div`
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    img {
      max-width: 300px;
      margin-right: 30px;
    }

    div.newsInfo {
      align-self: flex-start;

      display: flex;
      flex-direction: column;

      span {
        margin-top: 10px;
        font-size: 14px;
        color: #7c7c7c;
      }
    }
  }
`;
