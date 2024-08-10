import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TemperatureConverter = () => {
  const convertTemperature = (values) => {
    const { inputValue, inputUnit, resultUnit } = values;
    let resultValue = '';

    if (inputValue === '') {
      alert('Please enter a valid value in the input box');
      return '';
    }

    if (inputUnit === 'Celcius' && resultUnit === 'Farenheit') {
      resultValue = ((Number(inputValue) * 9) / 5 + 32).toFixed(2) + ' °F';
    } else if (inputUnit === 'Farenheit' && resultUnit === 'Celcius') {
      resultValue = (((Number(inputValue) - 32) * 5) / 9).toFixed(2) + ' °C';
    } else if (inputUnit === 'Celcius' && resultUnit === 'Kelvin') {
      resultValue = (Number(inputValue) + 273.15).toFixed(2) + ' K';
    } else if (inputUnit === 'Kelvin' && resultUnit === 'Celcius') {
      resultValue = (Number(inputValue) - 273.15).toFixed(2) + ' °C';
    } else if (inputUnit === 'Farenheit' && resultUnit === 'Kelvin') {
      resultValue = (((Number(inputValue) - 32) * 5) / 9 + 273.15).toFixed(2) + ' K';
    } else if (inputUnit === 'Kelvin' && resultUnit === 'Farenheit') {
      resultValue = (((Number(inputValue) - 273.15) * 9) / 5 + 32).toFixed(2) + ' °F';
    }

    return resultValue;
  };

  const autoChangeResultUnit = (inputUnit) => {
    if (inputUnit === 'Celcius') {
      return 'Farenheit';
    } else if (inputUnit === 'Farenheit') {
      return 'Kelvin';
    } else {
      return 'Celcius';
    }
  };

  return (
    <Formik
      initialValues={{
        inputValue: '',
        inputUnit: 'Celcius',
        resultUnit: 'Farenheit',
        resultValue: '',
      }}
      validationSchema={Yup.object({
        inputValue: Yup.number().required('Please enter a value'),
      })}
      onSubmit={(values, { setFieldValue }) => {
        const result = convertTemperature(values);
        setFieldValue('resultValue', result);
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form id="content-container">
          <h2 id="container-heading">Temperature Converter</h2>
          <div id="calculations-container">
            <div className="content-division">
              <div className="division-heading">From</div>
              <div className="inputs-container">
                <Field
                  type="number"
                  className="input-field inputs"
                  name="inputValue"
                  id="input-box"
                  placeholder="0"
                />
                <ErrorMessage name="inputValue" component="div" className="error-message" />
                <div className="dropdown-container">
                  <Field
                    as="select"
                    className="dropdown inputs"
                    name="inputUnit"
                    id="input-dropdown"
                    onChange={(e) => {
                      setFieldValue('inputUnit', e.target.value);
                      const newResultUnit = autoChangeResultUnit(e.target.value);
                      setFieldValue('resultUnit', newResultUnit);
                      setFieldValue('resultValue', '');
                    }}
                  >
                    <option value="Celcius">Celcius</option>
                    <option value="Farenheit">Farenheit</option>
                    <option value="Kelvin">Kelvin</option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="content-division">
              <div className="division-heading">To</div>
              <div className="inputs-container">
                <Field
                  type="text"
                  className="input-field inputs"
                  name="resultValue"
                  id="result-box"
                  placeholder="0"
                  value={values.resultValue}
                  disabled
                />
                <div className="dropdown-container">
                  <Field
                    as="select"
                    className="dropdown inputs"
                    name="resultUnit"
                    id="result-dropdown"
                    value={values.resultUnit}
                    onChange={(e) => {
                      setFieldValue('resultUnit', e.target.value);
                      setFieldValue('resultValue', '');
                    }}
                  >
                    <option value="Farenheit">Farenheit</option>
                    <option value="Celcius">Celcius</option>
                    <option value="Kelvin">Kelvin</option>
                  </Field>
                </div>
              </div>
            </div>
            <button
              type="submit"
              id="convert-btn"
              className="inputs"
              onClick={handleSubmit}
            >
              Convert
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TemperatureConverter;
