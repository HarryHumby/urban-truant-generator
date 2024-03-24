import { useState, useCallback } from 'react';

import { ServiceResponse } from 'src/services/types';

export const useCrud = <T>() => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Partial<T> | undefined>(undefined);

  const load = useCallback(
    async (getItem: () => Promise<ServiceResponse<Partial<T>> | undefined>) => {
      const response = await getItem();
      const item = response?.data;
      setData(item);
      setLoading(false);
    },
    []
  );

  const create = useCallback(
    async (
      createItem: (item: Partial<T>) => Promise<ServiceResponse<Partial<T>> | undefined>,
      input?: Partial<T>
    ) => {
      const response = await createItem(input || data!);
      const item = response?.data;
      setData(item);
      setLoading(false);
      return item;
    },
    [data]
  );

  const update = useCallback(
    async (
      updateItem: (item: Partial<T>) => Promise<ServiceResponse<Partial<T>> | undefined>,
      input?: Partial<T>
    ) => {
      const response = await updateItem(input || data!);
      const item = response?.data;
      setData(item);
      setLoading(false);
      return item;
    },
    [data]
  );

  return {
    data,
    loading,
    setLoading,
    load,
    setData,
    create,
    update,
  };
};
