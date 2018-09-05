declare module "amazeui-dingtalk/Button" {
    import * as React from "react";
    export let Button: React.ComponentClass<any>;
    export let NavBar: React.ComponentClass<any>;
    export let TabBar: TabBarClass;
}

declare class TabBarClass extends React.Component<any,any>{
    public Item:React.ComponentClass<any>;
    public render():JSX.Element;
}
declare module "amazeui-dingtalk"{
    export * from "amazeui-dingtalk/Button";
}