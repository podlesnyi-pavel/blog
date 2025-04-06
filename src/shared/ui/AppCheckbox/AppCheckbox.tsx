import { Checkbox, CheckboxProps } from 'antd';
import { FC } from 'react';
import './AppCheckbox.scss';

interface AppCheckboxProps extends CheckboxProps {
  errorMessage?: string;
}

export const AppCheckbox: FC<AppCheckboxProps> = ({
  children,
  checked,
  defaultChecked,
  onChange,
  errorMessage,
}) => {
  return (
    <>
      <Checkbox
        onChange={onChange}
        checked={checked}
        defaultChecked={defaultChecked}
      >
        {children}
      </Checkbox>

      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
};
