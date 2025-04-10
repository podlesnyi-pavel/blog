import { isErrorsOnFetch } from './isErrorsOnFetch';

interface IMessageInErrorsOnFetch {
  data: {
    errors: {
      message: string;
    };
  };
}

export function isMessageInErrorsOnFetch(
  error: unknown,
): error is IMessageInErrorsOnFetch {
  if (isErrorsOnFetch(error)) {
    const message = error.data.errors.message;
    return typeof message === 'string';
  }

  return false;
}
