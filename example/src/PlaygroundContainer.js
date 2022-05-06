// @flow

import React from 'react';

import JsonSchemaFormSuite from './JsonSchemaFormSuite';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    '& h1': {
      textAlign: 'center',
      margin: '1em',
    },
    '& p': {
      marginRight: '5em',
      marginLeft: '5em',
    },
  },
});

// Can be used to set initial schemas and mods (useful for development)
const initialJsonSchema = {};
const initialUiSchema = {};
const customFields = [{
  name: `fullName`,
  required: true,
  dataOptions: {
    title: `ПІБ`,
    type: 'object',
    default: '',
  },
  uiOptions: {},
  propType: 'section',
  schema: {
    title: `ПІБ`,
    type: 'object',
    properties: {
      secondName: { title: 'Прізвище', type: 'string' },
      name: { title: "Ім'я", type: 'string' },
      middleName: { title: 'По батькові', type: 'string' },
    },
    required: ['secondName', 'name', 'middleName'],
  },
  uischema: {},
  neighborNames: [],
},
{
  name: `fullNameTEST`,
  required: true,
  dataOptions: {
    title: `ПІБ`,
    type: 'object',
    default: '',
  },
  uiOptions: {},
  propType: 'section',
  schema: {
    title: `ПІБ`,
    type: 'object',
    properties: {
      secondName: { title: 'Прізвище', type: 'string' },
      name: { title: "Ім'я", type: 'string' },
      middleName: { title: 'По батькові', type: 'string' },
    },
    required: ['secondName', 'name', 'middleName'],
  },
  uischema: {},
  neighborNames: [],
},
{
  name: `fullNameTEST2`,
  required: true,
    dataOptions: {
      title: `Проект землеустрою`,
      type: 'string',
      default: ''
    },
    uiOptions: {
      'ui:widget': 'file'
    },
    propType: 'card',
    schema: {
      title: `Проект землеустрою`,
      type: 'data-url',
      properties: {},
      required: []
    },
    uischema: {},
    neighborNames: []
}]

