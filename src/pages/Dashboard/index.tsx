import React from 'react';

import Header from '../../components/Header';
import FlippeCard from '../../components/FlippeCard';
import { useFetch } from '../../hooks/useFetch';

import { Container, Content, PlayersContent, TitleGuild } from './styles';

import Member from '../../providers/models/IMemberProvider';
import sortMembers from '../../utils/sortMembers';

const Dashboard: React.FC = () => {
  const { data } = useFetch<Member[]>({
    url: '/users/list',
    params: {},
  });

  if (!data) {
    return <h1>Carregando...</h1>;
  }

  sortMembers(data);

  return (
    <Container>
      <Header />
      <Content>
        <TitleGuild>
          <h1>Brasucas</h1>
        </TitleGuild>
        <PlayersContent>
          {data?.map(
            (player) =>
              player.active && <FlippeCard key={player.id} player={player} />,
          )}
        </PlayersContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
