import * as Yup from 'yup';
import { HTMLInputTypeAttribute } from 'react';

export type FormConfig<T> = {
  fields: FormConfigField<T>[];
  defaultValues?: Record<keyof T, any>;
  yupSchema?: Yup.ObjectSchema<any>;
};

export type SelectOptions = {
  value: string;
  label: string;
}

export type FormConfigField<T> = {
  key: string;
  labelTranslation?: string;
  type: HTMLInputTypeAttribute | FormFieldType;
  selectOptions?: [SelectOptions];
  autoComplete?: string;
  readOnly?: boolean;
  formatter?: any;
  required?: boolean;
};

export type FormFieldType = 'textarea' | 'select';
