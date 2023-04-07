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
const customFields = [
  {
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
        lastName: { title: 'Прізвище', type: 'string', maxLength: 50 },
        firstName: { title: "Ім'я", type: 'string', maxLength: 50 },
        patronymic: { title: 'По батькові', type: 'string', maxLength: 50 },
      },
      required: ['lastName', 'firstName'],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `documentData`,
    required: true,
    dataOptions: {
      title: `Паспорт громадянина України`,
      type: 'object',
      default: '',
    },
    uiOptions: {},
    propType: 'section',
    schema: {
      title: `Паспорт громадянина України`,
      type: 'object',
      properties: {
        series: {
          title: 'Серія паспорта',
          type: 'string',
          minLength: 2,
          maxLength: 2,
        },
        number: {
          title: 'Номер паспорта',
          type: 'string',
          minLength: 6,
          maxLength: 6,
        },
        dateIssue: {
          title: 'Дата видачі паспорта',
          type: 'string',
          format: 'date',
        },
      },
      required: ['series', 'number', 'dateIssue'],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `phone`,
    required: true,
    dataOptions: {
      title: `Телефон`,
      type: 'string',
      default: '',
      maxLength: 15,
    },
    uiOptions: {
      'ui:placeholder': '380xxxxxxxxx',
      'ui:options': {
        inputType: 'tel',
      },
    },
    propType: 'card',
    schema: {
      title: `телефон`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `address`,
    required: true,
    dataOptions: {
      title: `Адреса`,
      type: 'string',
      default: '',
      maxLength: 250,
    },
    uiOptions: {
      'ui:placeholder': 'смт. xxx вул. xxx буд. xx',
    },
    propType: 'card',
    schema: {
      title: `Адреса`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `location`,
    required: true,
    dataOptions: {
      title: `Місце розташування земельної ділянки`,
      type: 'string',
      default: '',
      maxLength: 250,
    },
    uiOptions: {},
    propType: 'card',
    schema: {
      title: `Місце розташування земельної ділянки`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `categoryOfLands`,
    required: true,
    dataOptions: {
      title: `Категорія земель`,
      type: 'string',
      default: '',
      maxLength: 250,
    },
    uiOptions: {},
    propType: 'card',
    schema: {
      title: `Категорія земель`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `transmit_as`,
    required: true,
    dataOptions: {
      title: `Форма видачі відомостей`,
      type: 'string',
      default: 1,
      enum: [1, 2],
      enumNames: ['у паперовій формі', 'у електронній та паперовій формі'],
    },
    uiOptions: {},
    propType: 'card',
    schema: {
      title: `Форма видачі відомостей`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `documentType`,
    required: true,
    dataOptions: {
      title: `Тип документу, що посвідчує особу`,
      type: 'string',
      default: 1,
      enum: [1, 2],
      enumNames: [
        'Паспорт громадянина України',
        'Паспорт громадянина України у формі картки',
      ],
    },
    uiOptions: {},
    propType: 'card',
    schema: {
      title: `Тип документу, що посвідчує особу`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },

  {
    name: 'ownerDocument',
    required: true,
    dataOptions: {
      title: `Документ на право власності`,
      type: 'object',
      default: '',
    },

    uiOptions: {},
    propType: 'section',
    schema: {
      title: `Документ на право власності`,
      type: 'object',
      dependencies: {
        documentOwnerType: {
          oneOf: [
            {
              properties: {
                documentOwnerType: {
                  enum: ['Державний акт', 'Свідоцтво про право власності'],
                },
                documentOwner: {
                  title: 'Серія та номер документу на право власності',
                  type: 'string',
                },
              },
            },
          ],
        },
      },
      properties: {
        documentOwnerType: {
          title: 'Тип документу на право власності',
          type: 'string',
          default: 'Немає',
          enum: ['Немає', 'Державний акт', 'Свідоцтво про право власності'],
        },
      },
      required: ['documentOwnerType', 'documentOwner'],
    },
    uischema: {},
    neighborNames: [],
  },

  // {
  //   name: `documentOwnerType`,
  //   required: true,
  //   dataOptions: {
  //     title: `Тип документу на право власності`,
  //     type: 'string',
  //     default: 'Немає',
  //     enum: ['Немає', 'Державний акт', 'Свідоцтво про право власності']
  //   },
  //   dependents: [
  //     {
  //       children: ['documentOwner'],
  //       value: {
  //         enum: ['Державний акт', 'Свідоцтво про право власності']
  //       }
  //     }
  //   ],

  //   uiOptions: {},
  //   propType: 'card',
  //   schema: {
  //     title: `Тип документу на право власності`,
  //     type: 'string',
  //     properties: {},
  //     required: []
  //   },
  //   uischema: {},
  //   neighborNames: []
  // },
  // {
  //   name: `documentOwner`,
  //   required: true,
  //   dataOptions: {
  //     title: `Серія та номер документу на право власності`,
  //     type: 'string',
  //     default: 'Немає'
  //   },
  //   uiOptions: {},
  //   propType: 'card',
  //   schema: {
  //     title: `Серія та номер документу на право власності`,
  //     type: 'string',
  //     properties: {},
  //     required: []
  //   },
  //   uischema: {},
  //   neighborNames: [],
  //   dependent: true
  // },
  {
    name: `accept`,
    required: true,
    dataOptions: {
      title: `Надаю дозвіл на обробку моїх персональних даних з метою отримання відповідних послуг та використання цих даних для ведення Державного земельного кадастру згідно з вимогами законодавства.`,
      type: 'boolean',
      default: '',
      maxLength: 250,
    },
    uiOptions: {},
    propType: 'card',
    schema: {
      title: `Надаю дозвіл на обробку моїх персональних даних з метою отримання відповідних послуг та використання цих даних для ведення Державного земельного кадастру згідно з вимогами законодавства.`,
      type: 'boolean',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `landArea`,
    required: true,
    dataOptions: {
      title: `Площа земельної ділянки, Га`,
      type: 'number',
      default: '',
      minimum: 0.0001,
    },
    uiOptions: {},
    propType: 'card',
    schema: {
      title: `Площа земельної ділянки, Га`,
      type: 'number',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `cadastralNumber`,
    required: true,
    dataOptions: {
      title: `Кадастровий номер`,
      type: 'string',
      default: '',
    },
    uiOptions: {
      'ui:placeholder': 'xxxxxxxxxx:xx:xxx:xxxx',
    },
    propType: 'card',
    schema: {
      title: `Кадастровий номер`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `ITN`,
    required: true,
    dataOptions: {
      title: `Ідентифікаційний (податковий) номер`,
      type: 'string',
      default: '',
      minLength: 10,
      maxLength: 10,
    },
    uiOptions: {},
    propType: 'card',
    schema: {
      title: `Ідентифікаційний (податковий) номер`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `purposeOfTheLandPlot`,
    required: true,
    dataOptions: {
      title: `Цільове призначення земельної ділянки`,
      type: 'string',
      default: '',
    },
    uiOptions: {
      'ui:help':
        'Відповідно до Класифікації видів цільового призначення земель, затвердженої наказом Державного комітету України із земельних ресурсів від 23 липня 2010 року N 548, зареєстрованої в Міністерстві юстиції України 01 листопада 2010 року за N 1011/18306',
    },
    propType: 'card',
    schema: {
      title: `Цільове призначення земельної ділянки`,
      type: 'string',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
  {
    name: `landManagement`,
    required: true,
    dataOptions: {
      title: `Проект землеустрою`,
      type: 'string',
      default: '',
    },
    uiOptions: {
      'ui:widget': 'file',
    },
    propType: 'card',
    schema: {
      title: `Проект землеустрою`,
      type: 'data-url',
      properties: {},
      required: [],
    },
    uischema: {},
    neighborNames: [],
  },
];

const mods = {
  tooltipDescriptions: {
    add: 'Додати нове поле чи секцію',
    moveElementUpButtonTooltip: 'Перемістити вгору',
    moveElementDownButtonTooltip: 'Перемістити вниз',
    additionalConfTooltip: 'Додаткові налаштування',
    deleteFormElTooltip: 'Видалити елемент',
    cardObjectName: "Назва об'єкта яка буде записана в схему.",
    cardDisplayName: 'Назва поля, що буде відображена.',
    cardDescription: 'Пояснення до поля, що буде відображене нижче його назви.',
    cardInputType:
      'Стандартні типи полів. Це впливає на можливі налаштування, властивості поля.',
    cardSectionObjectName: "Назва об'єкта яка буде записана в схему.",
    cardSectionDisplayName: 'Назва секції, що буде відображена.',
    cardSectionDescription:
      'Пояснення до секції, що буде відображене нижче її назви.',
    // settingsModalColumnSizeTooltip: 'test string',
    settingsModalDependenciesTooltip:
      'Реакція форми на обрану або додану інформацію',
    settingsModalDependenciesAddTooltip: 'Додати залежність',
    settingsModalDependenciesSpecificTooltip: 'Специфічні залежності',
    settingsModalDependenciesDisplayFollowingTooltip: 'Показати наступне поле',
    settingsModalInputRegExpTooltip: 'regexp tooltip',
    settingsModalInputPlaceholderPropTooltip: 'placeholder tooltip',
    // settingsModalInputColumnSizeTooltip: 'Column size tooltip',
    settingsModalInputFormatTooltip: 'Format test',
    settingsModalInputAutoCompleteTooltip: 'Auto complete test',
    settingsModalInputNumberMultOfTooltip: 'Multiple of test',
  },
  labels: {
    formNameLabel: 'Назва форми',
    formDescriptionLabel: 'Текст пояснення',
    formNamePlaceholder: 'Назва',
    formDescriptionPlaceholder: 'Пояснення',
    addPopoverHeaderLabel: 'Варіанти полів',
    addPopoverFormElementLabel: 'Поле',
    addPopoverFormSectionLabel: 'Секція',
    addPopoverCancelButtonLabel: 'Відмінити',
    addPopoverCreateButtonLabel: 'Створити',
    cgpiKeyPlaceholder: "Назва об'єкта",
    cgpiTitlePlaceholder: 'Назва',
    cgpiDescPlaceholder: 'Текст пояснення',
    settingsModalHeaderLabel: 'Додаткові налаштування',
    settingsModalSaveButtonText: 'Зберегти',
    settingsModalCancelButtonText: 'Відмінити',
    settingsModalColumnSizeLabel: 'Розмір стовбця ',
    settingsModalDependenciesLabel: 'Залежності ',
    settingsModalDependenciesAnyLabel: 'Будь-які ',
    settingsModalDependenciesSpecificLabel: 'Особливі ',
    settingsModalDependenciesDisplayFollowingLabel: 'Показати наступне ',
    settingsModalDependenciesDisplayFollowingPlaceholder: 'Обрати',
    requiredChkbxLabel: "Обов'язкове поле",
    objectNameLabel: "Ім'я об'єкта схеми",
    displayNameLabel: 'Назва поля',
    descriptionLabel: 'Пояснення до поля',
    inputTypeLabel: 'Тип поля',
    sectionObjectNameLabel: "Ім'я об'єкта схеми",
    sectionDisplayNameLabel: 'Назва секції',
    sectionDescriptionLabel: 'Пояснення до секції',
    inputDefaultValueLabel: 'Початкове значення',
    inputDefaultValuePlaceholder: 'Початкове значення',
    inputDefaultPasswordLabel: 'Початкове значення',
    inputDefaultPasswordPlaceholder: 'Початкове значення',
    inputDefaultNumberLabel: 'Початкове значення',
    inputDefaultNumberPlaceholder: 'Початкове значення',
    inputDefaultCheckboxLabel: 'Початкове значення',
    settingsModalInputMinLengthLabel: 'Мінімальна довжина',
    settingsModalInputMinLengthPlaceholder: 'К-ть символів',
    settingsModalInputMaxLengthLabel: 'Максимальна довжина',
    settingsModalInputMaxLengthPlaceholder: 'К-ть символів',
    settingsModalInputRegExpLabel: 'Регулярний вираз ',
    settingsModalInputRegExpPlaceholder: 'Регулярний вираз',
    settingsModalInputPlaceholderPropLabel: 'Заповнювач',
    settingsModalInputPlaceholderPropPlaceholder: 'Текст',
    settingsModalInputAutoFocusLabel: 'Автофокус',
    settingsModalInputColumnSizeLabel: 'Розмір стовбця поля ',
    settingsModalInputColumnSizePlaceholder: 'Розмір стовбця',
    settingsModalInputFormatLabel: 'Формат поля ',
    settingsModalInputFormatPlaceholder: 'Формат',
    settingsModalInputFormatItemEmail: 'Пошта',
    settingsModalInputFormatItemHostname: "Ім'я хоста",
    settingsModalInputFormatItemURI: 'Посилання',
    settingsModalInputFormatItemRegEx: 'Регулярний вираз',
    settingsModalInputAutoCompleteUserName: "Ім'я користувача",
    settingsModalInputAutoCompleteItemPassword: 'Пароль',
    settingsModalInputAutoCompleteItemAddress: 'Адреса',
    settingsModalInputAutoCompleteItemCountry: 'Країна',
    settingsModalInputAutoCompleteLabel: 'Автозаповнення ',
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
    dropdownPossibleValuesLabel: 'test string',
    dropdownPossibleValuesDescriptionLabel: 'test string',
    dropdownForceNumberDescriptionLabel: 'test string',
    dropdownInputPlaceholder: 'test string',
    dropdownInputEnumPlaceholder: 'test string',
    newElementDefaultSectionLabel: 'Нова секція',
    newElementDefaultInputLabel: 'Нове поле',
  },
  widespreadWords: {
    ifWord: 'Якщо',
    hasWord: 'має ',
    theValueWord: 'значення',
    aValueWord: 'значення',
    noneWord: 'Не обрано',
  },
  // showFormHead: false
};
const customItems = [
  {
    value: 'fullName',
    label: 'ПІБ',
  },
  {
    value: 'phone',
    label: 'Телефон',
  },
  {
    value: 'address',
    label: 'Адреса',
  },
  {
    value: 'ITN',
    label: 'ІПН',
  },
  {
    value: 'cadastralNumber',
    label: 'Кадастровий номер',
  },
  {
    value: 'purposeOfTheLandPlot',
    label: 'Цільове призначення',
  },
  {
    value: 'accept',
    label: 'Дозвіл на обробку даних',
  },
  {
    value: 'landArea',
    label: 'Площа земельної ділянки',
  },
  {
    value: 'location',
    label: 'Місце розташування ділянки',
  },
  {
    value: 'categoryOfLands',
    label: 'Категорія земель',
  },
  {
    value: 'transmit_as',
    label: 'Форма видачі відомостей',
  },
  {
    value: 'ownerDocument',
    label: 'Документ на право власності',
  },
  {
    value: 'documentType',
    label: 'Тип посвідчення особи',
  },
  {
    value: 'documentData',
    label: 'Паспортні дані',
  },
  // {
  //   value: 'documentOwner',
  //   label: 'С/Н документу права власності'
  // },

  {
    value: 'landManagement',
    label: 'Проект землеустрою',
  },
];

const customFormats = {
  link: 'тест',
};

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
        customFormats={customFormats}
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
