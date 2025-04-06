import { baseApi, useLoginMutation } from '@/shared/api';
import { setItem } from '@/shared/lib';
import { AppButton, AppLink, RHFWrapperAppInput } from '@/shared/ui';
import { FC } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface SignInFormFields {
  email: string;
  password: string;
}

export const SignInForm: FC = () => {
  const methods = useForm<SignInFormFields>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const { handleSubmit } = methods;

  const onSignIn: SubmitHandler<SignInFormFields> = (
    data: SignInFormFields,
    event,
  ) => {
    event?.preventDefault();
    console.log('onSignIn data', data);

    login(data).then((response) => {
      if (response && response.data) {
        setItem('auth_token', response.data.user.token);
      }
    });
    navigate('/');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={(e) => handleSubmit(onSignIn)(e)}>
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
