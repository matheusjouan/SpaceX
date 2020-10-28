import styled from 'styled-components';

export const Container = styled.div`
  label {
    display: inline-block;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    text-transform: uppercase;
    text-decoration: none;
    line-height: 1.1;
    font-weight: normal;
    font-family: sans-serif;
    color: #222;
    font-size: 16px;
    background-color: #cfcfcf;
    background-image: -webkit-linear-gradient(
      top,
      #d2d2d2 0%,
      #e3e3e3 48%,
      #cfcfcf 49%,
      #cfcfcf 82%,
      #ddd 100%
    );
    background-image: -moz-linear-gradient(
      top,
      #d2d2d2 0%,
      #e3e3e3 48%,
      #cfcfcf 49%,
      #cfcfcf 82%,
      #ddd 100%
    );
    background-image: -o-linear-gradient(
      top,
      #d2d2d2 0%,
      #e3e3e3 48%,
      #cfcfcf 49%,
      #cfcfcf 82%,
      #ddd 100%
    );
    background-image: linear-gradient(
      top,
      #d2d2d2 0%,
      #e3e3e3 48%,
      #cfcfcf 49%,
      #cfcfcf 82%,
      #ddd 100%
    );
    border-color: hsl(0, 0%, 61%);
    -webkit-box-shadow: inset 0 0 1px 1px #fff, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: inset 0 0 1px 1px #fff, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 0 1px 1px #fff, 0 0 1px 3px rgba(0, 0, 0, 0.15);
    -webkit-text-shadow: 1px 1px 1px #9c9c9c;
    -moz-text-shadow: 1px 1px 1px #9c9c9c;
    -o-text-shadow: 1px 1px 1px #9c9c9c;
    text-shadow: 1px 1px 1px #9c9c9c;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    padding: 6px 15px 6px 15px;
  }

  input {
    visibility: hidden;
  }

  span {
    display: block;
    margin-top: 5px;
    margin-left: 15px;
    height: 21px;
    color: #c53030;
  }
`;
