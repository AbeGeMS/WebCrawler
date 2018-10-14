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
}

export class TableOfContents extends
    React.Component<ITableOfContentProp, ITableOfContentState>{
    public constructor(prop) {
        super(prop);
        let {book} = ReduxStore().getState();
        let { table } = book;

        this.state = {
            list: table,
        };

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
            this.state.list.map(chapter =>
                <List.Item key={chapter.Href}
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
        let { table } = book;
        if (this.state.list !== table) {
            this.setState({ list: table });
        }
    }
}