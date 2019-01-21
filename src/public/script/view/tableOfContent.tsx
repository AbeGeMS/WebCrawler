import * as React from "react";
import { BookMark } from "../model/bookMarkModel";
import { BookModel } from "../model/bookModel";
import { TitleData } from "../../../lib/typings/dataModel";
import { guid } from "../../../lib/utility";

interface ITableOfContentState {
    lists: TitleData[];
    latestCharpter: number;
}

export interface ITableOfContentProp {
    book: BookModel;
    bookMark: BookMark;
    onCharpterSelected:()=>void;
}
export class TableOfContent extends React.Component<ITableOfContentProp, ITableOfContentState>{
    private charpterref: React.RefObject<HTMLButtonElement>;
    public constructor(prop) {
        super(prop);
        this.charpterref = React.createRef<HTMLButtonElement>();
    }

    public componentWillMount() {
        let bookId = this.props.book.BookId;
        this.props.book.getTableOfContents(bookId)
            .then(list => this.setState({ lists: list }))
            .then(
                () => this.props.bookMark.getLatestChapter(bookId).then(l =>
                    this.setState({ latestCharpter: l }))
            );
    }

    public render() {
        if (this.state && this.state.lists) {
            let lastCharpter = this.state.latestCharpter ? this.state.lists[this.state.latestCharpter] : this.state.lists[0];
            let tableOfContent = this.state.lists.map(charpter => <button
                key={guid()}
                className="primary-btn bg-dak text-white"
                name={charpter.Href}
                ref={this.charpterref}
                onClick={this.onCharpterButtonClick}>
                {charpter.Title}</button>);
            return (<div>
                <button
                    className="primary-btn bg-dak text-white"
                    name={lastCharpter.Href}
                    ref={this.charpterref}
                    onClick={this.onCharpterButtonClick}>
                    >{lastCharpter.Title}</button>
                {tableOfContent}
            </div>);
        }

        return <div className="spinner text-secondary">Loading...</div>
    }

    private onCharpterButtonClick(){
        this.props.onCharpterSelected();
    } 
}