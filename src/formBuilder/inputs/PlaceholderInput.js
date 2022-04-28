// @flow

import React, { useState } from 'react';
import type { Node } from 'react';
import type { Parameters, Mods } from '../types';
import { getRandomId } from '../utils';
import Tooltip from '../Tooltip';
import { Input } from 'reactstrap';

export function PlaceholderInput({
  mods,
  parameters,
  onChange,
}: {
  mods: Mods,
  parameters: Parameters,
  onChange: (Parameters) => void,
}): Node {
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
  const settingsModalInputPlaceholderPropTooltip = fetchTooltip(
    'settingsModalInputPlaceholderPropTooltip',
    'Hint to the user as to what kind of information is expected in the field',
  );
  const settingsModalInputPlaceholderPropLabel = fetchLabel(
    'settingsModalInputPlaceholderPropLabel',
    'Placeholder',
  );
  const settingsModalInputPlaceholderPropPlaceholder = fetchLabel(
    'settingsModalInputPlaceholderPropPlaceholder',
    'Regular Expression Pattern',
  );
  return (
    <React.Fragment>
      <h4>
        {settingsModalInputPlaceholderPropLabel}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_placeholder`}
            type='help'
            text={settingsModalInputPlaceholderPropTooltip}
          />
        </a>
      </h4>
      <Input
        value={parameters['ui:placeholder']}
        placeholder={settingsModalInputPlaceholderPropPlaceholder}
        key='placeholder'
        type='text'
        onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
          onChange({
            ...parameters,
            'ui:placeholder': ev.target.value,
          });
        }}
        className='card-modal-text'
      />
    </React.Fragment>
  );
}
