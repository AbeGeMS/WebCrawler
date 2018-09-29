import * as CONST from "../model/constants";
import * as React from "react";
import { BookMarkData } from "../../../lib/typings/dataModel";
import { NotificationControl } from "./notificationControl";
import { SearchBar } from "amazeui-dingtalk";
import { TabBarControl } from "./tabBarControl";
import { Store } from "redux";
import { BaseAction } from "../model/baseReducer";
import { SetBookDomainAction_Request } from "../model/settingsReducer";
import ReduxStore, { IStoreState } from "../model/dataContainer";

interface HomePageState {
    SearchValue: string;
    bookList: BookMarkData[];
}

export class HomePage extends React.Component<any, HomePageState>{
    public constructor(prop) {
        super(prop);

        this.state = {
            SearchValue: "",
            bookList: [],
        };

        this.onSearchValueChange = this.onSearchValueChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onReduxBookListChange = this.onReduxBookListChange.bind(this);
    }

    private store: Store<IStoreState, BaseAction>;

    public componentWillMount() {
        this.store = ReduxStore();
    }

    public componentDidMount() {
        this.store.subscribe(this.onReduxBookListChange);
    }

    public componentWillUnmount() {
    }

    public render() {

        return (
            <div className="home-page-container">
                <NotificationControl />
                <div className="home-page-content">
                    <SearchBar
                        placeholder="https://www.book.com"
                        cancelText="Search"
                        onChange={this.onSearchValueChange}
                        onReset={this.onSearchSubmit} />
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

    private onSearchValueChange(e: any) {
        this.setState({ SearchValue: e.target.value.trim() });
    }


    private onSearchSubmit() {
        let action: SetBookDomainAction_Request= {
            type: CONST.SetBookDomain_Request,
            bookDomain: this.state.SearchValue,
        };

        ReduxStore().dispatch(action);
    }

    private onReduxBookListChange() {
        let { bookMark } = this.store.getState();
        let books = bookMark && bookMark.books || [];

        if (this.state.bookList !== books)
            this.setState({ bookList: books });
    }
}
