import React = require("react");
import { ContentData } from "../../../lib/typings/dataModel";
import { Unsubscribe } from "redux";
import reduxStore from "../model/dataContainer";
import { BaseComponent } from "./baseComponent";

export interface IContentsProp { }
interface IContentsState {
    contents: ContentData[];
}

export class Contents extends BaseComponent<IContentsProp, IContentsState>{

    public constructor(prop) {
        super(prop);
        this.state = { contents: [] };
        this.onContentChange = this.onContentChange.bind(this);
    }

    public componentWillMount() {
        this.unSubscribe.push(reduxStore().subscribe(this.onContentChange));
    }

    public render() {
        let content = !this.state.contents
            && this.state.contents.length > 0 ?
            <dt>loading...</dt>
            : this.state.contents.map((c,index) =>
                <dl key={index}>
                    <dt>{c.Title}</dt>
                    {c.Content && c.Content.map((p,pIndex) => <p key={pIndex}>{p}</p>)}>
                </dl>);

        return <div className="test-24 show-scroll-y">
            <dl>
                {content}
            </dl>
        </div>;

    }

    private onContentChange() {
        let { book } = reduxStore().getState();
        let { contents } = book;
        this.setState({ contents: contents })
    }
}