import { IconType } from "react-icons";

export type BadgeType = {
    foodName: string
}


export interface NavLinksTypes {
    path: string,
    label: string,
    icon: IconType
}

export type DropDownTypes = {
    showStatusBar: boolean,
    showActivityBar: boolean,
    showPanel: boolean
}

export type MenuDetailTypes = {
    menu_name: string,
    menu_price: number,
    imageFile: string,
    menu_description: string
}
