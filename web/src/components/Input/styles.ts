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
    bottom: 25px;
  }

  label {
    display: flex;
    color: #666;
    margin-bottom: 8px;
    line-height: 24px;
  }

  input {
    width: 100%;
    background: #eee;
    border: 1px solid #eee;
    border: 0;
    border-radius: 20px;
    outline: none;
    color: #222;
    height: 50px;
    padding: 0 16px;
  }

  span {
    display: block;
    margin-top: 5px;
    margin-left: 15px;
    height: 21px;
    color: #c53030;
  }
`;
