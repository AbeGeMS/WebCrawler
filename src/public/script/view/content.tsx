import * as React from "react";
import { BookModel } from "../model/bookModel";
import { ContentData } from "../../../lib/typings/dataModel";
import { guid } from "../../../lib/utility";

interface IContentState {
    contents: ContentData[];
}

export interface IContentProp {
    book: BookModel;
    charpter: string;
}

export class Content extends React.Component<IContentProp, IContentState>{
    public constructor(prop) {
        super(prop);
    }

    public componentWillMount() {
        this.props.book.getBookContent(this.props.book.BookId, this.props.charpter)
            .then(v => this.setState({ contents: v }));
    }

    public render() {
        if (this.state && this.state.contents) {
            return this.state.contents.map(v => {
                return (
                    [<p className="title" key={guid()}>{v.Title}</p>,
                    ...this.oneCharter(v.Content)]
                );
            });
        }
        return <div className="spinner text-secondary">Loading...</div>
    }

    private oneCharter(content: string[]): JSX.Element[] {
        //TODO: modify content
        return content.map(pp => <p key={guid()}>{pp}</p>);
    }
}