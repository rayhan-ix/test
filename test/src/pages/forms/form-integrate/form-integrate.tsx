/* eslint-disable no-shadow */
import { Field, FieldProps, Form, Formik } from 'formik';
import { stripHtml } from 'string-strip-html';
import { camelCase } from 'change-case';
import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Checkbox, Form as AntForm, Radio, Select, DatePicker, Input } from 'antd';

interface Props {
  formData: [];
}

const MyInput = ({
  field,
  form: { errors, touched, setFieldError, setFieldTouched },
  isRequired,
  ...props
}: FieldProps & { isRequired: boolean }) => (
  <AntForm.Item
    help={errors[field.name] && touched[field.name] ? errors[field.name] : ''}
    validateStatus={errors[field.name] && touched[field.name] ? 'error' : ''}
  >
    <Input
      {...field}
      {...props}
      onBlur={() => {
        setFieldTouched(field.name, true, false);
        if (isRequired && _.isEmpty(field.value)) {
          setFieldError(field.name, 'Required');
        } else {
          setFieldError(field.name, undefined);
        }
      }}
    />
  </AntForm.Item>
);

const MyInputArea = ({
  field,
  form: { errors, touched, setFieldError, setFieldTouched },
  isRequired,
  ...props
}: FieldProps & { isRequired: boolean }) => (
  <AntForm.Item
    help={errors[field.name] && touched[field.name] ? errors[field.name] : ''}
    validateStatus={errors[field.name] && touched[field.name] ? 'error' : ''}
  >
    <Input.TextArea
      {...field}
      {...props}
      onBlur={() => {
        setFieldTouched(field.name, true, false);
        if (isRequired && _.isEmpty(field.value)) {
          setFieldError(field.name, 'Required');
        }
      }}
    />
  </AntForm.Item>
);

const FormIntegrate = (props: Props) => {
  const { formData } = props;
  const [formElement, setFormElement] = useState([]);

  useEffect(() => {
    setFormElement(formData);
  }, [formData]);

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
            actions.resetForm();
          }, 200);
        }}
        validateOnChange={false}
      >
        {({ isValid }) => (
          <Form>
            {formElement.map((el: any) => {
              const stripedHtmlString = stripHtml(el.label).result;
              const name = camelCase(stripedHtmlString);

              if (_.isEqual(el.type, 'header')) {
                return <div key={Math.random()}>{el.label}</div>;
              }

              if (_.isEqual(el.type, 'text')) {
                return (
                  <Field
                    name={name}
                    placeholder={el.placeholder}
                    component={MyInput}
                    key={el.name}
                    isRequired={el.required}
                  />
                );
              }

              if (_.isEqual(el.type, 'textarea')) {
                return (
                  <Field
                    name={name}
                    placeholder={el.placeholder}
                    component={MyInputArea}
                    key={el.name}
                    isRequired={el.required}
                  />
                );
              }

              if (_.isEqual(el.type, 'checkbox-group')) {
                return (
                  <Field name={name} key={el.name}>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form,
                    }: FieldProps) => (
                      <AntForm.Item>
                        <Checkbox.Group
                          {...field}
                          onChange={(value) => form.setFieldValue(field.name, value)}
                          options={el.values}
                        />
                      </AntForm.Item>
                    )}
                  </Field>
                );
              }

              if (_.isEqual(el.type, 'radio-group')) {
                return (
                  <Field name={name} key={el.name}>
                    {({
                      field, // { name, value, onChange, onBlur }
                    }: FieldProps) => (
                      <AntForm.Item>
                        <Radio.Group {...field}>
                          {el.values.map((opt: { value: string; label: string }) => (
                            <Radio value={opt.value} key={opt.value}>
                              {opt.label}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </AntForm.Item>
                    )}
                  </Field>
                );
              }
              if (_.isEqual(el.type, 'date')) {
                return (
                  <Field name={name} key={el.name}>
                    {({
                      field, // { name, value, onChange, onBlur }
                      form,
                    }: FieldProps) => (
                      <AntForm.Item>
                        <DatePicker
                          {...field}
                          onChange={(value) => form.setFieldValue(field.name, value)}
                        />
                      </AntForm.Item>
                    )}
                  </Field>
                );
              }

              if (_.isEqual(el.type, 'select')) {
                return (
                  <>
                    <Field name={name} key={el.name}>
                      {({
                        field, // { name, value, onChange, onBlur }
                        form,
                      }: FieldProps) => (
                        <AntForm.Item>
                          <Select
                            {...field}
                            onChange={(value) => form.setFieldValue(field.name, value)}
                            onBlur={() => form.setFieldTouched(field.name, true)}
                          >
                            {el.values.map((opt: { value: string; label: string }) => (
                              <Select.Option value={opt.value}>{opt.label}</Select.Option>
                            ))}
                          </Select>
                        </AntForm.Item>
                      )}
                    </Field>
                  </>
                );
              }
              return null;
            })}
            <button type='submit' disabled={!isValid}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormIntegrate;
