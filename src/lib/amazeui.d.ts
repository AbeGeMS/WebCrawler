declare module "amazeui-dingtalk/Button" {
    import * as React from "react";
    export let Button: React.ComponentClass<any>;
    export let NavBar: React.ComponentClass<any>;
    export let TabBar: typeof TabBarClass;
}

declare class TabBarClass extends React.Component<any, any>{
    public static Item: React.ComponentClass<any>;
}
declare module "amazeui-dingtalk" {
    export * from "amazeui-dingtalk/Button";
}