declare module "amazeui-dingtalk/component" {
    import * as React from "react";
    export let Button: React.ComponentClass<ButtonProps>;
    export let NavBar: React.ComponentClass<NavBarProps>;
    export let SearchBar: React.ComponentClass<SearchBarProps>;
    export let Notification: React.ComponentClass<NotificationProps>;
    export let Field: React.ComponentClass<FieldProps>;
    export let Icon: React.ComponentClass<IconProps>;
    export let TabBar: typeof TabBarClass;
    export let List: typeof ListClass;
}

declare class TabBarClass extends React.Component<any, any>{
    public static Item: React.ComponentClass<any>;
}

declare class ListClass extends React.Component<ListProps, any>{
    public static Item: React.ComponentClass<ListItemProps>;
}

declare module "amazeui-dingtalk" {
    export * from "amazeui-dingtalk/component";
}

declare interface SearchBarProps {
    placeholder?: string,
    cancelText?: string,
    onChange?: (messge: string) => void,
    onClear?: () => void,
    onReset?: () => void,
}

declare interface NotificationProps extends baseProps {
    animated?: boolean,
    static?: boolean,
    title: string,
    visible?: boolean,
    onDismiss?: () => void,
}

declare interface FieldProps {
    placeholder?: string,
    labelBefore?: JSX.Element,
    btnAfter?: JSX.Element,
    onChange?: (e: any) => void,
}

declare interface IconProps {
    name: string,
    key?: string,
}

declare interface ButtonProps extends baseProps {
    active?: boolean;
    block?: boolean;
    disabled?: boolean;
    hollow?: boolean;
    href?: string;
    noHb?: boolean;
    target?: string;
    onClick?: () => void;
}

declare interface baseProps {
    amStyle?: string;
    amSize?: string;
}

declare interface ListProps {
    inster?: boolean;
}

declare interface ListItemProps {
    role?: string;
    title?: string;
    subTitle?: string;
    href?: string;
    linkComponent?: any;
    media?: any;
    after?: any;
    desc?: any;
    nested?: any;
    nestedProps?: any;

}

declare interface NavBarProps {
    title?: string;
    titleOnLeft?: boolean;
    leftNav?: NavBarItem[];
    rightNav?: NavBarItem[];
    onAction?: (item: any, e: any) => void;
}

declare interface NavBarItem{
    component?:string;
    title?:string;
    href?:string;
    customIcon?:string;
    icon?:string;
    isClone?:boolean;
}