'use client';

import { debounce } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';

import { ServiceResponse } from 'src/services/types';

import { useSearcher } from 'src/components/entity-selector/use-searcher';

import ScoCard from '../sco-card';
import ScoTable from '../sco-table';
import CustomModal from '../custom-modal';

interface Props<T> {
  value: (T & { sort?: number })[];
  labelKey: keyof T;
  uniqueKey: keyof T;
  externalGetItems: (q: string) => Promise<ServiceResponse<T[]> | undefined>;
  handleAddItem: (item: T) => void;
  handleRemoveItem: (item: T) => void;
  inputLabel?: string;
  hideLabel?: boolean;
  inline?: boolean;
}

export default function EntitySelectorMultiple<T>({
  value,
  labelKey,
  uniqueKey,
  externalGetItems,
  handleAddItem,
  handleRemoveItem,
  inputLabel = 'entity.multipleSelector',
  inline = false,
  hideLabel = false,
}: Props<T>) {
  const { t } = useTranslation();

  const getItems = useCallback(
    async (searchString: string) => externalGetItems(searchString),
    [externalGetItems]
  );

  const [open, setOpen] = React.useState(false);
  const { options, setSearchTerm, loading } = useSearcher<T>({
    getItems,
  });

  const handleShowModal = () => {
    setOpen(true);
  };

  return (
    <Stack>
      {!inline && (
        <>
          <Typography variant="h6" gutterBottom>
            {t<string>(inputLabel)}
          </Typography>
          <ScoCard sx={{ p: 2 }}>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              onClick={handleShowModal}
              sx={{ cursor: 'pointer' }}
            >
              <div className="">{t<string>('clickToSelect')}</div>
              <div>
                <Chip label={<>{value?.length || 0} Selected</>} />
              </div>
            </Stack>
          </ScoCard>
          <CustomModal
            open={open}
            handleClose={() => setOpen(false)}
            handleAction={() => setOpen(false)}
            actionTransaltionString="confirm.items"
          >
            <Display
              value={value}
              labelKey={labelKey}
              uniqueKey={uniqueKey}
              options={options}
              loading={loading}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
              handleSearch={setSearchTerm}
            />
          </CustomModal>
        </>
      )}

      {inline && (
        <>
          {!hideLabel && (
            <Typography variant="h6" gutterBottom>
              {t<string>(inputLabel)}
            </Typography>
          )}
          <Display
            value={value}
            labelKey={labelKey}
            uniqueKey={uniqueKey}
            options={options}
            loading={loading}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            handleSearch={setSearchTerm}
          />
        </>
      )}
    </Stack>
  );
}

type DisplayProp<T> = Pick<Props<T>, 'labelKey' | 'uniqueKey' | 'handleAddItem' | 'handleRemoveItem'> & {
  value: (T & { sort?: number })[];
  options: T[];
  loading: boolean;
  handleSearch: (searchTerm: string) => void
};
function Display<T>({
  value,
  labelKey,
  uniqueKey,
  options,
  loading,
  handleAddItem,
  handleRemoveItem,
  handleSearch
}: DisplayProp<T>) {
  const { t } = useTranslation();

  const items = useMemo(() => {
    const newArray = [...value];
    newArray.sort((item1, item2) => {
      const item1Sort = item1.sort || 0;
      const item2Sort = item2.sort || 0;

      return item1Sort > item2Sort ? 1 : -1;
    });
    return newArray;
  }, [value]);

  const debouncedSearch = debounce((e: any) => {
    handleSearch(e.target.value);
  }, 600);

  return (
    <Stack spacing={2}>
      <Autocomplete
        options={options}
        loading={loading}
        value={undefined}
        getOptionLabel={(option) => option[labelKey] as string}
        onInputChange={debouncedSearch}
        renderInput={(params: any) => <TextField
          {...params}
          label={t<string>("searcher.label")}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
        }
        onChange={(e, newValue) => {
          if (newValue) handleAddItem(newValue);
        }}
      />

      <ScoTable
        rows={items}
        columns={[
          {
            flex: 1,
            field: labelKey.toString(),
            headerName: t<string>(labelKey.toString()),
          },
          {
            width: 100,
            field: 'actions',
            headerName: "",
            renderCell: (params) => (
              <Stack spacing={2} direction="row">
                <Chip
                  label={t<string>('remove')}
                  color="primary"
                  onClick={() => handleRemoveItem(params.row as T)}
                />
              </Stack>
            ),
          }
        ]}
        loading={loading}
      />
    </Stack>
  );
}
