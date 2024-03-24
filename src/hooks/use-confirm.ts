'use client';

export const useConfirmation = () => {
  const confirm = async (title: string = 'Are you sure?') => window.confirm(title);

  return {
    confirm,
  };
};
