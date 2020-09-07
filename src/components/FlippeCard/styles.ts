import styled from 'styled-components';

export const FlippyStyle = {
  width: '100px',
  height: '140px',
};

export const FrontSideStyle = {};

export const BackSideStyle = {};

export const FrontSideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }

  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }

  span {
    font-size: 10px;
    cursor: default;
  }
`;

export const BackSideContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  cursor: default;
`;
export const Participation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-top: 24px;

  strong {
    margin-bottom: 5px;
  }
`;

export const NodeParticipation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const GvGParticipation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
