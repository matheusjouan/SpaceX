import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ name, label, className, ...rest }) => {
  const inputRef = useRef(null);

  const { defaultValue, fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container className={className}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      <span>{error}</span>
    </Container>
  );
};

export default Input;
