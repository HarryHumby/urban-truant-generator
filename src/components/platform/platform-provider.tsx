'use client';
type SettingsProviderProps = {
    children: React.ReactNode;
};

export function PlatformProvider({ children }: SettingsProviderProps) {
    return children;
}
