import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Menu from './menu';

import { BurgerStyled } from './styles';

const Burger: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BurgerStyled onClick={() => setOpen(!open)}>
        <FiMenu />
      </BurgerStyled>
      <Menu isOpened={open} />
    </>
  );
};

export default Burger;
