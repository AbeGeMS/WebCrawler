
declare module "amazeui-dingtalk/Button" {
    import * as React from "react";
    export let Button: React.ComponentClass<ButtonProps>;
    export let NavBar: React.ComponentClass<any>;
    export let SearchBar: React.ComponentClass<SearchBarProps>;
    export let Notification: React.ComponentClass<NotificationProps>;
    export let Field: React.ComponentClass<FieldProps>;
    export let Icon: React.ComponentClass<IconProps>;
    export let TabBar: typeof TabBarClass;
}

declare class TabBarClass extends React.Component<any, any>{
    public static Item: React.ComponentClass<any>;
}
declare module "amazeui-dingtalk" {
    export * from "amazeui-dingtalk/Button";
}

declare interface SearchBarProps {
    placeholder?: string,
    cancelText?: string,
    onChange?: (messge: string) => void,
    onClear?: () => void,
    onReset?: () => void,
}

declare interface NotificationProps extends baseProps {
    animated?:boolean,
    static?:boolean,
    title:string,
    visible?:boolean,
    onDismiss?:()=>void,
}

declare interface FieldProps {
    placeholder?: string,
    labelBefore?: JSX.Element,
    btnAfter?: JSX.Element,
    onChange?:(e:any)=>void,
}

declare interface IconProps{
    name:string,
    key?: string,
}

declare interface ButtonProps extends baseProps{
    onClick:()=>void,
}

declare interface baseProps{
    amStyle?:string,
}