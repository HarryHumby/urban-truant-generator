import React, { useState, useCallback } from 'react';

import { ServiceResponse } from 'src/services/types';

interface Props<T> {
  getItems: (searchStr: string) => Promise<ServiceResponse<T[]> | undefined>;
  uniqueKey?: string;
}

export function useSearcher<T>({ getItems }: Props<T>) {
  const [options, setOptions] = React.useState<T[]>([]);

  const [searchTerm, setSearchTerm] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const loadOptions = useCallback(async () => {
    setLoading(true);
    const response = await getItems(searchTerm || '');
    if (response?.data) {
      setOptions(response?.data);
    }
    setLoading(false);
  }, [searchTerm, getItems]);

  React.useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  return {
    options,
    loading,
    searchTerm,
    setSearchTerm,
    loadOptions,
  };
}

export interface IList {
  data: any[];
  nextToken?: string | undefined;
}
