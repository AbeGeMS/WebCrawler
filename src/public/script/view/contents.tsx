import React = require("react");
import { ContentData } from "../../../lib/typings/dataModel";
import { Unsubscribe } from "redux";
import reduxStore from "../model/dataContainer";

export interface IContentsProp { }
interface IContentsState {
    content: ContentData;
}

export class Contents extends React.Component<IContentsProp, IContentsState>{

    public constructor(prop) {
        super(prop);
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
        let content = !this.state.content ?
            "loading..."
            : <dl>
                <dt>{this.state.content.Title}</dt>
                {this.state.content.Content.map(c => <dd>{c}</dd>)}
            </dl>;

        return <div className="test-24">
            <dl>
                {content}
            </dl>
        </div>;

    }

    private onContentChange() {
        let { book } = reduxStore().getState();
        let { content } = book;
        this.setState({ content: content })
    }
}