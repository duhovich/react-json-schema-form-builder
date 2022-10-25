// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <h4>
        {t('settingsModalInputPlaceholderPropLabel')}{' '}
        <a
          href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-placeholder'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Tooltip
            id={`${elementId}_placeholder`}
            type='help'
            text={t('settingsModalInputPlaceholderPropTooltip')}
          />
        </a>
      </h4>
      <Input
        value={parameters['ui:placeholder']}
        placeholder={t('settingsModalInputPlaceholderPropPlaceholder')}
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
