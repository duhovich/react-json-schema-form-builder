// @flow

import React, { useState } from 'react';
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
  const settingsModalInputRegExpTooltip = fetchTooltip(
    'settingsModalInputRegExpTooltip',
    'Regular expression pattern that this must satisfy',
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
  const settingsModalInputAutoFocusLabel = fetchLabel(
    'settingsModalInputAutoFocusLabel',
    'Auto focus',
  );

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
        <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions'>
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
          label={settingsModalInputAutoFocusLabel}
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
  return (
    <React.Fragment>
      <h5>{inputDefaultValueLabel}</h5>
      <Input
        value={parameters.default}
        placeholder={inputDefaultValuePlaceholder}
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
    displayName: 'Long Answer',
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
