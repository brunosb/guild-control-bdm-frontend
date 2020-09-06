import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderContainer = styled.header`
  padding: 16px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
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

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  div {
    margin-left: 50px;
  }
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: #f4ede8;
    width: 20px;
    height: 20px;
  }
  a {
    text-decoration: none;
    margin-left: 5px;
    color: #ff9000;
  }

  &:hover {
    opacity: 0.8;
  }
`;
