import React = require("react");
import { List } from "amazeui-dingtalk";
import { TitleData } from "../../../lib/typings/dataModel";
import ReduxStore from "../model/dataContainer";
import { Unsubscribe } from "redux";
import { Action } from "../model/bookReducer";
import CONST = require("../model/constants");

export interface ITableOfContentProp {
    onTitleClick: () => void;
}

interface ITableOfContentState {
    list: TitleData[];
    bookId?: string;
}

export class TableOfContents extends
    React.Component<ITableOfContentProp, ITableOfContentState>{
    public constructor(prop) {
        super(prop);
        let {book} = ReduxStore().getState();
        let {bookId, table} = book;
        this.state = {
            list: table,
            bookId: bookId,
        };
        console.log("thie table list is null");
        this.onListChange = this.onListChange.bind(this);
    }

    private unsubscribe: Unsubscribe[] = [];

    public componentDidMount() {
        this.unsubscribe.push(ReduxStore().subscribe(this.onListChange))
    }

    public componentWillUnmount() {
        this.unsubscribe.forEach(sub => sub());
    }
    public render() {
        let list = this.state.list &&
            this.state.list.map((chapter,index) =>
                <List.Item key={index}
                    href={"#/" + chapter.Title}
                    title={chapter.Title}
                    onClick={this.onTitleClick.bind(this, chapter.Href)}
                />);
        return (
            <div className="show-scroll-y">
                <List >
                    {list}
                </List>
            </div>);
    }

    private onTitleClick(id: string) {
        let action: Action.GetContents_Request = {
            type: CONST.GetContent_Request,
            chapterId: id,
            bookId: ReduxStore().getState().book.bookId,
        };
        ReduxStore().dispatch(action);
        this.props.onTitleClick && this.props.onTitleClick();
    }

    private onListChange() {
        let { book } = ReduxStore().getState();
        let { table, latestCharpter, bookId } = book;
        if (this.state.bookId !== bookId) {
            let latest: TitleData = table[latestCharpter];
            console.log(`this lates chapter is ${latest && latest.Title}`);
            this.setState({
                list: latest ? [latest, ...table] : table,
                bookId: bookId
            });
        }
    }
}