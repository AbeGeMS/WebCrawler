import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, NavBar, TabBar } from "amazeui-dingtalk";
import { SampleModel } from "../model/sampleModel";



interface HomePageState {
    content: string
}

export class HomePage extends React.Component<any, HomePageState>{
    public componentWillMount() {
        this.UpdateContent();
    }
    public state = {
        content: "nothing to show...",
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
            leftNav: [{ ...itemLeft, icon: "lef-nav" }],
            rightNav: [{ ...itemRight, icon: "right-nav" }],
        };
        
        let tabBarProp= {
            
        }

        return (
            <div>
                <NavBar {...navBarProp} amStyle="primary" />
                <TabBar amStyle="primary">
                    <TabBar.Item/>
                </TabBar>
            </div>
        );
    }

    private UpdateContent() {
        let model = new SampleModel();
        model.getBookContent()
            .then(msg => this.setState({
                content: msg.Title,
            }));
    }
}
