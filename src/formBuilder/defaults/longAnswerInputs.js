// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from '../../i18n';
import { Input } from 'reactstrap';
import FBCheckbox from '../checkbox/FBCheckbox';
import Tooltip from '../Tooltip';
import { getRandomId } from '../utils';
import type { Parameters, FormInput, Mods } from '../types';
import { PlaceholderInput } from '../inputs/PlaceholderInput';

// specify the inputs required for a string type object
function CardLongAnswerParameterInputs({
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
        <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'>
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
      <PlaceholderInput
        parameters={parameters}
        onChange={onChange}
        mods={mods}
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

function LongAnswer({
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
      <h5>{t('inputDefaultValueLabel')}</h5>
      <Input
        value={parameters.default}
        placeholder={t('inputDefaultValuePlaceholder')}
        type='textarea'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
          onChange({ ...parameters, default: ev.target.value })
        }
        className='card-textarea'
      />
    </React.Fragment>
  );
}

const longAnswerInput: { [string]: FormInput } = {
  longAnswer: {
    displayName: i18next.t('longAnswer'),
    matchIf: [
      {
        types: ['string'],
        widget: 'textarea',
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {
      'ui:widget': 'textarea',
    },
    type: 'string',
    cardBody: LongAnswer,
    modalBody: CardLongAnswerParameterInputs,
  },
};

export default longAnswerInput;
