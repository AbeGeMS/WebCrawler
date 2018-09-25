import * as React from "react";
import { Button, NavBar, Field, Icon, Notification } from "amazeui-dingtalk";
import { BookModel } from "../model/bookModel";
import { TabBarControl } from "./tabBarControl";
import { DingamStyle } from "../model/shareData";
import ReactDOM = require("react-dom");
import { BookMark } from "../model/bookMarkModel";

interface HomePageState {
    bookDomain: string;
    selected: string;
    notificationMessage: string;
    notificationStyle: DingamStyle|string;
    notifcationVisible: boolean;
}

export class HomePage extends React.Component<any, HomePageState>{
    public constructor(prop){
        super(prop);
        this.setBookDomain = this.setBookDomain.bind(this);
        this.submitBookDomain = this.submitBookDomain.bind(this);
        this.closeNotification =this.closeNotification.bind(this);
    }
    public componentWillMount() {
        this.UpdateContent();
    }
    public state = {
        bookDomain:"",
        selected: "gear",
        notificationMessage: "",
        notificationStyle: DingamStyle.Success,
        notifcationVisible: false
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
        let myButton =  <Button amStyle="primary" onClick={this.submitBookDomain}>Submit</Button>

        return (
            <div className="home-page-container">
                <Notification
                    title={this.state.notificationMessage}
                    amStyle={this.state.notificationStyle}
                    visible={this.state.notifcationVisible}
                    animated = {this.state.notifcationVisible}
                    onDismiss={this.closeNotification}
                />
                <NavBar {...navBarProp} amStyle="primary" />
                <div className="home-page-content">
                    <Button amStyle="primary" onClick={this.submitBookDomain}>Delete Book</Button>
                    <Field
                        placeholder="https://www.book.com"
                        labelBefore={<Icon name="search"/>}
                        btnAfter= {myButton}
                        onChange = {this.setBookDomain}
                    />
                </div>
                <div className="home-page-footer">
                    <TabBarControl />
                </div>
            </div>
        );
    }

    private closeNotification(){
        this.setState({ notificationStyle: DingamStyle.Warning, notificationMessage: "why",notifcationVisible :false });
    }
    private submitBookDomain(){
        let bookModel = new BookModel();
        bookModel.setBookDomain(this.state.bookDomain).then(
            v => this.setState({ notificationMessage: v, notifcationVisible: true, notificationStyle: DingamStyle.Success }),
            err => this.setState({ notificationMessage: err, notifcationVisible: true, notificationStyle: DingamStyle.Alert })
        );
    }

    private setBookDomain(e) {
        this.setState({
            bookDomain: e.target.value.trim(),
            notificationMessage: e.target.value.trim(),
            notifcationVisible: true,
            notificationStyle: DingamStyle.Secondary,
        });
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
