import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel } from '@mui/material';

import { FormConfig } from '../hook-form/types';

type Props<T> = {
  data: T;
  form: FormConfig<T>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormFields<T>({ data, form, onChange }: Props<T>) {
  const { t } = useTranslation();

  return (
    <>
      {form.fields.map((field) => {
        let value: any = (data as any)?.[field?.key] || '';

        if (field.formatter) {
          value = field.formatter(value);
        }

        if (field.type === 'checkbox') {
          return (
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Checkbox checked={value || false} onChange={onChange} />}
              key={field.key}
              name={field.key}
              label={t<string>(field.labelTranslation || field.key)}
            />
          );
        }

        return (
          <TextField
            fullWidth
            key={field.key}
            name={field.key}
            label={t<string>(field.labelTranslation || field.key)}
            type={field.type}
            value={value}
            required={field.required}
            sx={{ mb: 2 }}
            onChange={onChange}
            select={field.type === "select"}
            disabled={field.readOnly}
          >
            {field.type === "select" && field.selectOptions && field.selectOptions.length && field?.selectOptions.map((selectOption) =>
              (<MenuItem key={`${field.key}-${selectOption.value}`} value={selectOption.value}>{selectOption.label}</MenuItem>)
            )}
          </TextField>
        );
      })}
    </>
  );
}
