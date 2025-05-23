'use client';

import { TextInput, PasswordInput, Textarea, TextInputProps, PasswordInputProps, TextareaProps } from '@mantine/core';

type CommonProps = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
};

export type InputFieldProps =
  | (CommonProps & TextInputProps & { type?: 'text' | 'email' | 'url' })
  | (CommonProps & PasswordInputProps & { type: 'password' })
  | (CommonProps & TextareaProps & { type: 'textarea' });

export function InputField(props: InputFieldProps) {
  const { value, onChange, label, placeholder, type = 'text', ...rest } = props as any;

  const shared = {
    label,
    placeholder,
    value,
    onChange: (e: any) => onChange(e.currentTarget.value),
    ...rest,
  };

  if (type === 'password') {
    return <PasswordInput {...shared} />;
  }

  if (type === 'textarea') {
    return <Textarea {...shared} />;
  }

  return <TextInput {...shared} type={type} />;
}
