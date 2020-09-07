import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiCalendar, FiSlack, FiUsers, FiHome } from 'react-icons/fi';

import {
  Container,
  HeaderContainer,
  HeaderContent,
  Profile,
  Menu,
  MenuItem,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

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

          <Menu>
            <MenuItem>
              <FiHome />
              <Link to="/dashboard">
                <strong>Home</strong>
              </Link>
            </MenuItem>
            <MenuItem>
              <FiCalendar />
              <Link to="/calendar-week">
                <strong>Calendário Semanal</strong>
              </Link>
            </MenuItem>
            <MenuItem>
              <FiSlack />
              <Link to="/events">
                <strong>Eventos</strong>
              </Link>
            </MenuItem>

            {user.permission === 'Master' || user.permission === 'Officer' ? (
              <MenuItem>
                <FiUsers />
                <Link to="/register">
                  <strong>Cadastro</strong>
                </Link>
              </MenuItem>
            ) : null}
          </Menu>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
