import React = require("react");
import { List } from "amazeui-dingtalk";
import ReduxStore from "../model/dataContainer";
import { BookMarkData } from "../../../lib/typings/dataModel";
import { Unsubscribe } from "redux";

export interface ITableOfContentsProp{

}

interface ITableOfContentsState{
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
        this.unsubscribe.forEach(sub => sub());
    }

    public render() {
        let list = this.state.books &&
            this.state.books.map(book =>
                <List.Item key={book.BookId}
                    href={book.BookId}
                    title={book.Name}
                />);
        return <List>{list}</List>
    }

    private onBookListChange() {
        let { bookMark } = ReduxStore().getState();
        let newBooks = bookMark && bookMark.books;

        if (this.state.books !== newBooks) {
            this.setState({ books: newBooks });
        }
    }
}