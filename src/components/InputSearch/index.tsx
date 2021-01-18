import React, { useCallback, useState } from 'react';
import { FiSearch, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface SearchProps {
  value: string;
  placeholder: string;
  changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearValue: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const InputSearch: React.FC<SearchProps> = ({
  value,
  placeholder,
  changeValue,
  clearValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      <FiSearch />
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={changeValue}
      />
      <button type="button" onClick={clearValue}>
        <FiTrash />
      </button>
    </Container>
  );
};

export default InputSearch;
