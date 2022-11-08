// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Select from 'react-select';
import { createUseStyles } from 'react-jss';
import {
  Alert,
  Input,
  UncontrolledTooltip,
  FormGroup,
  FormFeedback,
} from 'reactstrap';
import {
  faArrowUp,
  faArrowDown,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import FBCheckbox from './checkbox/FBCheckbox';
import Collapse from './Collapse/Collapse';
import CardModal from './CardModal';
import { CardDefaultParameterInputs } from './defaults/defaultInputs';
import Tooltip from './Tooltip';
import Add from './Add';
import Card from './Card';
import {
  checkForUnsupportedFeatures,
  generateElementComponentsFromSchemas,
  countElementsFromSchema,
  addCardObj,
  addSectionObj,
  onDragEnd,
  addCustomField,
} from './utils';
import FontAwesomeIcon from './FontAwesomeIcon';
import { getRandomId } from './utils';
import type { Node } from 'react';
import type { FormInput, Mods } from './types';

const useStyles = createUseStyles({
  sectionContainer: {
    '& .section-head': {
      display: 'flex',
      borderBottom: '1px solid rgba(0,0,0,.125)',
      margin: '0.5em 1.5em 0 1.5em',
      '& h5': {
        color: 'black',
        fontSize: '14px',
        fontWeight: '500',
      },
      '& .section-entry': {
        width: '33%',
        textAlign: 'left',
        padding: '0.5em',
      },
      '& .section-reference': { width: '100%' },
    },
    '& .section-footer': {
      marginTop: '1em',
      textAlign: 'center',
      '& .fa': { cursor: 'pointer' },
    },
    '& .section-interactions': {
      margin: '0.5em 1.5em',
      textAlign: 'left',
      borderTop: '1px solid rgba(0,0,0,.125)',
      paddingTop: '1em',
      '& .fb-checkbox': {
        display: 'inline-block',
        label: { color: '#9aa4ab' },
      },
      '& .interactions-left, & .interactions-right': {
        display: 'inline-block',
        width: '48%',
        margin: '0 auto',
      },
      '& .interactions-left': { textAlign: 'left' },
      '& .interactions-right': { textAlign: 'right' },
    },
  },
  settingsButton: {
    border: 'none',
    margin: '0 10px',
    padding: '18px',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 54 54' style='enable-background:new 0 0 54 54;' xml:space='preserve'%3e%3cg%3e%3cpath d='M27,13c-7.72,0-14,6.28-14,14s6.28,14,14,14s14-6.28,14-14S34.72,13,27,13z M27,39c-6.617,0-12-5.383-12-12s5.383-12,12-12 s12,5.383,12,12S33.617,39,27,39z'/%3e%3cpath d='M51.22,21h-2.018c-0.515-1.912-1.272-3.742-2.26-5.457l1.426-1.426c0.525-0.525,0.814-1.224,0.814-1.966 c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.049-2.881-1.051-3.933,0l-1.426,1.426C36.74,6.07,34.911,5.313,33,4.798 V2.78C33,1.247,31.753,0,30.22,0H23.78C22.247,0,21,1.247,21,2.78v2.018c-1.911,0.515-3.74,1.272-5.457,2.26l-1.426-1.426 c-1.051-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l1.426,1.426 C6.07,17.258,5.312,19.088,4.798,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h2.018 c0.515,1.911,1.272,3.74,2.26,5.457l-1.426,1.426c-0.525,0.525-0.814,1.224-0.814,1.966c0,0.743,0.289,1.441,0.814,1.967 l4.553,4.553c1.05,1.051,2.882,1.052,3.933,0l1.426-1.426c1.717,0.987,3.546,1.745,5.457,2.26v2.018c0,1.533,1.247,2.78,2.78,2.78 h6.439c1.533,0,2.78-1.247,2.78-2.78v-2.018c1.911-0.515,3.74-1.272,5.457-2.26l1.426,1.426c1.052,1.052,2.882,1.05,3.933,0 l4.553-4.553c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-1.426-1.426 c0.987-1.717,1.745-3.546,2.26-5.457h2.018c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22 C52,30.65,51.65,31,51.22,31h-3.592l-0.18,0.773c-0.521,2.237-1.399,4.36-2.613,6.311l-0.42,0.674l2.539,2.539 c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-2.539-2.539l-0.674,0.42 c-1.95,1.214-4.073,2.093-6.311,2.613L31,47.628v3.592C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-3.592 l-0.773-0.18c-2.237-0.521-4.36-1.399-6.311-2.613l-0.674-0.42l-2.539,2.539c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553 c-0.305-0.305-0.305-0.8,0-1.104l2.539-2.539l-0.42-0.674c-1.214-1.95-2.093-4.073-2.613-6.311L6.372,31H2.78 C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h3.592l0.18-0.773c0.521-2.238,1.399-4.361,2.613-6.311l0.42-0.674 l-2.539-2.539c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553c0.304-0.304,0.799-0.306,1.104,0l2.539,2.539l0.674-0.42 c1.95-1.214,4.073-2.093,6.311-2.613L23,6.372V2.78C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v3.592l0.773,0.18 c2.237,0.521,4.36,1.399,6.311,2.613l0.674,0.42l2.539-2.539c0.306-0.306,0.801-0.304,1.104,0l4.553,4.553 c0.305,0.305,0.305,0.8,0,1.104l-2.539,2.539l0.42,0.674c1.214,1.949,2.093,4.072,2.613,6.311L47.628,23h3.592 C51.65,23,52,23.35,52,23.78V30.22z'/%3e%3cpath d='M27,17c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S32.514,17,27,17z M27,35c-4.411,0-8-3.589-8-8s3.589-8,8-8 s8,3.589,8,8S31.411,35,27,35z'/%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e")`,
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  trashButton: {
    border: 'none',
    margin: '0 10px',
    padding: '18px',
    'background-image': `url("data:image/svg+xml;charset=UTF-8,%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 59 59' style='enable-background:new 0 0 59 59;' xml:space='preserve'%3e%3cg%3e%3cpath d='M29.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C28.5,50.553,28.948,51,29.5,51z'/%3e%3cpath d='M19.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C18.5,50.553,18.948,51,19.5,51z'/%3e%3cpath d='M39.5,51c0.552,0,1-0.447,1-1V17c0-0.553-0.448-1-1-1s-1,0.447-1,1v33C38.5,50.553,38.948,51,39.5,51z'/%3e%3cpath d='M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289 C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h2.041l1.915,46.021C10.493,55.743,11.565,59,15.364,59 h28.272c3.799,0,4.871-3.257,4.907-4.958L50.459,8H52.5c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M21.792,2.681 C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681c0.805,0.823,1.128,2.271,1.24,3.319H20.553 C20.665,4.952,20.988,3.504,21.792,2.681z M46.544,53.979C46.538,54.288,46.4,57,43.636,57H15.364 c-2.734,0-2.898-2.717-2.909-3.042L10.542,8h37.915L46.544,53.979z'/%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e ")`,
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
});

export default function Section({
  customFields,
  customItems,
  name,
  required,
  schema,
  uischema,
  onChange,
  onNameChange,
  onRequireToggle,
  onDependentsChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  path,
  definitionData,
  definitionUi,
  hideKey,
  reference,
  dependents,
  dependent,
  parent,
  neighborNames,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  categoryHash,
}: {
  customFields: Array,
  customItems: Array,
  name: string,
  required: boolean,
  schema: { [string]: any },
  uischema: { [string]: any },
  onChange: (
    schema: { [string]: any },
    uischema: { [string]: any },
    ref?: string,
  ) => void,
  onNameChange: (string) => void,
  onDependentsChange: (
    Array<{
      children: Array<string>,
      value?: any,
    }>,
  ) => void,
  onRequireToggle: () => any,
  onDelete: () => any,
  onMoveUp?: () => any,
  onMoveDown?: () => any,
  path: string,
  definitionData: { [string]: any },
  definitionUi: { [string]: any },
  hideKey?: boolean,
  reference?: string,
  dependents?: Array<{
    children: Array<string>,
    value?: any,
  }>,
  dependent?: boolean,
  parent?: string,
  neighborNames?: Array<string>,
  addElem?: (choice: string) => void,
  cardOpen: boolean,
  setCardOpen: (newState: boolean) => void,
  allFormInputs: { [string]: FormInput },
  mods?: Mods,
  categoryHash: { [string]: string },
}): Node {
  const classes = useStyles();
  const { t } = useTranslation();
  const unsupportedFeatures = checkForUnsupportedFeatures(
    schema || {},
    uischema || {},
    allFormInputs,
  );
  const schemaData = schema || {};
  const elementNum = countElementsFromSchema(schemaData);
  const defaultCollapseStates = [...Array(elementNum)].map(() => false);
  const [cardOpenArray, setCardOpenArray] = React.useState(
    defaultCollapseStates,
  );
  // keep name in state to avoid losing focus
  const [keyName, setKeyName] = React.useState(name);
  const [keyError, setKeyError] = React.useState(null);
  // keep requirements in state to avoid rapid updates
  const [modalOpen, setModalOpen] = React.useState(false);
  const [elementId] = React.useState(getRandomId());

  return (
    <React.Fragment>
      <Collapse
        isOpen={cardOpen}
        toggleCollapse={() => setCardOpen(!cardOpen)}
        title={
          <React.Fragment>
            <span onClick={() => setCardOpen(!cardOpen)} className='label'>
              {schemaData.title || keyName}{' '}
              {parent ? (
                <Tooltip
                  text={`Depends on ${parent}`}
                  id={`${elementId}_parentinfo`}
                  type='alert'
                />
              ) : (
                ''
              )}
            </span>
            <span className='arrows'>
              <button
                type='button'
                id={`${elementId}_moveupbiginfo`}
                className='up'
                onClick={() => (onMoveUp ? onMoveUp() : {})}
              ></button>
              <UncontrolledTooltip
                className='local-bootstrap'
                placement='top'
                target={`${elementId}_moveupbiginfo`}
              >
                {t('moveElementUpButtonTooltip')}
              </UncontrolledTooltip>
              <button
                type='button'
                id={`${elementId}_movedownbiginfo`}
                className='down'
                onClick={() => (onMoveDown ? onMoveDown() : {})}
              ></button>
              <UncontrolledTooltip
                className='local-bootstrap'
                placement='top'
                target={`${elementId}_movedownbiginfo`}
              >
                {t('moveElementDownButtonTooltip')}
              </UncontrolledTooltip>
            </span>
          </React.Fragment>
        }
        className={`section-container ${classes.sectionContainer} ${
          dependent ? 'section-dependent' : ''
        } ${reference ? 'section-reference' : ''}`}
      >
        <div
          className={`section-entries ${reference ? 'section-reference' : ''}`}
        >
          <div className='section-head'>
            {reference ? (
              <div className='section-entry section-reference'>
                <h5>Reference Section</h5>
                <Select
                  value={{
                    value: reference,
                    label: reference,
                  }}
                  placeholder='Reference'
                  options={Object.keys(definitionData).map((key) => ({
                    value: `#/definitions/${key}`,
                    label: `#/definitions/${key}`,
                  }))}
                  onChange={(val: any) => {
                    onChange(schema, uischema, val.value);
                  }}
                  className='section-select'
                />
              </div>
            ) : (
              ''
            )}
            <div className='section-entry' data-test='section-object-name'>
              <h5>
                {t('sectionObjectNameLabel')}{' '}
                <Tooltip
                  text={t('cardSectionObjectName')}
                  id={`${elementId}_nameinfo`}
                  type='help'
                />
              </h5>
              <FormGroup>
                <Input
                  invalid={keyError !== null}
                  value={keyName || ''}
                  placeholder={t('cgpiKeyPlaceholder')}
                  type='text'
                  onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
                    setKeyName(ev.target.value)
                  }
                  onBlur={(ev: SyntheticInputEvent<HTMLInputElement>) => {
                    const { value } = ev.target;
                    if (
                      value === name ||
                      !(neighborNames && neighborNames.includes(value))
                    ) {
                      setKeyError(null);
                      onNameChange(value);
                    } else {
                      setKeyName(name);
                      setKeyError(`"${value}" is already in use.`);
                      onNameChange(name);
                    }
                  }}
                  className='card-text'
                  readOnly={hideKey}
                />
                <FormFeedback>{keyError}</FormFeedback>
              </FormGroup>
            </div>
            <div className='section-entry' data-test='section-display-name'>
              <h5>
                {t('sectionDisplayNameLabel')}{' '}
                <Tooltip
                  text={t('cardSectionDisplayName')}
                  id={`${elementId}_titleinfo`}
                  type='help'
                />
              </h5>
              <Input
                value={schemaData.title || ''}
                placeholder={t('cgpiTitlePlaceholder')}
                type='text'
                onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
                  onChange(
                    {
                      ...schema,
                      title: ev.target.value,
                    },
                    uischema,
                  )
                }
                className='card-text'
              />
            </div>
            <div className='section-entry' data-test='section-description'>
              <h5>
                {t('sectionDescriptionLabel')}{' '}
                <Tooltip
                  text={t('cardSectionDescription')}
                  id={`${elementId}_descriptioninfo`}
                  type='help'
                />
              </h5>
              <Input
                value={schemaData.description || ''}
                placeholder={t('cgpiDescPlaceholder')}
                type='text'
                onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
                  onChange(
                    {
                      ...schema,
                      description: ev.target.value,
                    },
                    uischema,
                  )
                }
                className='card-text'
              />
            </div>
            <Alert
              style={{
                display: unsupportedFeatures.length === 0 ? 'none' : 'block',
              }}
              color='warning'
            >
              <h5>Unsupported Features:</h5>
              {unsupportedFeatures.map((message) => (
                <li key={`${elementId}_${message}`}>{message}</li>
              ))}
            </Alert>
          </div>
          <div className='section-body'>
            <DragDropContext
              onDragEnd={(result) =>
                onDragEnd(result, {
                  schema,
                  uischema,
                  onChange,
                  definitionData,
                  definitionUi,
                  categoryHash,
                })
              }
              className='section-body'
            >
              <Droppable droppableId='droppable'>
                {(providedDroppable) => (
                  <div
                    ref={providedDroppable.innerRef}
                    {...providedDroppable.droppableProps}
                  >
                    {generateElementComponentsFromSchemas({
                      customItems,
                      customFields,
                      schemaData: schema,
                      uiSchemaData: uischema,
                      onChange,
                      path,
                      definitionData,
                      definitionUi,
                      cardOpenArray,
                      setCardOpenArray,
                      allFormInputs,
                      mods,
                      categoryHash,
                      Card,
                      Section,
                    }).map((element: any, index) => (
                      <Draggable
                        key={element.key}
                        draggableId={element.key}
                        index={index}
                      >
                        {(providedDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            {element}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {providedDroppable.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className='section-footer'>
            <Add
              addElem={(choice: string) => {
                if (choice === 'card') {
                  addCardObj({
                    schema,
                    uischema,
                    mods,
                    onChange,
                    definitionData,
                    definitionUi,
                    categoryHash,
                  });
                } else if (choice === 'section') {
                  addSectionObj({
                    mods,
                    schema,
                    uischema,
                    onChange,
                    definitionData,
                    definitionUi,
                    categoryHash,
                  });
                } else if (choice !== 'card' && choice !== 'section') {
                  addCustomField({
                    choice,
                    customFields,
                    mods,
                    schema,
                    uischema,
                    onChange,
                    definitionData,
                    definitionUi,
                    categoryHash,
                  });
                }
              }}
              hidden={
                schemaData.properties &&
                Object.keys(schemaData.properties).length !== 0
              }
              mods={mods}
              customItems={customItems}
            />
          </div>
          <div className='section-interactions '>
            <button
              type='button'
              id={`${elementId}_editinfo`}
              className={classes.settingsButton}
              onClick={() => setModalOpen(true)}
            />
            <UncontrolledTooltip
              className='local-bootstrap'
              placement='top'
              target={`${elementId}_editinfo`}
            >
              {t('additionalConfTooltip')}
            </UncontrolledTooltip>

            <button
              type='button'
              id={`${elementId}_trashinfo`}
              className={classes.trashButton}
              onClick={() => (onDelete ? onDelete() : {})}
            />

            <UncontrolledTooltip
              className='local-bootstrap'
              placement='top'
              target={`${elementId}_trashinfo`}
            >
              {t('deleteFormElTooltip')}
            </UncontrolledTooltip>
            <FBCheckbox
              onChangeValue={() => onRequireToggle()}
              isChecked={required}
              label={t('requiredChkbxLabel')}
              id={`${elementId}_required`}
            />
          </div>
        </div>
        <CardModal
          className='local-bootstrap'
          mods={mods}
          componentProps={{
            dependents,
            neighborNames,
            name: keyName,
            schema,
            type: 'object',
            'ui:column': uischema['ui:column'] ?? '',
          }}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onChange={(newComponentProps: { [string]: any }) => {
            onDependentsChange(newComponentProps.dependents);
            onChange(schema, {
              ...uischema,
              'ui:column': newComponentProps['ui:column'],
            });
          }}
          TypeSpecificParameters={CardDefaultParameterInputs}
        />
      </Collapse>
      {addElem ? (
        <Add
          addElem={(choice: string) => addElem(choice)}
          mods={mods}
          customItems={customItems}
          customFields={customFields}
        />
      ) : (
        ''
      )}
    </React.Fragment>
  );
}
