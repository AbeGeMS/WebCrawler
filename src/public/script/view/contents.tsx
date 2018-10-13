import React = require("react");
import { ContentData } from "../../../lib/typings/dataModel";
import { Unsubscribe } from "redux";
import reduxStore from "../model/dataContainer";

export interface IContentsProp { }
interface IContentsState {
    contents: ContentData[];
}

export class Contents extends React.Component<IContentsProp, IContentsState>{

    public constructor(prop) {
        super(prop);
        this.state = { contents: [] };
        this.onContentChange = this.onContentChange.bind(this);
    }

    private unSubscribe: Unsubscribe[] = [];

    public componentWillMount() {
        this.unSubscribe.push(reduxStore().subscribe(this.onContentChange));
    }

    public componentWillUnmount() {
        this.unSubscribe.forEach(sub => sub());
    }

    public render() {
        let content = !this.state.contents
            && this.state.contents.length > 0 ?
            <dt>loading...</dt>
            : this.state.contents.map((c,index) =>
                <dl key={index}>
                    <dt>{c.Title}</dt>
                    {c.Content && c.Content.map((p,sub) => <dd key={sub}>{p}</dd>)}
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