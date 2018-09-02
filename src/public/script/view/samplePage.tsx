import * as React from "react"
import { SampleModel } from "../model/sampleModel";

interface SamplePageState {
    content: string
}

export class SamplePage extends React.Component<any, SamplePageState>{
    public componentWillMount() {
        this.UpdateContent();
    }
    public state = {
        content: "nothing to show...",
    }

    private model: SampleModel;

    public render() {
        return <div className="basis-color">{this.state.content}</div>;
    }

    private UpdateContent() {
        let model = new SampleModel();
        model.getBookContent()
            .then(msg => this.setState({
                content: msg.Title,
            }));
    }
}
