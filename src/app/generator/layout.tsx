'use client';

import DefaultLayout from 'src/layouts/default';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
      <DefaultLayout>{children}</DefaultLayout>
  );
}
