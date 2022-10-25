// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { Input } from 'reactstrap';
import FBCheckbox from '../checkbox/FBCheckbox';
import Tooltip from '../Tooltip';
import { getRandomId } from '../utils';
import type { Parameters, FormInput, Mods } from '../types';
import { PlaceholderInput } from '../inputs/PlaceholderInput';
import i18next from '../../i18n';

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
  const { t } = useTranslation();

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

  const formatDictionary = {
    '': noneWord,
    email: t('settingsModalInputFormatItemEmail'),
    hostname: t('settingsModalInputFormatItemHostname'),
    uri: t('settingsModalInputFormatItemURI'),
    regex: t('settingsModalInputFormatItemRegEx'),
  };
  const autoDictionary = {
    '': noneWord,
    email: t('settingsModalInputFormatItemEmail'),
    username: t('settingsModalInputAutoCompleteUserName'),
    password: t('settingsModalInputAutoCompleteItemPassword'),
    'street-address': t('settingsModalInputAutoCompleteItemAddress'),
    country: t('settingsModalInputAutoCompleteItemCountry'),
  };
  return (
    <div>
      <h4>{t('settingsModalInputMinLengthLabel')}</h4>
      <Input
        value={parameters.minLength ? parameters.minLength : ''}
        placeholder={t('settingsModalInputMinLengthPlaceholder')}
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
      <h4>{t('settingsModalInputMaxLengthLabel')}</h4>
      <Input
        value={parameters.maxLength ? parameters.maxLength : ''}
        placeholder={t('settingsModalInputMaxLengthPlaceholder')}
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
        {t('settingsModalInputRegExpLabel')}{' '}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_regex`}
            type='help'
            text={t('settingsModalInputRegExpTooltip')}
          />
        </a>
      </h4>
      <Input
        value={parameters.pattern ? parameters.pattern : ''}
        placeholder={t('settingsModalInputRegExpPlaceholder')}
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
        {t('settingsModalInputFormatLabel')}{' '}
        <Tooltip
          id={`${elementId}_format`}
          type='help'
          text={t('settingsModalInputFormatTooltip')}
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
        placeholder={t('settingsModalInputFormatPlaceholder')}
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
        {t('settingsModalInputAutoCompleteLabel')}{' '}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_autocomplete`}
            type='help'
            text={t('settingsModalInputAutoCompleteTooltip')}
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
        placeholder={t('settingsModalInputAutoCompletePlaceholder')}
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
        {t('settingsModalInputColumnSizeLabel')}{' '}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_column_size`}
            type='help'
            text={t('settingsModalInputColumnSizeTooltip')}
          />
        </a>
      </h4>
      <Input
        value={parameters['ui:column'] ? parameters['ui:column'] : ''}
        placeholder={t('settingsModalInputColumnSizePlaceholder')}
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
          label={t('settingsModalInputAutoFocusLabel')}
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
  const { t } = useTranslation();

  const formatTypeDictionary = {
    email: 'email',
    url: 'uri',
  };
  return (
    <React.Fragment>
      <h5>{t('inputDefaultValueLabel')}</h5>
      <Input
        value={parameters.default}
        placeholder={t('inputDefaultValuePlaceholder')}
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
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <h5>{t('inputDefaultPasswordLabel')}</h5>
      <Input
        value={parameters.default}
        placeholder={t('inputDefaultPasswordPlaceholder')}
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
    displayName: i18next.t('shortAnswer'),
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
    displayName: i18next.t('password'),
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
