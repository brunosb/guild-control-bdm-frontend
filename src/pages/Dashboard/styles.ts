import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const PlayersContent = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 30px auto;

  div {
    margin: 5px auto;
  }
`;

export const TitleGuild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
