import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const ProfileContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 20px;

  h2 {
    margin-bottom: 10px;
  }
`;

export const ClasseIconAvatar = styled.div`
  width: 130px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 2px solid #f4ede8;
  border-radius: 50%;

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    border-radius: 50%;
  }
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  div {
    margin: 0 0 0 5px;
  }
`;
