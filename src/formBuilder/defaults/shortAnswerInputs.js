// @flow

import React, { useState } from 'react';
import Select from 'react-select';
import { Input } from 'reactstrap';
import FBCheckbox from '../checkbox/FBCheckbox';
import Tooltip from '../Tooltip';
import { getRandomId } from '../utils';
import type { Parameters, FormInput, Mods } from '../types';
import { PlaceholderInput } from '../inputs/PlaceholderInput';

// specify the inputs required for a string type object
function CardShortAnswerParameterInputs({
  mods,
  parameters,
  onChange,
}: {
  mods: Mods,
  parameters: Parameters,
  onChange: (newParams: Parameters) => void,
}) {
  const [elementId] = useState(getRandomId());
  const fetchLabel = (labelName: string, defaultLabel: string): string => {
    return mods && mods.labels && typeof mods.labels[labelName] === 'string'
      ? mods.labels[labelName]
      : defaultLabel;
  };

  const fetchTooltip = (
    tooltipName: string,
    defaultTooltip: string,
  ): string => {
    return mods &&
      mods.tooltipDescriptions &&
      typeof mods.tooltipDescriptions[tooltipName] === 'string'
      ? mods.tooltipDescriptions[tooltipName]
      : defaultTooltip;
  };
  const fetchWidespread = (
    widespread: string,
    defaultWidespread: string,
  ): string => {
    return mods &&
      mods.widespreadWords &&
      typeof mods.widespreadWords[widespread] === 'string'
      ? mods.widespreadWords[widespread]
      : defaultWidespread;
  };
  const noneWord = fetchWidespread('noneWord', 'None');

  const settingsModalInputRegExpTooltip = fetchTooltip(
    'settingsModalInputRegExpTooltip',
    'Regular expression pattern that this must satisfy',
  );
  const settingsModalInputColumnSizeTooltip = fetchTooltip(
    'settingsModalInputColumnSizeTooltip',
    'Set the column size of the input',
  );
  const settingsModalInputFormatTooltip = fetchTooltip(
    'settingsModalInputFormatTooltip',
    'Require string input to match a certain common format',
  );
  const settingsModalInputAutoCompleteTooltip = fetchTooltip(
    'settingsModalInputAutoCompleteTooltip',
    "Suggest entries based on the user's browser history",
  );
  const settingsModalInputMinLengthLabel = fetchLabel(
    'settingsModalInputMinLengthLabel',
    'Minimum Length',
  );
  const settingsModalInputMinLengthPlaceholder = fetchLabel(
    'settingsModalInputMinLengthPlaceholder',
    'Minimum Length',
  );
  const settingsModalInputMaxLengthLabel = fetchLabel(
    'settingsModalInputMaxLengthLabel',
    'Maximum Length',
  );
  const settingsModalInputMaxLengthPlaceholder = fetchLabel(
    'settingsModalInputMaxLengthPlaceholder',
    'Maximum Length',
  );
  const settingsModalInputRegExpLabel = fetchLabel(
    'settingsModalInputRegExpLabel',
    'Regular Expression Pattern',
  );
  const settingsModalInputRegExpPlaceholder = fetchLabel(
    'settingsModalInputRegExpPlaceholder',
    'Regular Expression Pattern',
  );
  const settingsModalInputColumnSizeLabel = fetchLabel(
    'settingsModalInputColumnSizeLabel',
    'Column Size',
  );
  const settingsModalInputColumnSizePlaceholder = fetchLabel(
    'settingsModalInputColumnSizePlaceholder',
    'Column Size',
  );
  const settingsModalInputFormatLabel = fetchLabel(
    'settingsModalInputFormatLabel',
    'Format',
  );
  const settingsModalInputFormatPlaceholder = fetchLabel(
    'settingsModalInputFormatPlaceholder',
    'Format',
  );
  const settingsModalInputAutoCompleteLabel = fetchLabel(
    'settingsModalInputAutoCompleteLabel',
    'Auto Complete Category',
  );
  const settingsModalInputAutoCompletePlaceholder = fetchLabel(
    'settingsModalInputAutoCompletePlaceholder',
    'Auto Complete',
  );
  const settingsModalInputAutoFocusLabel = fetchLabel(
    'settingsModalInputAutoFocusLabel',
    'Auto focus',
  );
  const settingsModalInputFormatItemEmail = fetchLabel(
    'settingsModalInputFormatItemEmail',
    'Email',
  );
  const settingsModalInputFormatItemHostname = fetchLabel(
    'settingsModalInputFormatItemHostname',
    'Hostname',
  );
  const settingsModalInputFormatItemURI = fetchLabel(
    'settingsModalInputFormatItemURI',
    'URI',
  );
  const settingsModalInputFormatItemRegEx = fetchLabel(
    'settingsModalInputFormatItemRegEx',
    'Regular Expression',
  );
  const settingsModalInputAutoCompleteUserName = fetchLabel(
    'settingsModalInputAutoCompleteUserName',
    'User Name',
  );
  const settingsModalInputAutoCompleteItemPassword = fetchLabel(
    'settingsModalInputAutoCompleteItemPassword',
    'Password',
  );
  const settingsModalInputAutoCompleteItemAddress = fetchLabel(
    'settingsModalInputAutoCompleteItemAddress',
    'Street Address',
  );
  const settingsModalInputAutoCompleteItemCountry = fetchLabel(
    'settingsModalInputAutoCompleteItemCountry',
    'Country',
  );

  const formatDictionary = {
    '': noneWord,
    email: settingsModalInputFormatItemEmail,
    hostname: settingsModalInputFormatItemHostname,
    uri: settingsModalInputFormatItemURI,
    regex: settingsModalInputFormatItemRegEx,
  };
  const autoDictionary = {
    '': noneWord,
    email: settingsModalInputFormatItemEmail,
    username: settingsModalInputAutoCompleteUserName,
    password: settingsModalInputAutoCompleteItemPassword,
    'street-address': settingsModalInputAutoCompleteItemAddress,
    country: settingsModalInputAutoCompleteItemCountry,
  };
  return (
    <div>
      <h4>{settingsModalInputMinLengthLabel}</h4>
      <Input
        value={parameters.minLength ? parameters.minLength : ''}
        placeholder={settingsModalInputMinLengthPlaceholder}
        key='minLength'
        type='number'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            minLength: parseInt(ev.target.value, 10),
          });
        }}
        className='card-modal-number'
      />
      <h4>{settingsModalInputMaxLengthLabel}</h4>
      <Input
        value={parameters.maxLength ? parameters.maxLength : ''}
        placeholder={settingsModalInputMaxLengthPlaceholder}
        key='maxLength'
        type='number'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            maxLength: parseInt(ev.target.value, 10),
          });
        }}
        className='card-modal-number'
      />
      <h4>
        {settingsModalInputRegExpLabel}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_regex`}
            type='help'
            text={settingsModalInputRegExpTooltip}
          />
        </a>
      </h4>
      <Input
        value={parameters.pattern ? parameters.pattern : ''}
        placeholder={settingsModalInputRegExpPlaceholder}
        key='pattern'
        type='text'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            pattern: ev.target.value,
          });
        }}
        className='card-modal-text'
      />
      <h4>
        {settingsModalInputFormatLabel}
        <Tooltip
          id={`${elementId}_format`}
          type='help'
          text={settingsModalInputFormatTooltip}
        />
      </h4>
      <Select
        value={{
          value: parameters.format
            ? formatDictionary[
                typeof parameters.format === 'string' ? parameters.format : ''
              ]
            : '',
          label: parameters.format
            ? formatDictionary[
                typeof parameters.format === 'string' ? parameters.format : ''
              ]
            : noneWord,
        }}
        placeholder={settingsModalInputFormatPlaceholder}
        key='format'
        options={Object.keys(formatDictionary).map((key) => ({
          value: key,
          label: formatDictionary[key],
        }))}
        onChange={(val: any) => {
          onChange({
            ...parameters,
            format: val.value,
          });
        }}
        className='card-modal-select'
      />
      <h5>
        {settingsModalInputAutoCompleteLabel}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_autocomplete`}
            type='help'
            text={settingsModalInputAutoCompleteTooltip}
          />
        </a>
      </h5>
      <Select
        value={{
          value: parameters['ui:autocomplete']
            ? autoDictionary[
                typeof parameters['ui:autocomplete'] === 'string'
                  ? parameters['ui:autocomplete']
                  : ''
              ]
            : '',
          label: parameters['ui:autocomplete']
            ? autoDictionary[
                typeof parameters['ui:autocomplete'] === 'string'
                  ? parameters['ui:autocomplete']
                  : ''
              ]
            : noneWord,
        }}
        placeholder={settingsModalInputAutoCompletePlaceholder}
        key='ui:autocomplete'
        options={Object.keys(autoDictionary).map((key) => ({
          value: key,
          label: autoDictionary[key],
        }))}
        onChange={(val: any) => {
          onChange({
            ...parameters,
            'ui:autocomplete': val.value,
          });
        }}
        className='card-modal-select'
      />
      <PlaceholderInput
        parameters={parameters}
        onChange={onChange}
        mods={mods}
      />
      <h4>
        {settingsModalInputColumnSizeLabel}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_column_size`}
            type='help'
            text={settingsModalInputColumnSizeTooltip}
          />
        </a>
      </h4>
      <Input
        value={parameters['ui:column'] ? parameters['ui:column'] : ''}
        placeholder={settingsModalInputColumnSizePlaceholder}
        key='ui:column'
        type='number'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            'ui:column': ev.target.value,
          });
        }}
        className='card-modal-text'
      />
      <div className='card-modal-boolean'>
        <FBCheckbox
          onChangeValue={() => {
            onChange({
              ...parameters,
              'ui:autofocus': parameters['ui:autofocus']
                ? parameters['ui:autofocus'] !== true
                : true,
            });
          }}
          isChecked={
            parameters['ui:autofocus']
              ? parameters['ui:autofocus'] === true
              : false
          }
          label={settingsModalInputAutoFocusLabel}
        />
      </div>
    </div>
  );
}

function ShortAnswerField({
  parameters,
  onChange,
  mods,
}: {
  parameters: Parameters,
  onChange: (newParams: Parameters) => void,
  mods: Mods,
}) {
  const fetchLabel = (labelName: string, defaultLabel: string): string => {
    return mods && mods.labels && typeof mods.labels[labelName] === 'string'
      ? mods.labels[labelName]
      : defaultLabel;
  };
  const inputDefaultValueLabel = fetchLabel(
    'inputDefaultValueLabel',
    'Default value',
  );
  const inputDefaultValuePlaceholder = fetchLabel(
    'inputDefaultValuePlaceholder',
    'Default',
  );

  const formatTypeDictionary = {
    email: 'email',
    url: 'uri',
  };
  return (
    <React.Fragment>
      <h5>{inputDefaultValueLabel}</h5>
      <Input
        value={parameters.default}
        placeholder={inputDefaultValuePlaceholder}
        type={formatTypeDictionary[parameters.format] || 'text'}
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
          onChange({ ...parameters, default: ev.target.value })
        }
        className='card-text'
      />
    </React.Fragment>
  );
}

function Password({
  parameters,
  onChange,
  mods,
}: {
  parameters: Parameters,
  onChange: (newParams: Parameters) => void,
  mods: Mods,
}) {
  const fetchLabel = (labelName: string, defaultLabel: string): string => {
    return mods && mods.labels && typeof mods.labels[labelName] === 'string'
      ? mods.labels[labelName]
      : defaultLabel;
  };
  const inputDefaultPasswordLabel = fetchLabel(
    'inputDefaultPasswordLabel',
    'Default password',
  );
  const inputDefaultPasswordPlaceholder = fetchLabel(
    'inputDefaultPasswordPlaceholder',
    'Default',
  );

  return (
    <React.Fragment>
      <h5>{inputDefaultPasswordLabel}</h5>
      <Input
        value={parameters.default}
        placeholder={inputDefaultPasswordPlaceholder}
        type='password'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
          onChange({ ...parameters, default: ev.target.value })
        }
        className='card-text'
      />
    </React.Fragment>
  );
}

const shortAnswerInput: { [string]: FormInput } = {
  shortAnswer: {
    displayName: 'Short Answer',
    matchIf: [
      {
        types: ['string'],
      },
      ...['email', 'hostname', 'uri', 'regex'].map((format) => ({
        types: ['string'],
        format,
      })),
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'string',
    cardBody: ShortAnswerField,
    modalBody: CardShortAnswerParameterInputs,
  },
  password: {
    displayName: 'Password',
    matchIf: [
      {
        types: ['string'],
        widget: 'password',
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      'ui:widget': 'password',
    },
    type: 'string',
    cardBody: Password,
    modalBody: CardShortAnswerParameterInputs,
  },
};

export default shortAnswerInput;
