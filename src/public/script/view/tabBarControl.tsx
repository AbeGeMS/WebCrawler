
import * as React from "react";
import { TabBar } from "amazeui-dingtalk";
import { BookModel } from "../model/bookModel";

interface TabBarControlState {
    selected:string;
}

export class TabBarControl extends React.Component<any, TabBarControlState>{
    public componentWillMount() {
    }

    public state = {
        selected: "home",
    }

    private model: BookModel;

    private onClick = (key) => this.setState({ selected: key });

    public render() {
        return (
            <TabBar amStyle="primary" onAction={this.onClick}>
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
                    eventKey="info"
                    selected={this.state.selected === "info"}
                    icon="right-nav"
                    title="Next" />
            </TabBar>
        );
    }
}
