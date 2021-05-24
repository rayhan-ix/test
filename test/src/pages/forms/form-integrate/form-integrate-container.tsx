import React from 'react';
import FormIntegrate from './form-integrate';

interface Props {
  formData: [];
}

const FormIntegrateContainer = (props: Props) => {
  const { formData } = props;
  return (
    <div>
      <FormIntegrate formData={formData} />
    </div>
  );
};

export default FormIntegrateContainer;
