// @flow

import React, { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../Tooltip';
import CardSelector from './CardSelector';
import ValueSelector from './ValueSelector';
import FontAwesomeIcon from '../FontAwesomeIcon';
import { getRandomId } from '../utils';
import type { Node } from 'react';
import { Mods } from '../types';

// a possible dependency
export default function DependencyPossibility({
  mods,
  possibility,
  neighborNames,
  path,
  onChange,
  onDelete,
  parentEnums,
  parentType,
  parentName,
  parentSchema,
}: {
  mods: Mods,
  possibility: {
    children: Array<string>,
    value?: any,
  },
  neighborNames: Array<string>,
  path: string,
  onChange: (newPossibility: {
    children: Array<string>,
    value?: any,
  }) => void,
  onDelete: () => void,
  parentEnums?: Array<string | number>,
  parentType?: string,
  parentName?: string,
  parentSchema?: any,
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
  const ifWord = fetchWidespread('ifWord', 'If');
  const hasWord = fetchWidespread('hasWord', 'has');
  const theValueWord = fetchWidespread('theValueWord', 'the value');
  const aValueWord = fetchWidespread('aValueWord', 'a value');
  const settingsModalDependenciesDisplayFollowingTooltip = fetchTooltip(
    'settingsModalDependenciesDisplayFollowingTooltip',
    'Choose the other form elements that depend on this one',
  );
  const settingsModalDependenciesDisplayFollowingLabel = fetchLabel(
    'settingsModalDependenciesDisplayFollowingLabel',
    'Display the following:',
  );
  const settingsModalDependenciesDisplayFollowingPlaceholder = fetchLabel(
    'settingsModalDependenciesDisplayFollowingPlaceholder',
    'Choose a dependent...',
  );
  return (
    <div className='form-dependency-condition'>
      <h5>
        {settingsModalDependenciesDisplayFollowingLabel}
        <Tooltip
          id={`${elementId}_bulk`}
          type='help'
          text={settingsModalDependenciesDisplayFollowingTooltip}
        />
      </h5>
      <CardSelector
        possibleChoices={
          neighborNames.filter((name) => name !== parentName) || []
        }
        chosenChoices={possibility.children}
        onChange={(chosenChoices: Array<string>) =>
          onChange({ ...possibility, children: [...chosenChoices] })
        }
        placeholder={settingsModalDependenciesDisplayFollowingPlaceholder}
        path={path}
      />
      <h5>
        {ifWord} "{parentName}" {hasWord}
        {possibility.value ? `${theValueWord}:` : `${aValueWord}.`}
      </h5>
      <div style={{ display: possibility.value ? 'block' : 'none' }}>
        <ValueSelector
          possibility={possibility}
          onChange={(newPossibility: {
            children: Array<string>,
            value?: any,
          }) => onChange(newPossibility)}
          parentEnums={parentEnums}
          parentType={parentType}
          parentName={parentName}
          parentSchema={parentSchema}
          path={path}
        />
      </div>
      <FontAwesomeIcon icon={faTimes} onClick={() => onDelete()} />
    </div>
  );
}
