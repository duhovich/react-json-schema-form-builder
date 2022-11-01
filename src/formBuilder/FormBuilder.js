// @flow
import * as React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Alert, Input, Form, Row, Col, FormGroup, Label } from 'reactstrap';
import { createUseStyles } from 'react-jss';
import Card from './Card';
import Section from './Section';
import Add from './Add';
import { arrows as arrowsStyle } from './styles';
import {
  parse,
  stringify,
  checkForUnsupportedFeatures,
  generateElementComponentsFromSchemas,
  addCardObj,
  addSectionObj,
  addCustomField,
  onDragEnd,
  countElementsFromSchema,
  generateCategoryHash,
  excludeKeys,
} from './utils';
import DEFAULT_FORM_INPUTS from './defaults/defaultFormInputs';
import type { Node } from 'react';
import type { Mods } from './types';
import { useTranslation } from 'react-i18next';

const useStyles = createUseStyles({
  formBuilder: {
    'text-align': 'center',
    '& .fa': {
      cursor: 'pointer',
    },
    '& .fa-question-circle': {
      color: 'gray',
    },
    '& .fa-asterisk': {
      'font-size': '.9em',
      color: 'green',
    },
    '& .fa-plus-square': {
      color: 'green',
      'font-size': '1.5em',
      margin: '0 auto',
    },
    ...arrowsStyle,
    '& .card-container': {
      '&:hover': {},
      display: 'block',
      // width: '70%',
      'min-width': '400px',
      margin: '2em 20px',
      border: '1px solid rgba(0,0,0,.225)',
      'border-radius': '4px',
      'background-color': 'white',
      'box-shadow': 'rgb(0 0 0 / 10%) 0px 1px 3px 0px',
      '& .collapse-head': {
        'border-bottom': '1px solid rgba(0,0,0,.125)',
      },
      '& .label': {
        width: '100%',
        'font-size': '18px',
        'text-align': 'left',
        'font-weight': '500',
        margin: '10px',
        color: '#0009',
      },
    },
    '& .card-container:hover': {},
    '& .card-dependent': {
      border: '1px dashed gray',
    },
    '& .card-requirements': {
      border: '1px dashed black',
    },
    '& .section-container': {
      '&:hover': {},
      display: 'block',
      'min-width': '400px',
      margin: '1.5em 20px',
      border: '1px solid rgba(0,0,0,.225)',
      'border-radius': '4px',
      'background-color': 'white',
      'box-shadow': 'rgb(0 0 0 / 25%) 0px 1px 3px 0px',
      '& h4': {
        width: '100%',
        'text-align': 'left',
        display: 'inline-block',
        color: '#138AC2',
        margin: '0.25em .5em 0 .5em',
        'font-size': '18px',
      },
      '& .collapse-head': { 'border-bottom': '1px solid rgba(0,0,0,.125)' },
      '& .label': {
        width: '100%',
        'font-size': '18px',
        'text-align': 'left',
        'font-weight': '500',
        margin: '10px',
        color: '#0009',
      },
    },
    '& .section-container:hover': {},
    '& .section-dependent': {
      border: '1px dashed gray',
    },
    '& .section-requirements': {
      border: '1px dashed black',
    },
    '& .alert': {
      textAlign: 'left',
      width: '70%',
      margin: '1em auto',
      '& h5': {
        color: 'black',
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '0',
      },
      '& .fa': { fontSize: '14px' },
    },
    '& .disabled-unchecked-checkbox': {
      color: 'gray',
      '& div::before': { backgroundColor: 'lightGray' },
    },
    '& .disabled-input': {
      '& input': { backgroundColor: 'lightGray' },
      '& input:focus': {
        backgroundColor: 'lightGray',
        border: '1px solid gray',
      },
    },
  },
  formHead: {
    display: 'block',
    margin: '0 auto',
    // 'background-color': '#EBEBEB',
    // border: '1px solid #858F96',
    width: '100%',
    padding: '10px 20px',
    textAlign: 'left',
  },
  formBody: {
    display: 'flex',
    flexDirection: 'column',
    '& .fa-pencil-alt': {
      border: '1px solid #1d71ad',
      color: '#1d71ad',
    },
    '& .modal-body': {
      maxHeight: '500px',
      overflowY: 'scroll',
    },
    '& .card-add': {
      cursor: 'pointer',
      display: 'block',
      color: '$green',
      fontSize: '1.5em',
    },
  },
  formFooter: {
    marginTop: '1em',
    textAlign: 'center',
    '& .fa': { cursor: 'pointer', color: '$green', fontSize: '1.5em' },
  },
});

