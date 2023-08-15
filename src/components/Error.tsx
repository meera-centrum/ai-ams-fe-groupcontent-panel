import React from 'react';

export type ErrorProps = {
  description: string;
  error: string;
};

const Error = ({ description, error }: ErrorProps) => {
  description = atob(description);
  error = atob(error);
  /** Renderer */
  return (
    <div>
      <span className="text-error/100">{error}</span>
      <br />
      <span>{description}</span>
    </div>
  );
};

export default Error;
