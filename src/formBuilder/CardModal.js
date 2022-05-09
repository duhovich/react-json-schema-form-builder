// @flow

import * as React from 'react';
import {
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import { createUseStyles } from 'react-jss';
import DependencyField from './dependencies/DependencyField';
import type { Node } from 'react';
import type { Parameters, Mods } from './types';
import Tooltip from './Tooltip';

const useStyles = createUseStyles({
  cardModal: {
    '& .card-modal-header': { paddingTop: '.5em', paddingBottom: '.5em' },
    '& .card-modal-entries': { padding: '1em' },
    '& h4, h5, p, label, li': { marginTop: '.5em', marginBottom: '.5em' },
    '& h5, p, label, li': { fontSize: '14px' },
    '& h4': { fontSize: '16px' },
    '& h3': { fontSize: '18px', marginBottom: 0 },
    '& .card-modal-entries > div > input': {
      marginBottom: '1em',
      height: '32px',
    },
    '& .fa-question-circle': { color: 'gray' },
    '& .card-modal-boolean': {
      '& *': { marginRight: '0.25em', height: 'auto', display: 'inline-block' },
    },
    '& .card-modal-select': {
      '& input': { margin: '0', height: '20px' },
      marginBottom: '1em',
    },
  },
  modalBody: {
    top: '10% !important',
  },
});

export default function CardModal({
  componentProps,
  onChange,
  isOpen,
  onClose,
  TypeSpecificParameters,
  mods,
}: {
  componentProps: {
    [string]: any,
  },
  onChange: (any) => void,
  isOpen: boolean,
  onClose: () => void,
  TypeSpecificParameters: React.AbstractComponent<{
    parameters: Parameters,
    onChange: (newParams: Parameters) => void,
  }>,
  mods?: Mods,
}): Node {
  const classes = useStyles();
  // assign state values for parameters that should only change on hitting "Save"
  const [componentPropsState, setComponentProps] =
    React.useState(componentProps);

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
  const settingsModalColumnSizeTooltip = fetchTooltip(
    'settingsModalColumnSizeTooltip',
    'Set the column size of the input',
  );
  const settingsModalHeaderLabel = fetchLabel(
    'settingsModalHeaderLabel',
    'Additional Settings',
  );
  const settingsModalColumnSizeLabel = fetchLabel(
    'settingsModalColumnSizeLabel',
    'Column Size',
  );
  const settingsModalSaveButtonText = fetchLabel(
    'settingsModalSaveButtonText',
    'Save',
  );
  const settingsModalCancelButtonText = fetchLabel(
    'settingsModalCancelButtonText',
    'Cancel',
  );

  React.useEffect(() => {
    setComponentProps(componentProps);
  }, [componentProps]);
  return (
    <div className='local-bootstrap'>
      <Modal
        isOpen={isOpen}
        data-test='card-modal'
        className={`${classes.cardModal}`}
        contentClassName='local-bootstrap'
        wrapClassName='local-bootstrap'
        modalClassName={classes.modalBody}
      >
        <ModalHeader className='card-modal-header local-bootstrap'>
          <div style={{ display: componentProps.hideKey ? 'none' : 'initial' }}>
            <h3>{settingsModalHeaderLabel}</h3>
          </div>
        </ModalHeader>
        <ModalBody className='card-modal-entries local-bootstrap'>
          <TypeSpecificParameters
            mods={mods}
            parameters={componentPropsState}
            onChange={(newState: any) => {
              setComponentProps({
                ...componentPropsState,
                ...newState,
              });
            }}
          />
          <div>
            <h4>
              {settingsModalColumnSizeLabel}
              <a
                href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Tooltip
                  id='column_size_tooltip'
                  type='help'
                  text={settingsModalColumnSizeTooltip}
                />
              </a>
            </h4>
            <Input
              value={
                componentPropsState['ui:column']
                  ? componentPropsState['ui:column']
                  : ''
              }
              placeholder={settingsModalColumnSizeLabel}
              key='ui:column'
              type='number'
              min={0}
              onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
                setComponentProps({
                  ...componentPropsState,
                  'ui:column': ev.target.value,
                });
              }}
              className='card-modal-text'
            />
          </div>
          <DependencyField
            mods={mods}
            parameters={(componentPropsState: { [string]: any })}
            onChange={(newState: any) => {
              setComponentProps({
                ...componentPropsState,
                ...newState,
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              onClose();
              onChange(componentPropsState);
            }}
            color='primary'
          >
            {settingsModalSaveButtonText}
          </Button>
          <Button
            onClick={() => {
              onClose();
              setComponentProps(componentProps);
            }}
            color='secondary'
          >
            {settingsModalCancelButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
