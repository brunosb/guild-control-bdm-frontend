import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { FiSlash } from 'react-icons/fi';
import { loadIconClass } from '../../hooks/useClassIcon';

import {
  FlippyStyle,
  FrontSideStyle,
  BackSideStyle,
  FrontSideContent,
  BackSideContent,
  Participation,
  NodeParticipation,
  GvGParticipation,
} from './styles';

interface Player {
  player: {
    name: string;
    whatsapp: string;
    classe: string;
    sub_class: string;
    permission: 'Master' | 'Officer' | 'Player';
    cp: number;
    active: boolean;
    avatar_url: string;
  };
}

const FlippeCard: React.FC<Player> = ({ player }) => {
  const iconClass = loadIconClass(player.classe);

  return (
    <Flippy flipOnClick flipDirection="horizontal" style={FlippyStyle}>
      <FrontSide style={FrontSideStyle}>
        <FrontSideContent>
          {iconClass !== null ? (
            <img src={iconClass} alt={player.classe} />
          ) : (
            <FiSlash />
          )}
          <span>{player.name}</span>
          <span>{player.cp}</span>
          <span>{player.classe}</span>
          <span>{player.sub_class}</span>
        </FrontSideContent>
      </FrontSide>

      <BackSide style={BackSideStyle}>
        <BackSideContent>
          <strong>{player.name}</strong>
          <Participation>
            <NodeParticipation>
              <span>Node War</span>
              <span>30/08/2020</span>
            </NodeParticipation>
            <GvGParticipation>
              <span>GvG</span>
              <span>29/08/2020</span>
            </GvGParticipation>
          </Participation>
        </BackSideContent>
      </BackSide>
    </Flippy>
  );
};

export default FlippeCard;
