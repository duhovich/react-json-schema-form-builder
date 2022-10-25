// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from '../../i18n';
import { Input } from 'reactstrap';
import FBCheckbox from '../checkbox/FBCheckbox';
import Tooltip from '../Tooltip';
import { getRandomId } from '../utils';
import type { Parameters, FormInput, Mods } from '../types';

// specify the inputs required for a number type object
function CardNumberParameterInputs({
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
      <h4>
        {t('settingsModalInputNumberMultOfLabel')}
        <Tooltip
          id={`${elementId}_multiple`}
          type='help'
          text={t('settingsModalInputNumberMultOfTooltip')}
        />
      </h4>
      <Input
        value={parameters.multipleOf ? parameters.multipleOf : ''}
        placeholder={t('settingsModalInputNumberMultOfPlaceholder')}
        key='multipleOf'
        type='number'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          let newVal = parseFloat(ev.target.value);
          if (Number.isNaN(newVal)) newVal = null;
          onChange({
            ...parameters,
            multipleOf: newVal,
          });
        }}
        className='card-modal-number'
      />
      <h4>{t('settingsModalInputNumberMinLabel')}</h4>
      <Input
        value={parameters.minimum || parameters.exclusiveMinimum || ''}
        placeholder={t('settingsModalInputNumberMinPlaceholder')}
        key='minimum'
        type='number'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          let newVal = parseFloat(ev.target.value);
          if (Number.isNaN(newVal)) newVal = null;
          // change either min or exclusiveMin depending on which one is active
          if (parameters.exclusiveMinimum) {
            onChange({
              ...parameters,
              exclusiveMinimum: newVal,
              minimum: null,
            });
          } else {
            onChange({
              ...parameters,
              minimum: newVal,
              exclusiveMinimum: null,
            });
          }
        }}
        className='card-modal-number'
      />
      <div className='card-modal-boolean'>
        <FBCheckbox
          key='exclusiveMinimum'
          onChangeValue={() => {
            const newMin = parameters.minimum || parameters.exclusiveMinimum;
            if (parameters.exclusiveMinimum) {
              onChange({
                ...parameters,
                exclusiveMinimum: null,
                minimum: newMin,
              });
            } else {
              onChange({
                ...parameters,
                exclusiveMinimum: newMin,
                minimum: null,
              });
            }
          }}
          isChecked={!!parameters.exclusiveMinimum}
          disabled={!parameters.minimum && !parameters.exclusiveMinimum}
          label={t('settingsModalInputNumberCheckBoxExMinLabel')}
        />
      </div>
      <h4>{t('settingsModalInputNumberMaxLabel')}</h4>
      <Input
        value={parameters.maximum || parameters.exclusiveMaximum || ''}
        placeholder={t('settingsModalInputNumberMaxPlaceholder')}
        key='maximum'
        type='number'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          let newVal = parseFloat(ev.target.value);
          if (Number.isNaN(newVal)) newVal = null;
          // change either max or exclusiveMax depending on which one is active
          if (parameters.exclusiveMinimum) {
            onChange({
              ...parameters,
              exclusiveMaximum: newVal,
              maximum: null,
            });
          } else {
            onChange({
              ...parameters,
              maximum: newVal,
              exclusiveMaximum: null,
            });
          }
        }}
        className='card-modal-number'
      />
      <div className='card-modal-boolean'>
        <FBCheckbox
          key='exclusiveMaximum'
          onChangeValue={() => {
            const newMax = parameters.maximum || parameters.exclusiveMaximum;
            if (parameters.exclusiveMaximum) {
              onChange({
                ...parameters,
                exclusiveMaximum: null,
                maximum: newMax,
              });
            } else {
              onChange({
                ...parameters,
                exclusiveMaximum: newMax,
                maximum: null,
              });
            }
          }}
          isChecked={!!parameters.exclusiveMaximum}
          disabled={!parameters.maximum && !parameters.exclusiveMaximum}
          label={t('settingsModalInputNumberCheckBoxExMaxLabel')}
        />
      </div>
    </div>
  );
}

function NumberField({
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
      <h5>{t('inputDefaultNumberLabel')}</h5>
      <Input
        value={parameters.default}
        placeholder={t('inputDefaultNumberPlaceholder')}
        type='number'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
          onChange({
            ...parameters,
            default: parseFloat(ev.target.value),
          })
        }
        className='card-number'
      />
    </React.Fragment>
  );
}

const numberInputs: { [string]: FormInput } = {
  integer: {
    displayName: i18next.t('integer'),
    matchIf: [
      {
        types: ['integer'],
      },
      {
        types: ['integer'],
        widget: 'number',
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'integer',
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs,
  },
  number: {
    displayName: i18next.t('number'),
    matchIf: [
      {
        types: ['number'],
      },
    ],
    defaultDataSchema: {},
    defaultUiSchema: {},
    type: 'number',
    cardBody: NumberField,
    modalBody: CardNumberParameterInputs,
  },
};

export default numberInputs;
