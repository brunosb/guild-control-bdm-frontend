import React from 'react';
import { FiCalendar, FiHome, FiPower, FiSlack, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Ul, MenuItem } from './styles';

interface UlProps {
  isOpened: boolean;
}

const Menu: React.FC<UlProps> = ({ isOpened }) => {
  const { user, signOut } = useAuth();
  return (
    <Ul isOpened={isOpened}>
      <MenuItem>
        <Link to="/dashboard">
          <FiHome />
          <strong>Home</strong>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/calendar-week">
          <FiCalendar />
          <strong>Calendário Semanal</strong>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/events">
          <FiSlack />
          <strong>Eventos</strong>
        </Link>
      </MenuItem>
      {user.permission === 'Master' || user.permission === 'Officer' ? (
        <MenuItem>
          <Link to="/guild-members">
            <FiUsers />
            <strong>Membros</strong>
          </Link>
        </MenuItem>
      ) : null}
      <MenuItem>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </MenuItem>
    </Ul>
  );
};

export default Menu;
