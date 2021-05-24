import React, { useState } from 'react';
import Forms from './forms';

const FormsContainer = () => {
  const [formData, setFormData] = useState([] as any);
  const getJsonData = (formBuilder: any) => {
    setFormData(JSON.parse(formBuilder.actions.getData('json')));
  };
  return (
    <>
      <Forms getJsonData={getJsonData} jsonData={formData} />
    </>
  );
};

export default FormsContainer;
