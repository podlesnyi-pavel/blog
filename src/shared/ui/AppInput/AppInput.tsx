import {
  HTMLInputAutoCompleteAttribute,
  InputHTMLAttributes,
  JSX,
} from 'react';
import styles from './AppInput.module.scss';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormReturn,
  Validate,
  ValidationRule,
} from 'react-hook-form';

export interface AppInputProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'maxLength' | 'pattern'> {
  label?: string;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  name: Path<T>;
  methods?: UseFormReturn<T>;
  validate?:
    | Validate<FieldPathValue<T, FieldPath<T>>, T>
    | Record<string, Validate<FieldPathValue<T, FieldPath<T>>, T>>;
  minLength?: number | undefined;
  minLengthRHF?: ValidationRule<number>;
  maxLength?: number | undefined;
  maxLengthRHF?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp | string>;
  minWidth?: number;
  maxWidth?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AppInput<T extends FieldValues>({
  label,
  placeholder = 'Type...',
  type = 'text',
  autocomplete = 'on',
  className = '',
  name,
  value,
  methods,
  pattern,
  required = false,
  minLength,
  minLengthRHF,
  maxLength,
  maxLengthRHF,
  minWidth,
  maxWidth,
  validate,
  onChange,
}: AppInputProps<T>): JSX.Element {
  let register;
  let errors;
  let RHFPattern;

  if (methods) {
    ({
      register,
      formState: { errors },
    } = methods);

    RHFPattern =
      pattern && typeof pattern === 'string'
        ? new RegExp(pattern)
        : pattern instanceof RegExp
          ? pattern
          : typeof pattern === 'object' && pattern.value
            ? {
                value:
                  typeof pattern.value === 'string'
                    ? new RegExp(pattern.value)
                    : pattern.value,
                message:
                  typeof errors[name]?.message === 'string'
                    ? errors[name].message
                    : 'Invalid format',
              }
            : undefined;
  }

  return (
    <label
      className={`app-input ${styles['app-input']} ${className}`}
      htmlFor={label}
    >
      {label}{' '}
      {register && errors ? (
        <>
          <input
            id={label}
            className={styles['app-input__input']}
            placeholder={placeholder}
            type={type}
            autoComplete={autocomplete}
            aria-invalid={errors[name] ? true : false}
            {...register(name, {
              required: {
                value: required,
                message: 'Field is required',
              },
              pattern: RHFPattern,
              minLength: minLengthRHF,
              maxLength: maxLengthRHF,
              validate,
            })}
          />
          {errors[name] && (
            <p className={styles['error-message']} role="alert">
              {typeof errors[name].message === 'string' && errors[name].message}
            </p>
          )}
        </>
      ) : (
        <input
          id={label}
          className={styles['app-input__input']}
          placeholder={placeholder}
          type={type}
          autoComplete={autocomplete}
          name={name}
          value={value}
          pattern={typeof pattern === 'string' ? pattern : undefined}
          required
          minLength={minLength}
          maxLength={maxLength}
          style={{
            minWidth: minWidth ? `${minWidth.toString()}px` : '',
            maxWidth: maxWidth ? `${maxWidth.toString()}px` : '',
          }}
          onChange={onChange}
        />
      )}
    </label>
  );
}

export default AppInput;
