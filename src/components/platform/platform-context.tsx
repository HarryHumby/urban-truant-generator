'use client';

import { useContext, createContext } from 'react';

import { IPlatform } from 'src/services/platform/platform/base/types';

type PlatformContextProps = {
    platform?: IPlatform;
};

// ----------------------------------------------------------------------

export const PlatformContext = createContext({} as PlatformContextProps);

export const usePlatformContext = () => {
  const context = useContext(PlatformContext);

  if (!context) throw new Error('usePlatformContext must be use inside SettingsProvider');

  return context;
};
