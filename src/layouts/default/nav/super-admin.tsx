import { paths } from "src/routes/paths";

import { NavProps } from "src/components/nav-section";

import { ICONS } from "./icons";

export const SuperAdminMenu = [
    {
        subheader: "",
        items: [
            { title: 'menuItem.dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
            { title: 'menuItem.api', path: paths.api.root, icon: ICONS.folder },
            { title: 'menuItem.ui', path: paths.ui.root, icon: ICONS.folder },
        ],
    },
  
] as NavProps["data"]