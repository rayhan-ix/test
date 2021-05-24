/* eslint-disable no-unused-vars */
import $ from 'jquery';
import React, { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import ChangeLang from '../../components/change-lang';
import FormIntegrateContainer from './form-integrate/form-integrate-container';

interface Props {
  getJsonData(formBuilder: any): void;
  jsonData: [];
}
window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

const formBuilderOptions = {
  disabledActionButtons: ['data', 'save', 'clear'],
  disableFields: ['autocomplete', 'button', 'file', 'hidden', 'number', 'paragraph', 'starRating'],
  controlOrder: ['header', 'text', 'textarea'],
};

const Forms = (props: Props) => {
  const { getJsonData, jsonData } = props;
  const [formBuilder, setFormBuilder] = useState(null);
  const fb = useRef<any>(null);
  useEffect(() => {
    const tempForm = $(fb.current).formBuilder(formBuilderOptions);
    setFormBuilder(tempForm);
  }, []);
  return (
    <>
      <h1>{intl.get('Hello')}</h1>
      <div id='fb-editor' ref={fb} />
      <ChangeLang />
      <button type='button' onClick={() => getJsonData(formBuilder)}>
        GetJson
      </button>
      {/* <JsonRender formData={jsonData} /> */}
      <FormIntegrateContainer formData={jsonData} />
    </>
  );
};

export default Forms;
