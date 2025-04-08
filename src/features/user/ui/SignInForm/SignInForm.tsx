import { useLoginMutation } from '@/shared/api';
import { setItem } from '@/shared/lib';
import { AppButton, AppLink, RHFWrapperAppInput } from '@/shared/ui';
import { FC } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { setToken } from '../../model/userSlice';
import { useAppDispatch } from '@/shared/lib';

interface SignInFormFields {
  email: string;
  password: string;
}

export const SignInForm: FC = () => {
  const methods = useForm<SignInFormFields>({
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { handleSubmit, setError } = methods;

  const onSignIn: SubmitHandler<SignInFormFields> = async (
    data: SignInFormFields,
    event,
  ) => {
    event?.preventDefault();

    try {
      const result = await login(data).unwrap();
      setItem('auth_token', result.user.token);
      dispatch(setToken(result.user.token));
      void navigate('/');
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'errors' in error.data &&
        error.data.errors &&
        typeof error.data.errors === 'object'
      ) {
        const message = Object.entries(error.data.errors)
          .map(
            (item) =>
              `${item[0]} ${typeof item[1] === 'string' ? item[1] : ''}`,
          )
          .join(', ');

        const keys = ['email', 'password'] as (keyof SignInFormFields)[];
        keys.forEach((key) => {
          if (message.includes(key)) {
            setError(key, {
              type: 'server',
              message,
            });
          }
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => void handleSubmit(onSignIn)(e)}>
        <h1 className="title">Sign In</h1>

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
        />

        <AppButton type="primary" size="large" htmlType="submit">
          Login
        </AppButton>

        <span className="sign-in-link">
          Don’t have an account?{' '}
          <AppLink to="/sign-up" color="blue">
            Sign Up.
          </AppLink>
        </span>
      </form>
    </FormProvider>
  );
};
