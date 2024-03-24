import { useState, useCallback } from 'react';

import { ServiceResponse } from 'src/services/types';
import { isEmpty, deleteElementByIndexFromList } from 'src/utils';

type UseListingItem<T> = T & { id: string };

export const useListing = <T>() => {
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const [searchNextToken, setSearchNextToken] = useState<string | undefined>(undefined);
  const [columns, setColumns] = useState<Array<T>>([]);
  const [rows, setRows] = useState<Partial<UseListingItem<T>>[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(
    async (
      getData: (searchStr?: string) => Promise<ServiceResponse<any> | undefined>,
      searchStr?: string
    ) => {
      const response = await getData(searchStr);
      if (response?.data) {
        if (columns) {
          columns.forEach((column: any) => {
            if (column.formatter) {
              response.data.forEach((item: any) => {
                item[column['field']] = column.formatter(item[column['field']]);
              })
            }
          });
        }
        setRows(response.data);

        if (!isEmpty(searchStr as string)) {
          setSearchNextToken(response.nextToken);
          setNextToken(undefined);
        } else {
          setNextToken(response.nextToken);
          setSearchNextToken(undefined);
        }
      }
      setLoading(false);
    },
    [columns]
  );

  const loadMore = async (
    getData: (searchStr?: string, nextToken?: string) => Promise<ServiceResponse<any> | undefined>,
    searchStr?: string
  ) => {
    const response = await getData(searchStr, nextToken);
    if (response?.data) {
      setRows([...rows, ...response.data]);
      if (!isEmpty(searchStr as string)) {
        setSearchNextToken(response.nextToken);
      } else {
        setNextToken(response.nextToken);
      }
    }
    setLoading(false);
  };

  const remove = async (id: string, del: (id: string) => Promise<boolean>): Promise<boolean> => {
    const response = await del(id);

    if (response) {
      const index = rows.findIndex((pg) => (pg.id as string) === (id as string));
      setRows(deleteElementByIndexFromList(index, rows));
    }

    return response;
  };

  const add = async (items: UseListingItem<T>[]): Promise<void> => {
    setRows([...rows, ...items]);
  };

  return {
    rows,
    loading,
    nextToken,
    searchNextToken,
    setLoading,
    load,
    loadMore,
    remove,
    add,
    columns,
    setColumns,
  };
};
