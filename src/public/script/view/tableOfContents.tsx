import React = require("react");
import { List, Button, Icon } from "amazeui-dingtalk";
import { BookMarkData } from "../../../lib/typings/dataModel";
import { Unsubscribe } from "redux";
import ReduxStore from "../model/dataContainer";
import CONST = require("../model/constants");
import { requestGetBooksAction } from "../model/bookMarkReducer";
import { NavTitle } from "./NavTitle";

export interface ITableOfContentsProp {

}

interface ITableOfContentsState {
    books: null | BookMarkData[];
}

export class TableOfContents extends React.Component<ITableOfContentsProp, ITableOfContentsState>{
    public constructor(prop) {
        super(prop);

        let bookmark = ReduxStore().getState().bookMark;
        this.state = { books: bookmark && bookmark.books };
        this.onBookListChange = this.onBookListChange.bind(this);
    }

    private unsubscribe: Unsubscribe[] = [];

    public componentWillMount() {
        this.unsubscribe.push(ReduxStore().subscribe(this.onBookListChange));
    }

    public componentDidMount() {
    }

    public componentWillUnmount(){
        this.unsubscribe.forEach(sub => sub());
    }

    public render() {
        let list = this.state.books &&
            this.state.books.map(book =>
                <List.Item key={book.BookId}
                    href={book.BookId}
                    title={book.Name}
                />);
        return <List>
            <NavTitle/>
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
}