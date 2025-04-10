interface IErrorsOnFetch {
  data: {
    errors: Record<string, unknown>;
  };
}

export function isErrorsOnFetch(error: unknown): error is IErrorsOnFetch {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = error.data;
    if (typeof data === 'object' && data !== null && 'errors' in data) {
      const errors = data.errors;
      return typeof errors === 'object' && errors !== null;
    }
  }
  return false;
}
