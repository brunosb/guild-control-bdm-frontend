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
    border-radius: 50%;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin: 0 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
  }

  div {
    width: max-content;
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
