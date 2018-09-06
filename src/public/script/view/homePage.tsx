import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, NavBar, TabBar } from "amazeui-dingtalk";
import { SampleModel } from "../model/sampleModel";



interface HomePageState {
    selected:string;
}

export class HomePage extends React.Component<any, HomePageState>{
    public componentWillMount() {
        this.UpdateContent();
    }
    public state = {
        selected: "gear",
    }

    private model: SampleModel;

    public render() {
        let itemLeft = {
            href: "#",
            title: "Left",
        }
        let itemRight = {
            href: "#",
            title: "right",
        }
        let navBarProp = {
            title: "Home Page",
            leftNav: [{ ...itemLeft, icon: "left-nav" }],
            rightNav: [{ ...itemRight, icon: "right-nav" }],
        };

        let tabBarProp = {

        }

        return (
            <div className="home-page-container">
                <NavBar {...navBarProp} amStyle="primary" />
                <div className="home-page-content">
                    Hello World!
                </div>
                <div className="home-page-footer">
                    <TabBar amStyle="primary">
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
                            icon="info"
                            badge={5}
                            title="information" />
                    </TabBar>
                </div>
            </div>
        );
    }

    private UpdateContent() {
        let model = new SampleModel();
        model.getBookContent()
            .then(msg => this.setState({
            }));
    }
}
