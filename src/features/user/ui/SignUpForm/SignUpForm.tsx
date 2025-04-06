import { useRegisterUserMutation } from '@/shared/api';
import { setItem } from '@/shared/lib';
import { AppButton, AppCheckbox, AppLink } from '@/shared/ui';
import { RHFWrapperAppInput } from '@/shared/ui';
import { Divider } from 'antd';
import { FC } from 'react';
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from 'react-hook-form';

interface SignUpFormFields {
  username: string;
  email: string;
  password: string;
  repeatpassword: string;
  agree: boolean;
}

export const SignUpForm: FC = () => {
  const [registerUser] = useRegisterUserMutation();

  const methods = useForm<SignUpFormFields>({
    mode: 'onChange',
    defaultValues: {
      agree: true,
    },
  });

  const {
    control,
    formState: { errors },
  } = methods;

  const onCreateNewAccount: SubmitHandler<SignUpFormFields> = (data, event) => {
    event?.preventDefault();
    console.log('createNewAccount', data);

    void registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
    }).then((response) => {
      if (response && response.data) {
        setItem('auth_token', response.data.user.token);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => methods.handleSubmit(onCreateNewAccount)(event)}
      >
        <h1 className="title">Create new account</h1>

        <RHFWrapperAppInput
          label="Username"
          placeholder="Username"
          name="username"
          required
          minLength={{
            value: 3,
            message: 'Username must be at least 3 characters',
          }}
          maxLength={{
            value: 20,
            message: 'Username must not exceed 20 characters',
          }}
        />

        <RHFWrapperAppInput
          label="Email address"
          placeholder="Email address"
          type="email"
          name="email"
          pattern={{
            value:
              // eslint-disable-next-line no-useless-escape
              '^[a-z][a-z0-9._%+-]*@[a-z0-9.-]+\.[a-z]{2,}$',
            message: 'Email is invalid',
          }}
          required
        />

        <RHFWrapperAppInput
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          required
          minLength={{
            value: 6,
            message: 'Your password needs to be at least 6 characters',
          }}
          maxLength={{
            value: 40,
            message: 'Password must not exceed 40 characters',
          }}
        />

        <RHFWrapperAppInput<SignUpFormFields>
          label="Repeat Password"
          placeholder="Password"
          type="password"
          name="repeatpassword"
          required
          validate={(value) =>
            value === methods.getValues('password') || 'Passwords must match'
          }
        />

        <Divider
          style={{
            margin: '21px 0 8px',
            backgroundColor: '#e8e8e8',
            height: '1px',
          }}
        />

        <Controller
          control={control}
          name="agree"
          rules={{
            required: {
              value: true,
              message: 'Accept Terms is required',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <AppCheckbox
              onChange={onChange}
              checked={value}
              errorMessage={errors.agree?.message}
            >
              I agree to the processing of my personal information
            </AppCheckbox>
          )}
        />

        <AppButton type="primary" htmlType="submit" size="large">
          Create
        </AppButton>

        <span className="sign-in-link">
          Already have an account?{' '}
          <AppLink to="/sign-in" color="blue">
            Sign In.
          </AppLink>
        </span>
      </form>
    </FormProvider>
  );
};
