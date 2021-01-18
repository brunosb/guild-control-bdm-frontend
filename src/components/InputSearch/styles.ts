import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  ${(props) =>
    props.isFocused &&
    css`
      color: #f99000;
      border-color: #f99000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #f99000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  button {
    background: transparent;
    border: 0;
    color: #f99000;
  }

  svg {
    margin-right: 16px;
  }
`;