const mods = {tooltipDescriptions: {
  add: "test string",
  moveElementUpButtonTooltip: "test string",
  moveElementDownButtonTooltip: "test string",
  additionalConfTooltip: "test string",
  deleteFormElTooltip: "test string",
  cardObjectName: "test string",
  cardDisplayName: "test string",
  cardDescription: "test string",
  cardInputType: "test string",
  cardSectionObjectName: "test string",
  cardSectionDisplayName: "test string",
  cardSectionDescription: "test string",
  settingsModalColumnSizeTooltip: "test string",
  settingsModalDependenciesTooltip: "test string",
  settingsModalDependenciesAddTooltip: "test string",
  settingsModalDependenciesSpecificTooltip: "test string",
  settingsModalDependenciesDisplayFollowingTooltip: "test string",
  settingsModalInputRegExpTooltip:'regexp tooltip',
  settingsModalInputPlaceholderPropTooltip:'placeholder tooltip',
  settingsModalInputColumnSizeTooltip:'Column size tooltip',
  settingsModalInputFormatTooltip:'Format test',
  settingsModalInputAutoCompleteTooltip:'Auto complete test',
  settingsModalInputNumberMultOfTooltip:'Multiple of test',
},
labels: {
  formNameLabel: "test string",
  formDescriptionLabel: "test string",
  formNamePlaceholder: "test string",
  formDescriptionPlaceholder: "test string",
  addPopoverHeaderLabel: "test string",
  addPopoverFormFullNameLabel: "ПІБ",
  addPopoverFormElementLabel: "test string",
  addPopoverFormSectionLabel: "test string",
  addPopoverCancelButtonLabel: "test string",
  addPopoverCreateButtonLabel: "test string",
  cgpiKeyPlaceholder: "test string",
  cgpiTitlePlaceholder: "test string",
  cgpiDescPlaceholder: "test string",
  settingsModalHeaderLabel: "test string head",
  settingsModalSaveButtonText: 'Зберегти',
  settingsModalCancelButtonText: 'Відмінити',
  settingsModalColumnSizeLabel: "test string",
  settingsModalDependenciesLabel: "test string",
  settingsModalDependenciesAnyLabel: "test string",
  settingsModalDependenciesSpecificLabel: "test string",
  settingsModalDependenciesDisplayFollowingLabel: "test string deps",
  settingsModalDependenciesDisplayFollowingPlaceholder: "test string",
  requiredChkbxLabel: "test string",
  objectNameLabel: "test string",
  displayNameLabel: "test string",
  descriptionLabel: "test string",
  inputTypeLabel: "test string",
  sectionObjectNameLabel: "test string",
  sectionDisplayNameLabel: "test string",
  sectionDescriptionLabel: "test string",
  inputDefaultValueLabel:"test string",
  inputDefaultValuePlaceholder: "test string",
  inputDefaultPasswordLabel: "test string",
  inputDefaultPasswordPlaceholder: "test string",
  inputDefaultNumberLabel:"test string",
  inputDefaultNumberPlaceholder: "test string",
  inputDefaultCheckboxLabel:"test string",
  settingsModalInputMinLengthLabel: 'min',
  settingsModalInputMinLengthPlaceholder: 'min',
  settingsModalInputMaxLengthLabel: 'max',
  settingsModalInputMaxLengthPlaceholder: 'max',
  settingsModalInputRegExpLabel: 'regexp',
  settingsModalInputRegExpPlaceholder: "regexp",
  settingsModalInputPlaceholderPropLabel: "placeholder",
  settingsModalInputPlaceholderPropPlaceholder: "placeholder",
  settingsModalInputAutoFocusLabel: "auto focus test",
  settingsModalInputColumnSizeLabel: "col size",
  settingsModalInputColumnSizePlaceholder: 'col size',
  settingsModalInputFormatLabel: "format test",
  settingsModalInputFormatPlaceholder: 'autocompl',
  settingsModalInputFormatItemEmail: 'Пошта',
  settingsModalInputFormatItemHostname: 'Ім\'я хоста',
  settingsModalInputFormatItemURI: 'Посилання',
  settingsModalInputFormatItemRegEx: 'Регулярний вираз',
  settingsModalInputAutoCompleteUserName: 'Ім\'я користувача',
  settingsModalInputAutoCompleteItemPassword: 'Пароль',
  settingsModalInputAutoCompleteItemAddress: 'Адреса',
  settingsModalInputAutoCompleteItemCountry: 'Країна',
  settingsModalInputAutoCompleteLabel: "autocompl",
  settingsModalInputAutoCompletePlaceholder: 'format test',
  settingsModalInputArrayMinItemsLabel: 'min items test',
  settingsModalInputArrayMinItemsPlaceholder: 'string',
  settingsModalInputArrayMaxItemsLabel: 'max items test',
  settingsModalInputArrayMaxItemsPlaceholder: 'string',
  settingsModalInputArraySectionCheckboxLabel: 'Section test',
  settingsModalInputNumberMultOfLabel: 'Mult of',
  settingsModalInputNumberMultOfPlaceholder: 'string',
  settingsModalInputNumberMinLabel: 'Minimum string',
  settingsModalInputNumberMinPlaceholder: 'string',
  settingsModalInputNumberCheckBoxExMinLabel: 'ExMin',
  settingsModalInputNumberMaxLabel: 'Maximum string',
  settingsModalInputNumberMaxPlaceholder: 'string',
  settingsModalInputNumberCheckBoxExMaxLabel: 'ExMax',
  dropdownPossibleValuesLabel:"test string",
  dropdownPossibleValuesDescriptionLabel:"test string",
  dropdownForceNumberDescriptionLabel:"test string",
  dropdownInputPlaceholder:"test string",
  dropdownInputEnumPlaceholder:"test string",
  newElementDefaultSectionLabel:"test SECTION",
  newElementDefaultInputLabel:"test INPUT"
},
widespreadWords: {
  ifWord: 'Якщо',
  hasWord: 'має ',
  theValueWord: 'значення',
  aValueWord: 'значення',
  noneWord:'Не обрано',
},
};
const customItems =[{
  value: 'fullName',
  label: mods.labels.addPopoverFormFullNameLabel,
},
{
  value: 'fullNameTEST',
  label: 'customItem',
},
{
  value: 'fullNameTEST2',
  label: 'customItem2',
}]

export default function PlaygroundContainer({ title }: { title: string }) {
  const [schema, setSchema] = React.useState(JSON.stringify(initialJsonSchema));
  const [uischema, setUischema] = React.useState(
    JSON.stringify(initialUiSchema),
  );
  const classes = useStyles();
  return (
    <div className='playground'>
      <div className={classes.header}>
        <h1>{title}</h1>
        <p>
          Demo app for the{' '}
          <a href='https://github.com/ginkgobioworks/react-json-schema-form-builder'>
            React JSON Schema Form Builder
          </a>
          , which allows a user to visually build a form and obtain the JSON
          Schema corresponding to it
        </p>
        <p>
          The Visual Form Builder tab corresponds to the actual Form Builder
          component. This reads in code from the JSON Schema, which is stored
          and updated live in the "Edit Schema" tab, and renders the code as
          manipulatable form elements. The result of the form is rendered with
          the material design theme in the Preview Form tab. The Pre-Configured
          Components tab also demonstrates how the form builder takes advantage
          of the definitions property of JSON Schema to render definitions.
        </p>
      </div>
      <JsonSchemaFormSuite
        lang={'json'}
        schema={schema}
        uischema={uischema}
        customFields={customFields}
        customItems={customItems}
        mods={mods}
        schemaTitle='Data Schema'
        uischemaTitle='UI Schema'
        onChange={(newSchema: string, newUiSchema: string) => {
          setSchema(newSchema);
          setUischema(newUiSchema);
        }}
        width='95%'
        height='800px'
      />
    </div>
  );
}
