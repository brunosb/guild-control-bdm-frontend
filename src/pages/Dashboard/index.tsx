import React from 'react';

import Header from '../../components/Header';
import FlippeCard from '../../components/FlippeCard';
import { useFetch } from '../../hooks/useFetch';

import { Container, Content, PlayersContent, TitleGuild } from './styles';

interface Player {
  id: string;
  name: string;
  whatsapp: string;
  classe: string;
  sub_class: string;
  permission: 'Master' | 'Officer' | 'Player';
  cp: number;
  active: boolean;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { data } = useFetch<Player[]>('/users/list');

  if (!data) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Container>
      <Header />
      <Content>
        <TitleGuild>
          <h1>Brasucas</h1>
        </TitleGuild>
        <PlayersContent>
          {data?.map((player) => (
            <FlippeCard key={player.id} player={player} />
          ))}
        </PlayersContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
