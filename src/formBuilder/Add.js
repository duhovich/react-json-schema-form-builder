// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Popover,
  PopoverHeader,
  PopoverBody,
  UncontrolledTooltip,
  Button,
} from 'reactstrap';
import { createUseStyles } from 'react-jss';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import FontAwesomeIcon from './FontAwesomeIcon';
import FBRadioGroup from './radio/FBRadioGroup';
import { getRandomId } from './utils';
import type { Node } from 'react';
import type { Mods } from './types';

const useStyles = createUseStyles({
  addDetails: {
    '& .popover': {
      width: '300px',
      'z-index': '1051 !important',
      '& .popover-inner': {
        border: '1px solid #1d71ad',
        borderRadius: '4px',
        '& .popover-header': { borderBottom: '1px solid #1d71ad' },
        '& .action-buttons': {
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '.5em',
        },
      },
    },
  },
});

export default function Add({
  customItems,
  addElem,
  hidden,
  mods,
}: {
  customItems?: [],
  addElem: (choice: string) => void,
  hidden?: boolean,
  mods?: Mods,
}): Node {
  const classes = useStyles();
  const { t } = useTranslation();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [createChoice, setCreateChoice] = useState('card');
  const [elementId] = useState(getRandomId());

  return (
    <div
      style={{ display: hidden ? 'none' : 'initial' }}
      className='local-bootstrap'
    >
      <span id={`${elementId}_add`}>
        <FontAwesomeIcon
          icon={faPlusSquare}
          onClick={() => setPopoverOpen(true)}
        />
      </span>
      <UncontrolledTooltip
        placement='top'
        target={`${elementId}_add`}
        className='local-bootstrap'
      >
        {t('addTooltip')}
      </UncontrolledTooltip>
      <Popover
        placement='bottom'
        target={`${elementId}_add`}
        isOpen={popoverOpen}
        toggle={() => setPopoverOpen(false)}
        className={`add-details ${classes.addDetails} local-bootstrap`}
        id={`${elementId}_add_popover`}
      >
        <PopoverHeader className='local-bootstrap'>
          {t('addPopoverHeaderLabel')}
        </PopoverHeader>
        <PopoverBody className='local-bootstrap'>
          <FBRadioGroup
            className='choose-create local-bootstrap'
            defaultValue={createChoice}
            horizontal={false}
            options={
              customItems
                ? [
                    {
                      value: 'card',
                      label: t('addPopoverFormElementLabel'),
                    },
                    {
                      value: 'section',
                      label: t('addPopoverFormSectionLabel'),
                    },
                    ...customItems,
                  ]
                : [
                    {
                      value: 'card',
                      label: t('addPopoverFormElementLabel'),
                    },
                    {
                      value: 'section',
                      label: t('addPopoverFormSectionLabel'),
                    },
                  ]
            }
            onChange={(selection) => {
              setCreateChoice(selection);
            }}
          />
          <div className='action-buttons local-bootstrap'>
            <Button onClick={() => setPopoverOpen(false)} color='secondary'>
              {t('addPopoverCancelButtonLabel')}
            </Button>
            <Button
              onClick={() => {
                addElem(createChoice);
                setPopoverOpen(false);
              }}
              color='primary'
            >
              {t('addPopoverCreateButtonLabel')}
            </Button>
          </div>
        </PopoverBody>
      </Popover>
    </div>
  );
}
