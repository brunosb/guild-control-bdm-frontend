import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const Profile = styled.div`
  height: 100%;
`;

export const Settings = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  .table-members {
    padding: 0 10px;
  }

  .table-members .rdt_Table .rdt_TableBody {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .table-members .rdt_Table .rdt_TableBody::-webkit-scrollbar {
    width: 0.7em;
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
