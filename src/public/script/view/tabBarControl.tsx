import * as React from "react";
import { TabBar } from "amazeui-dingtalk";
import { DingamStyle } from "../model/common";

export enum TabCategory {
    Home = "home",
    Gear = "gear",
    Next = "next",
}
export interface ITabBarProps {
    onClick?: (key: string) => void;
}

interface TabBarControlState {
    selected: string;
}

export class TabBarControl extends React.Component<ITabBarProps, TabBarControlState>{
    public componentWillMount() {
    }

    public state = {
        selected: "",
    }

    private onClick = (key) => {
        this.props.onClick(key);
    }

    public render() {
        return (
            <TabBar amStyle={DingamStyle.Dark} onAction={this.onClick}>
                <TabBar.Item
                    eventKey="home"
                    selected={this.state.selected === "home"}
                    icon="home"
                    title="home" />
                <TabBar.Item
                    eventKey="gear"
                    selected={this.state.selected === "gear"}
                    icon="gear"
                    title="Settings" />
                <TabBar.Item
                    eventKey="next"
                    selected={this.state.selected === "next"}
                    icon="pages"
                    title="Next" />
            </TabBar>
        );
    }
}
