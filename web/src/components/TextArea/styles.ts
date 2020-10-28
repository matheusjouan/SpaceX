import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  &:focus-within::after {
    content: '';
    width: calc(100% - 50px);
    height: 2px;
    background: #22223b;
    position: absolute;
    left: 25px;
    right: 25px;
    bottom: 45px;
  }

  label {
    display: flex;
    color: #666;
    line-height: 24px;
  }

  textarea {
    width: 100%;
    height: 200px;
    margin: 10px 0 20px;
    border-radius: 20px;
    background: #eee;
    border: 1px solid #eee;
    outline: 0;
    resize: none;
    padding: 18px 20px;
  }

  span {
    display: block;
    margin-top: -20px;
    margin-left: 15px;
    height: 21px;
    color: #c53030;
  }
`;
