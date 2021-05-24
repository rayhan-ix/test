import React from 'react';

interface Props {
  error: {
    message: string;
    stack?: string;
  };
}

const ErrorFallback = (props: Props) => {
  const { error } = props;
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <pre style={{ color: 'red' }}>{error.stack}</pre>
    </div>
  );
};

export default ErrorFallback;
