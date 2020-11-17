import React from 'react';
import { Link } from 'react-router-dom';

import { Container, HeaderContainer, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import Navibar from '../Navibar';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt="Brasucas" />

          <Profile>
            {user.avatar_url && <img src={user.avatar_url} alt={user.name} />}

            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <Navibar />
        </HeaderContent>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
