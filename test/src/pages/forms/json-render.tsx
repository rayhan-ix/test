import { Formik, FormikValues, FormikProps } from 'formik';
import $ from 'jquery';
import React, { useEffect, useRef } from 'react';

interface Props {
  formData: {};
}

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder/dist/form-render.min.js');

const JsonRender = (props: Props) => {
  const { formData } = props;
  const fb = useRef<any>(null);

  const formRenderOpts = {
    formData,
  };

  useEffect(() => {
    $(fb.current).formRender(formRenderOpts);
  }, [formData]);
  return (
    <>
      <h1>Rendered Form</h1>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(formikProps: FormikProps<FormikValues>) => (
          <form onSubmit={formikProps.handleSubmit}>
            <div ref={fb} />
            {formikProps.errors.name && <div id='feedback'>{formikProps.errors.name}</div>}
            <button type='submit'>Submit</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default JsonRender;
