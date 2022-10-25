import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      //Type
      array: 'Array',
      checkBox: 'CheckBox',
      date: 'Date',
      dateTime: 'Date and Time',
      dropDown: 'DropDown List',
      integer: 'Integer',
      longAnswer: 'Long Answer',
      number: 'Number',
      password: 'Password',
      radio: 'Radio',
      reference: 'Reference',
      shortAnswer: 'Short Answer',
      time: 'Time',
      //LABEL
      //FormBuilder.js
      formNameLabel: 'Form Name',
      formDescriptionLabel: 'Form Description',
      formNamePlaceholder: 'Title',
      formDescriptionPlaceholder: 'Description',
      //Add.js
      addPopoverHeaderLabel: 'Create New',
      addPopoverFormElementLabel: 'Form element',
      addPopoverFormSectionLabel: 'Form section',
      addPopoverCancelButtonLabel: 'Cancel',
      addPopoverCreateButtonLabel: 'Create',
      //Card.js & Section.js
      requiredChkbxLabel: 'Required',
      //CardEnumOptions.js
      dropdownInputPlaceholder: 'Label',
      dropdownInputEnumPlaceholder: 'Possible Value',
      //CardGeneralParameterInputs.js
      objectNameLabel: 'Object Name',
      displayNameLabel: 'Display Name',
      descriptionLabel: 'Description',
      inputTypeLabel: 'Input Type',
      //CardGeneralParameterInputs.js & Section.js
      cgpiKeyPlaceholder: 'Key',
      cgpiTitlePlaceholder: 'Title',
      cgpiDescPlaceholder: 'Description',
      //CardModal.js
      settingsModalHeaderLabel: 'Additional Settings',
      settingsModalSaveButtonText: 'Save',
      settingsModalCancelButtonText: 'Cancel',
      settingsModalColumnSizeLabel: 'Column Size ',
      //Section.js
      sectionObjectNameLabel: 'Section Object Name',
      sectionDisplayNameLabel: 'Section Display Name',
      sectionDescriptionLabel: 'Section Description',
      //arrayInput.js
      settingsModalInputArrayMinItemsLabel: 'Minimum Items',
      settingsModalInputArrayMinItemsPlaceholder: 'ex: 2',
      settingsModalInputArrayMaxItemsLabel: 'Maximum Items',
      settingsModalInputArrayMaxItemsPlaceholder: 'ex: 2',

      settingsModalInputArraySectionCheckboxLabel: 'Section',
      //defaultInputs.js & longAnswerInputs.js & shortAnswer.js
      inputDefaultValueLabel: 'Default value',
      inputDefaultValuePlaceholder: 'Default',

      inputDefaultCheckboxLabel: 'Default',

      dropdownPossibleValuesLabel: 'Possible Values',
      dropdownPossibleValuesDescriptionLabel:
        'Display label is different from value',
      dropdownForceNumberDescriptionLabel: 'Force number',
      //longAnswerInputs.js & shortAnswer.js
      settingsModalInputMinLengthLabel: 'Minimum Length',
      settingsModalInputMinLengthPlaceholder: 'Minimum Length',
      settingsModalInputMaxLengthLabel: 'Maximum Length',
      settingsModalInputMaxLengthPlaceholder: 'Maximum Length',
      settingsModalInputRegExpLabel: 'Regular Expression Pattern',
      settingsModalInputRegExpPlaceholder: 'Regular Expression Pattern',
      settingsModalInputAutoFocusLabel: 'Auto focus',
      //numberInputs.js
      settingsModalInputNumberMultOfLabel: 'Multiple of',
      settingsModalInputNumberMultOfPlaceholder: 'Multiple of',
      settingsModalInputNumberMinLabel: 'Minimum',
      settingsModalInputNumberMinPlaceholder: 'ex: 3',
      settingsModalInputNumberCheckBoxExMinLabel: 'Exclusive Minimum',
      settingsModalInputNumberMaxLabel: 'Maximum',
      settingsModalInputNumberMaxPlaceholder: 'ex: 8',
      settingsModalInputNumberCheckBoxExMaxLabel: 'Exclusive Maximum',

      inputDefaultNumberLabel: 'Default number',
      inputDefaultNumberPlaceholder: 'Default',
      //referenceInput.js
      //shortAnswer.js
      settingsModalInputColumnSizeLabel: 'Column Size',
      settingsModalInputColumnSizePlaceholder: 'Column Size',
      settingsModalInputFormatLabel: 'Format ',
      settingsModalInputFormatPlaceholder: 'Format',
      settingsModalInputAutoCompleteLabel: 'Auto Complete Category ',
      settingsModalInputAutoCompletePlaceholder: 'Auto Complete',

      settingsModalInputFormatItemEmail: 'Email',
      settingsModalInputFormatItemHostname: 'Hostname',
      settingsModalInputFormatItemURI: 'URI',
      settingsModalInputFormatItemRegEx: 'Regular Expression',
      settingsModalInputAutoCompleteUserName: 'User Name',
      settingsModalInputAutoCompleteItemPassword: 'Password',
      settingsModalInputAutoCompleteItemAddress: 'Street Address',
      settingsModalInputAutoCompleteItemCountry: 'Country',

      inputDefaultPasswordLabel: 'Default password',
      inputDefaultPasswordPlaceholder: 'Default',
      //DependencyField
      settingsModalDependenciesLabel: 'Dependencies',
      settingsModalDependenciesAnyLabel: 'Any value dependency',
      settingsModalDependenciesSpecificLabel: 'Specific value dependency',
      //DependencyPossibility
      settingsModalDependenciesDisplayFollowingLabel: 'Display the following:',
      settingsModalDependenciesDisplayFollowingPlaceholder:
        'Choose a dependent...',
      //PlaceholderInput
      settingsModalInputPlaceholderPropLabel: 'Placeholder',
      settingsModalInputPlaceholderPropPlaceholder:
        'Regular Expression Pattern',
      //utils.js
      newElementDefaultSectionLabel: 'New Section', //
      newElementDefaultInputLabel: 'New Input', //
      //TOOLTIP
      //Add.js
      addTooltip: 'Create new form element',
      //Card.js & Section.js
      moveElementUpButtonTooltip: 'Move form element up',
      moveElementDownButtonTooltip: 'Move form element down',
      additionalConfTooltip: 'Additional configurations for this form element',
      deleteFormElTooltip: 'Delete form element',
      //CardGeneralParameterInputs.js
      cardObjectName: 'The back-end name of the object',
      cardDisplayName: 'The user-facing name of this object',
      cardDescription: 'This will appear as help text on the form',
      cardInputType: 'The type of form input displayed on the form',
      //Section.js
      cardSectionObjectName:
        'The key to the object that will represent this form section.',
      cardSectionDisplayName:
        'The name of the form section that will be shown to users of the form.',
      cardSectionDescription:
        'A description of the section which will be visible on the form.',
      //CardModal.js
      settingsModalColumnSizeTooltip: 'Set the column size of the input',
      //longAnswerInputs.js & shortAnswer.js
      settingsModalInputRegExpTooltip:
        'Regular expression pattern that this must satisfy',
      //numberInputs.js
      settingsModalInputNumberMultOfTooltip:
        'Require number to be a multiple of this number',
      //shortsAnswer.js
      settingsModalInputColumnSizeTooltip: 'Set the column size of the input',
      settingsModalInputFormatTooltip:
        'Require string input to match a certain common format',
      settingsModalInputAutoCompleteTooltip:
        "Suggest entries based on the user's browser history",
      //DependencyField.js
      settingsModalDependenciesTooltip:
        'Control whether other form elements show based on this one',
      settingsModalDependenciesAddTooltip:
        'Add another dependency relation linking this element and other form elements',
      settingsModalDependenciesSpecificTooltip:
        "Specify whether these elements should show based on this element's value",
      //DependencyPossibility.js
      settingsModalDependenciesDisplayFollowingTooltip:
        'Choose the other form elements that depend on this one',
      //PlaceholderInput
      settingsModalInputPlaceholderPropTooltip: 'Regular Expression Pattern',
    },
  },
  uk: {
    translation: {
      //Type
      array: 'Масив',
      checkBox: 'Прапорець',
      date: 'Дата',
      dateTime: 'Дата і час',
      dropDown: 'Випадаючий список',
      integer: 'Ціле число',
      longAnswer: 'Довга відповідь',
      number: 'Число',
      password: 'Пароль',
      radio: 'Радіо-кнопка',
      reference: 'Посилання',
      shortAnswer: 'Коротка відповідь',
      time: 'Час',
      //LABEL
      //FormBuilder.js
      formNameLabel: 'Назва форми',
      formDescriptionLabel: 'Опис форми',
      formNamePlaceholder: 'Назва',
      formDescriptionPlaceholder: 'Опис',
      //Add.js
      addPopoverHeaderLabel: 'Створити новий',
      addPopoverFormElementLabel: 'Елемент форми',
      addPopoverFormSectionLabel: 'Секцію форми',
      addPopoverCancelButtonLabel: 'Скасувати',
      addPopoverCreateButtonLabel: 'Створювати',
      //Card.js & Section.js
      requiredChkbxLabel: "Обов'язковий",
      //CardEnumOptions.js
      dropdownInputPlaceholder: 'Мітка',
      dropdownInputEnumPlaceholder: 'Значення',
      //CardGeneralParameterInputs.js
      objectNameLabel: "Назва об'єкта (схема)",
      displayNameLabel: 'Відображення назви',
      descriptionLabel: 'Опис',
      inputTypeLabel: 'Тип поля',
      //CardGeneralParameterInputs.js & Section.js
      cgpiKeyPlaceholder: 'Ключ',
      cgpiTitlePlaceholder: 'Заголовок',
      cgpiDescPlaceholder: 'Опис',
      //CardModal.js
      settingsModalHeaderLabel: 'Додаткові налаштування',
      settingsModalSaveButtonText: 'Зберегти',
      settingsModalCancelButtonText: 'Скасувати',
      settingsModalColumnSizeLabel: 'Розмір стовпця',
      //Section.js
      sectionObjectNameLabel: 'Назва секції (схема)',
      sectionDisplayNameLabel: 'Відображення назви секції',
      sectionDescriptionLabel: 'Опис секції',
      //arrayInput.js
      settingsModalInputArrayMinItemsLabel: 'Мінімальна кількість елементів',
      settingsModalInputArrayMinItemsPlaceholder: 'Наприклад: 2',
      settingsModalInputArrayMaxItemsLabel: 'Максимальна кількість елементів',
      settingsModalInputArrayMaxItemsPlaceholder: 'Наприклад: 2',

      settingsModalInputArraySectionCheckboxLabel: 'Секція',
      //defaultInputs.js & longAnswerInputs.js & shortAnswer.js
      inputDefaultValueLabel: 'Значення за замовчуванням',
      inputDefaultValuePlaceholder: 'За замовчуванням',

      inputDefaultCheckboxLabel: 'За замовчуванням',

      dropdownPossibleValuesLabel: 'Набір значень',
      dropdownPossibleValuesDescriptionLabel:
        'Відображувана мітка відрізняється від значення',
      dropdownForceNumberDescriptionLabel: 'Використовувати числа',
      //longAnswerInputs.js & shortAnswer.js
      settingsModalInputMinLengthLabel: 'Мінімальна довжина',
      settingsModalInputMinLengthPlaceholder: 'Мінімальна довжина',
      settingsModalInputMaxLengthLabel: 'Максимальна довжина',
      settingsModalInputMaxLengthPlaceholder: 'Максимальна довжина',
      settingsModalInputRegExpLabel: 'Регулярний вираз',
      settingsModalInputRegExpPlaceholder: 'Регулярний вираз',
      settingsModalInputAutoFocusLabel: 'Автоматичний фокус',
      //numberInputs.js
      settingsModalInputNumberMultOfLabel: 'Кратний',
      settingsModalInputNumberMultOfPlaceholder: 'Кратний',
      settingsModalInputNumberMinLabel: 'Мінімум',
      settingsModalInputNumberMinPlaceholder: 'Наприклад: 3',
      settingsModalInputNumberCheckBoxExMinLabel: 'Ексклюзивний мінімум',
      settingsModalInputNumberMaxLabel: 'Максимум',
      settingsModalInputNumberMaxPlaceholder: 'Наприклад: 8',
      settingsModalInputNumberCheckBoxExMaxLabel: 'Ексклюзивний максимум',

      inputDefaultNumberLabel: 'Число за замовчуванням',
      inputDefaultNumberPlaceholder: 'За замовчуванням',
      //referenceInput.js
      //shortAnswer.js
      settingsModalInputColumnSizeLabel: 'Розмір стовпця',
      settingsModalInputColumnSizePlaceholder: 'Розмір стовпця',
      settingsModalInputFormatLabel: 'Формат',
      settingsModalInputFormatPlaceholder: 'Формат',
      settingsModalInputAutoCompleteLabel: 'Категорія автозаповнення',
      settingsModalInputAutoCompletePlaceholder: 'Автозаповнення',

      settingsModalInputFormatItemEmail: 'Електронна пошта',
      settingsModalInputFormatItemHostname: "Ім'я хоста",
      settingsModalInputFormatItemURI: 'uri',
      settingsModalInputFormatItemRegEx: 'Регулярний вираз',
      settingsModalInputAutoCompleteUserName: "Ім'я користувача",
      settingsModalInputAutoCompleteItemPassword: 'Пароль',
      settingsModalInputAutoCompleteItemAddress: 'Адреса вулиці',
      settingsModalInputAutoCompleteItemCountry: 'Країна',

      inputDefaultPasswordLabel: 'Пароль за замовчуванням',
      inputDefaultPasswordPlaceholder: 'За замовчуванням',
      //DependencyField
      settingsModalDependenciesLabel: 'Залежності',
      settingsModalDependenciesAnyLabel: 'Будь-яка залежність від значення',
      settingsModalDependenciesSpecificLabel:
        'Конкретна залежність від значення',
      //DependencyPossibility
      settingsModalDependenciesDisplayFollowingLabel: 'Відобразити наступне:',
      settingsModalDependenciesDisplayFollowingPlaceholder:
        'Виберіть залежного ...',
      //PlaceholderInput
      settingsModalInputPlaceholderPropLabel: 'Заповнювач',
      settingsModalInputPlaceholderPropPlaceholder: 'Регулярний зразок виразів',
      //utils.js
      newElementDefaultSectionLabel: 'Нова секція',
      newElementDefaultInputLabel: 'Нове поле',
      //TOOLTIP
      //Add.js
      addTooltip: 'Створіть новий елемент форми',
      //Card.js & Section.js
      moveElementUpButtonTooltip: 'Перемістіть елемент форми вгору',
      moveElementDownButtonTooltip: 'Перемістіть елемент форми вниз',
      additionalConfTooltip: 'Додаткові конфігурації для цього елемента форми',
      deleteFormElTooltip: 'Видалити елемент форми',
      //CardGeneralParameterInputs.js
      cardObjectName: 'Ключ поля, який буде ідентифікувати це поле.',
      cardDisplayName: 'Назва цього поля, орієнтована на користувача',
      cardDescription: 'Це відображатиметься як додатковий текст на формі',
      cardInputType: 'Тип введення форми, що відображається на формі',
      //Section.js
      cardSectionObjectName:
        "Ключ до об'єкта, який буде представляти цю форму.",
      cardSectionDisplayName:
        'Назва розділу форми, який буде показаний користувачам форми.',
      cardSectionDescription: 'Опис розділу, який буде видно на формі.',
      //CardModal.js
      settingsModalColumnSizeTooltip: 'Встановіть розмір стовпця вводу',
      //longAnswerInputs.js & shortAnswer.js
      settingsModalInputRegExpTooltip:
        'Регулярна схема вираження, яку це повинно задовольнити',
      //numberInputs.js
      settingsModalInputNumberMultOfTooltip:
        'Вимагати числа, щоб був кратним цьому числу',
      //shortsAnswer.js
      settingsModalInputColumnSizeTooltip: 'Встановіть розмір стовпця вводу',
      settingsModalInputFormatTooltip:
        'Вимагати введення рядка, щоб відповідати певному загальному формату',
      settingsModalInputAutoCompleteTooltip:
        'Пропонувати записи на основі історії браузера користувача',
      //DependencyField.js
      settingsModalDependenciesTooltip:
        'Контролювати, чи показують інші елементи форми на основі цього',
      settingsModalDependenciesAddTooltip:
        "Додайте ще одне співвідношення залежності, що пов'язує цей елемент та інші елементи форми",
      settingsModalDependenciesSpecificTooltip:
        'Укажіть, чи мають відображатися ці елементи на основі значення цього елемента',
      //DependencyPossibility.js
      settingsModalDependenciesDisplayFollowingTooltip:
        'Виберіть інші елементи форми, які залежать від цього',
      //PlaceholderInput
      settingsModalInputPlaceholderPropTooltip: 'Регулярний зразок виразів',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'uk', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
