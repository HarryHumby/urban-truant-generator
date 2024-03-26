import { paths } from "src/routes/paths";

import { NavProps } from "src/components/nav-section";

import { ICONS } from "./icons";

export const SuperAdminMenu = [
    {
        subheader: "",
        items: [
            { title: 'menuItem.dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
            { title: 'menuItem.generator', path: paths.generator.root, icon: ICONS.folder },
        ],
    },

] as NavProps["data"]