import * as React from "react";
import { Button, NavBar, Field, Icon, Notification } from "amazeui-dingtalk";
import { BookModel } from "../model/bookModel";
import { TabBarControl } from "./tabBarControl";
import { DingamStyle } from "../model/common";
import * as CONST from "../model/constants";
import { BookMarkData } from "../../../lib/typings/dataModel";
import * as ReduxStore from "../model/dataContainer";
import { Store } from "redux";

interface HomePageState {
    bookDomain: string;
    selected: string;
    notificationMessage: string;
    notificationStyle: DingamStyle | string;
    notifcationVisible: boolean;
    bookList: BookMarkData[];
}

export class HomePage extends React.Component<any, HomePageState>{
    public constructor(prop) {
        super(prop);
        this.setBookDomain = this.setBookDomain.bind(this);
        this.submitBookDomain = this.submitBookDomain.bind(this);
        this.closeNotification = this.closeNotification.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.onBookListChange = this.onBookListChange.bind(this);
    }

    private store: Store;

    public componentWillMount() {
        this.store = ReduxStore.default();
    }

    public componentDidMount() {
        this.store.subscribe(this.onBookListChange);
    }

    public componentWillUnmount() {
    }
    public state = {
        bookDomain: "",
        selected: "gear",
        notificationMessage: "",
        notificationStyle: DingamStyle.Success,
        notifcationVisible: false,
        bookList: [],
    }

    private model: BookModel;

    public render() {
        let myButton = <Button amStyle="primary" onClick={this.submitBookDomain}>Submit</Button>

        return (
            <div className="home-page-container">
                <Notification
                    title={this.state.notificationMessage}
                    amStyle={this.state.notificationStyle}
                    visible={this.state.notifcationVisible}
                    animated={this.state.notifcationVisible}
                    onDismiss={this.closeNotification}
                />
                <div className="home-page-content">
                    <Button amStyle="primary" onClick={this.getBooks}>Get Books</Button>
                    <Field
                        placeholder="https://www.book.com"
                        labelBefore={<Icon name="search" />}
                        btnAfter={myButton}
                        onChange={this.setBookDomain}
                    />
                    {this.createBookList()}
                </div>
                <div className="home-page-footer">
                    <TabBarControl />
                </div>
            </div>
        );
    }

    private createBookList() {
        let booksElements = this.state.bookList.map(book => {
            return (<div>
                <span>{book.BookId}</span>
                <span>{book.Name}</span>
            </div>);
        });
        return (<div>{booksElements}</div>);
    }
    private closeNotification() {
        this.setState({ notifcationVisible: false });
    }
    private submitBookDomain() {
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

    private getBooks() {
        let action: ReduxStore.GetBooksAction = {
            type: CONST.getBooks,
            bookDomain: this.state.bookDomain,
        };

        this.store.dispatch(action);
    }

    private onBookListChange() {
        this.setState({ bookList: this.store.getState().books });
    }
}
