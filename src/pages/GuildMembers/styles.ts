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

export const Profile = styled.div`
  width: 50vw;
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

export const Settings = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50vw;
  height: 100%;

  .table-members {
    padding: 0 10px;
  }

  .table-members header {
    padding: 0;
  }

  .table-members .rdt_TableHeadRow {
    border-bottom: 2px solid #ff9000;
  }

  .table-members .rdt_Table .rdt_TableBody {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .table-members .rdt_Table .rdt_TableBody::-webkit-scrollbar {
    width: 0.5em;
  }
  .table-members .rdt_Table .rdt_TableBody::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(35, 33, 41, 0.7);
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  .table-members .rdt_Table .rdt_TableBody::-webkit-scrollbar-thumb {
    background-color: #ff9000;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    box-shadow: inset 0 0 3px rgba(35, 33, 41, 0.7);
  }
`;
