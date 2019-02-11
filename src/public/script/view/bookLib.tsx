import * as React from "react";

import { BookMark } from "../model/bookMarkModel";
import { BookMarkData } from "../../../lib/typings/dataModel";
import { guid} from "../../../lib/utility";
import { BookModel } from "../model/bookModel";

interface IbookLibState {
    books: BookMarkData[];
}

export interface IBookLibProp {
    bookMark: BookMark;
    selectedBook:BookModel;
    onBookSelect: () => void;
}

export class BookLib extends React.Component<IBookLibProp, IbookLibState>{

    public constructor(prop) {
        super(prop);
        this.onBookClick = this.onBookClick.bind(this);
    }

    public componentWillMount() {
        this.props.bookMark.getBooks().then(v => { this.setState({ books: v }) });
    }

    public render() {
        if (this.state && this.state.books) {
            let bookList = this.state.books.map(b => {
                return <button
                    key ={guid()} 
                    className="primary-btn bg-dark text-white"
                    name={b.BookId}
                    onClick={this.onBookClick}>{b.Name}</button>
            });

            return bookList;
        }

        return <div className="spinner text-secondary">Loading...</div>;
    }

    private onBookClick(e:React.MouseEvent<HTMLButtonElement,MouseEvent>) {
        this.props.selectedBook.BookId = (e.target as any).name;
        this.props.onBookSelect();
    }
}