import React, {
  SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  containerStyle?: object;
  placeholder: string;
  options: { label: string; value: string }[];
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<Props> = ({
  name,
  containerStyle = {},
  placeholder,
  options,
  icon: Icon,
  ...rest
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(
      !!selectRef.current?.value && selectRef.current?.value !== 'default',
    );
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
      setValue: (ref, value) => {
        ref.value = value;
        handleSelectBlur();
      },
      clearValue: () => {
        handleSelectBlur();
      },
    });
  }, [fieldName, defaultValue, registerField, handleSelectBlur]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <select
        ref={selectRef}
        onBlur={handleSelectBlur}
        onFocus={handleSelectFocus}
        defaultValue={defaultValue}
        {...rest}
      >
        <option value="default" style={{ color: '#666360' }}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
