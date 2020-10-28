import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface Props {
  name: string;
  label: string;
  className: string;
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

const ImageInput: React.FC<InputProps> = ({
  name,
  label,
  className,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container className={className}>
      <label htmlFor={name}>{label}</label>
      <input type="file" id={name} ref={inputRef} {...rest} />

      <span>{error}</span>
    </Container>
  );
};
export default ImageInput;
