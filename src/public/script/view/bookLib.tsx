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

    private clickedButton: React.RefObject<HTMLButtonElement>;
    public constructor(prop) {
        super(prop);
        this.onBookClick = this.onBookClick.bind(this);
        this.clickedButton = React.createRef<HTMLButtonElement>();
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
                    ref={this.clickedButton}
                    onClick={this.onBookClick}>{b.Name}</button>
            });

            return bookList;
        }

        return <div className="spinner text-secondary">Loading...</div>;
    }

    private onBookClick() {
        this.props.selectedBook.BookId = this.clickedButton.current.name;
        this.props.onBookSelect();
    }
}