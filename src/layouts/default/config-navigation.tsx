import { useMemo } from 'react';

import { NavProps } from 'src/components/nav-section';

import NavigationOptions from './nav';

const ROLE_MENU = "SuperAdminMenu";

export function useNavData() {
  const data = useMemo(
    () => NavigationOptions?.[ROLE_MENU] || [] as NavProps["data"],
    []
  );

  return data;
}
