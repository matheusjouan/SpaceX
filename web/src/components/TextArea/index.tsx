import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  className,
  ...rest
}) => {
  const textareaRef = useRef(null);

  const { defaultValue, fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container className={className}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        ref={textareaRef}
        defaultValue={defaultValue}
        {...rest}
      />
      <span>{error}</span>
    </Container>
  );
};

export default TextArea;