export default function FormBuilder({
  schema,
  uischema,
  onChange,
  mods,
  className,
  customFields,
  customItems,
  isShowAlerts,
  language,
}: {
  language?: string,
  isShowAlerts: Boolean,
  customFields: Array,
  customItems?: Array,
  schema: string,
  uischema: string,
  onChange: (string, string) => any,
  mods?: Mods,
  className?: string,
}): Node {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const schemaData = (parse(schema): { [string]: any }) || {};
  schemaData.type = 'object';
  const uiSchemaData = (parse(uischema): { [string]: any }) || {};
  const allFormInputs = excludeKeys(
    Object.assign(
      {},
      DEFAULT_FORM_INPUTS,
      (mods && mods.customFormInputs) || {},
    ),
    mods && mods.deactivatedFormInputs,
  );

  if (language) {
    if (i18n.language !== language && i18n.languages.includes(language)) {
      i18n.changeLanguage(language);
    }
  }

  const unsupportedFeatures = checkForUnsupportedFeatures(
    schemaData,
    uiSchemaData,
    allFormInputs,
  );
  if (unsupportedFeatures.length !== 0) {
    console.error(unsupportedFeatures);
  }

  const elementNum = countElementsFromSchema(schemaData);
  const defaultCollapseStates = [...Array(elementNum)].map(() => false);
  const [cardOpenArray, setCardOpenArray] = React.useState(
    defaultCollapseStates,
  );
  const categoryHash = generateCategoryHash(allFormInputs);
  return (
    <div className={`${classes.formBuilder} ${className || ''}`}>
      {isShowAlerts && (
        <Alert
          style={{
            display: unsupportedFeatures.length === 0 ? 'none' : 'block',
          }}
          color='warning'
        >
          <h5>Unsupported Features:</h5>
          {unsupportedFeatures.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </Alert>
      )}

      {(!mods || mods.showFormHead !== false) && (
        <Form className={classes.formHead} data-test='form-head'>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for='formName'>{t('formNameLabel')}</Label>
                <Input
                  id='formName'
                  value={schemaData.title || ''}
                  placeholder={t('formNamePlaceholder')}
                  type='text'
                  onChange={(ev: SyntheticInputEvent<HTMLInputElement>) => {
                    onChange(
                      stringify({
                        ...schemaData,
                        title: ev.target.value,
                      }),
                      uischema,
                    );
                  }}
                  className='form-title'
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='formDescription'>{t('formDescriptionLabel')}</Label>
                <Input
                  id='formDescription'
                  value={schemaData.description || ''}
                  placeholder={t('formDescriptionPlaceholder')}
                  type='text'
                  onChange={(ev: SyntheticInputEvent<HTMLInputElement>) =>
                    onChange(
                      stringify({
                        ...schemaData,
                        description: ev.target.value,
                      }),
                      uischema,
                    )
                  }
                  className='form-description'
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      )}
      <div className={`form-body ${classes.formBody}`}>
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, {
              schema: schemaData,
              uischema: uiSchemaData,
              onChange: (newSchema, newUiSchema) =>
                onChange(stringify(newSchema), stringify(newUiSchema)),
              definitionData: schemaData.definitions,
              definitionUi: uiSchemaData.definitions,
              categoryHash,
            })
          }
          className='form-body'
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
                  schemaData,
                  uiSchemaData,
                  onChange: (newSchema, newUiSchema) =>
                    onChange(stringify(newSchema), stringify(newUiSchema)),
                  definitionData: schemaData.definitions,
                  definitionUi: uiSchemaData.definitions,
                  path: 'root',
                  cardOpenArray,
                  setCardOpenArray,
                  allFormInputs,
                  mods,
                  categoryHash,
                  Card,
                  Section,
                }).map((element: any, index) => (
                  <Draggable
                    customItems={customItems}
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
      <div className={`form-footer ${classes.formFooter} local-bootstrap`}>
        <Add
          addElem={(choice: string) => {
            if (choice === 'card') {
              addCardObj({
                schema: schemaData,
                uischema: uiSchemaData,
                mods: mods,
                onChange: (newSchema, newUiSchema) =>
                  onChange(stringify(newSchema), stringify(newUiSchema)),
                definitionData: schemaData.definitions,
                definitionUi: uiSchemaData.definitions,
                categoryHash,
              });
            } else if (choice === 'section') {
              addSectionObj({
                mods: mods,
                schema: schemaData,
                uischema: uiSchemaData,
                onChange: (newSchema, newUiSchema) =>
                  onChange(stringify(newSchema), stringify(newUiSchema)),
                definitionData: schemaData.definitions,
                definitionUi: uiSchemaData.definitions,
                categoryHash,
              });
            } else if (choice !== 'card' && choice !== 'section') {
              addCustomField({
                choice: choice,
                customFields: customFields,
                mods: mods,
                schema: schemaData,
                uischema: uiSchemaData,
                onChange: (newSchema, newUiSchema) =>
                  onChange(stringify(newSchema), stringify(newUiSchema)),
                definitionData: schemaData.definitions,
                definitionUi: uiSchemaData.definitions,
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
          customFields={customFields}
        />
      </div>
    </div>
  );
}
