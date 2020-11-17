import styled from 'styled-components';
import { shade } from 'polished';

interface BurgerProps {
  isOpened: boolean;
}

export const Container = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  z-index: 9;

  button {
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;

      &:hover {
        color: #f4ede8;
      }
    }
  }
`;

export const Ul = styled.ul<BurgerProps>`
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: space-around;
    background-color: #28262e;
    position: fixed;
    transform: ${({ isOpened }) =>
      isOpened ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
  }
`;

export const MenuItem = styled.li`
  a {
    text-decoration: none;
    color: #ff9000;
    display: flex;
    align-items: center;

    svg {
      color: #f4ede8;
      min-width: 20px;
      min-height: 20px;
    }

    strong {
      margin-left: 5px;
    }
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const BurgerStyled = styled.div`
  display: none;
  cursor: pointer;
  z-index: 10;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }

  svg {
    width: 2rem;
    height: 2rem;
    color: #f4ede8;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;
