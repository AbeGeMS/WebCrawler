import React = require("react");
import { List, Button, Icon } from "amazeui-dingtalk";
import { BookMarkData } from "../../../lib/typings/dataModel";
import { Unsubscribe } from "redux";
import ReduxStore from "../model/dataContainer";
import CONST = require("../model/constants");
import { requestGetBooksAction } from "../model/bookMarkReducer";
import { NavTitle } from "./NavTitle";
import { Action } from "../model/bookReducer";
import { BaseComponent } from "./baseComponent";

export interface IBookListProp {
    onItemClick: () => void;
}

interface IBookListState {
    books: null | BookMarkData[];
}

export class BookList extends BaseComponent<IBookListProp, IBookListState>{
    public constructor(prop) {
        super(prop);

        let bookmark = ReduxStore().getState().bookMark;
        this.state = { books: bookmark && bookmark.books };
        this.onBookListChange = this.onBookListChange.bind(this);
    }

    public componentWillMount() {
        this.unSubscribe.push(ReduxStore().subscribe(this.onBookListChange));
    }

    public componentDidMount() {
    }

    public render() {
        let list = this.state.books &&
            this.state.books.map(book =>
                <List.Item key={book.BookId}
                    href={"#/" + book.BookId}
                    title={book.Name}
                    onClick={this.onItemClick.bind(this,book.BookId)}
                />);
        return <List >
            <NavTitle />
            {list}
            <Button hollow noHb block onClick={this.refreshBookList}>
                <Icon name="refresh" />
                Refresh</Button>
        </List>
    }

    private refreshBookList() {
        let action: requestGetBooksAction = {
            type: CONST.GetBooks_Request,
        }

        ReduxStore().dispatch(action);
    }

    private onBookListChange() {
        let { bookMark } = ReduxStore().getState();
        let newBooks = bookMark && bookMark.books;

        if (this.state.books !== newBooks) {
            this.setState({ books: newBooks });
        }
    }

    private onItemClick(id: string) {
        let action: Action.GetTableOfContents_Request = {
            type: CONST.GetTableOfContents_Request,
            bookId: id,
        };
        ReduxStore().dispatch(action);

        if (this.props.onItemClick) {
            this.props.onItemClick();
        }
    }
}