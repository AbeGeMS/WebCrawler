import React = require("react");
import { List } from "amazeui-dingtalk";
import { TitleData } from "../../../lib/typings/dataModel";
import ReduxStore from "../model/dataContainer";
import { Unsubscribe } from "redux";
import { Action } from "../model/bookReducer";
import CONST = require("../model/constants");
import { BaseComponent } from "./baseComponent";
import { RequestStatus } from "../model/baseReducer";

export interface ITableOfContentProp {
    onTitleClick: () => void;
}

interface ITableOfContentState {
    list: TitleData[];
    bookId?: string;
}

export class TableOfContents extends
    BaseComponent<ITableOfContentProp, ITableOfContentState>{
    public constructor(prop) {
        super(prop);
        let {book} = ReduxStore().getState();
        let { bookId, table, status } = book;
        this.state = {
            list: status == RequestStatus.Success ? table : [],
            bookId: bookId,
        };

        this.onListChange = this.onListChange.bind(this);
    }

    public componentDidMount() {
        this.unSubscribe.push(ReduxStore().subscribe(this.onListChange))
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
        let { table, latestCharpter, bookId, status } = book;

        if (this.state.bookId !== bookId && status == RequestStatus.Success) {
            let latest: TitleData = table[latestCharpter];
            console.log(`this lates chapter is ${latest && latest.Title}`);
            this.setState({
                list: latest ? [latest, ...table] : table,
                bookId: bookId
            });
        }
    }
}