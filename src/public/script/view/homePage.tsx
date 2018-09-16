import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, NavBar } from "amazeui-dingtalk";
import { BookModel } from "../model/bookModel";
import { BookMark } from "../model/bookMarkModel";
import { TabBarControl } from "./tabBarControl";

interface HomePageState {
    selected: string;
}

export class HomePage extends React.Component<any, HomePageState>{
    public componentWillMount() {
        this.UpdateContent();
    }
    public state = {
        selected: "gear",
    }

    private model: BookModel;

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

        return (
            <div className="home-page-container">
                <NavBar {...navBarProp} amStyle="primary" />
                <div className="home-page-content">
                    <Button amStyle="primary" onClick={this.onTestButtonClick}>Delete Book</Button>
                </div>
                <div className="home-page-footer">
                    <TabBarControl />
                </div>
            </div>
        );
    }

    private onTestButtonClick() {
        let bookMark = new BookMark();
        bookMark.deleteBook("2_fakeBook");
    }

    private UpdateContent() {
        let model = new BookModel();
        model.getBookContent("", "", 0)
            .then(msg => this.setState({
            }));
    }
}
