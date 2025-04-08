import { FieldValues, useFormContext, ValidationRule } from 'react-hook-form';
import AppInput from '../AppInput';
import { JSX } from 'react';
import { AppInputProps } from '../AppInput/AppInput';

interface Length {
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
}
type RHFAppInputProps<T extends FieldValues> = Omit<
  AppInputProps<T>,
  'minLength' | 'maxLength'
> &
  Length;

export function RHFWrapperAppInput<T extends FieldValues>(
  props: RHFAppInputProps<T>,
): JSX.Element {
  const methods = useFormContext<T>();
  const { minLength, maxLength, ...otherProps } = props;

  return (
    <AppInput<T>
      {...otherProps}
      methods={methods}
      minLengthRHF={minLength}
      maxLengthRHF={maxLength}
    />
  );
}
