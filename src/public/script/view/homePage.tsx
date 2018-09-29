import * as CONST from "../model/constants";
import * as React from "react";
import { BookMarkData } from "../../../lib/typings/dataModel";
import { NotificationControl } from "./notificationControl";
import { SearchBar } from "amazeui-dingtalk";
import { TabBarControl } from "./tabBarControl";
import { Unsubscribe } from "redux";
import { SetBookDomainAction_Request } from "../model/settingsReducer";
import ReduxStore from "../model/dataContainer";
import { requestGetBooksAction } from "../model/bookMarkReducer";

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

    private unsbuscribe: Unsubscribe[]=[];

    public componentWillMount() {
    }

    public componentDidMount() {
        let getBookAction: requestGetBooksAction = {
            type: CONST.GetBooks_Request,
        };
        ReduxStore().dispatch(getBookAction);

        this.unsbuscribe.push(ReduxStore().subscribe(this.onReduxBookListChange));
    }

    public componentWillUnmount() {
        if(this.unsbuscribe){
            this.unsbuscribe.forEach(t=>t());
        }
    }

    public render() {
        let content = this.state.bookList && this.state.bookList.length > 0 ?
            this.createBookList() :
            this.createSearchBar();

        return (
            <div className="home-page-container">
                <NotificationControl />
                <div className="home-page-content">
                    {content}
                </div>
                <div className="home-page-footer">
                    <TabBarControl />
                </div>
            </div>
        );
    }

    private createSearchBar() {
        return <SearchBar
            placeholder="https://www.book.com"
            cancelText="Search"
            onChange={this.onSearchValueChange}
            onReset={this.onSearchSubmit} />;
    }

    private createBookList() {
        let booksElements = this.state.bookList.map((book,index) => {
            return (<div key={index}>
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
        let action: SetBookDomainAction_Request = {
            type: CONST.SetBookDomain_Request,
            bookDomain: this.state.SearchValue,
        };

        ReduxStore().dispatch(action);
    }

    private onReduxBookListChange() {
        let { bookMark } =ReduxStore().getState();
        let books = bookMark && bookMark.books || [];

        if (this.state.bookList !== books)
            this.setState({ bookList: books });
    }
}
