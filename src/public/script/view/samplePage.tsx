import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "amazeui-dingtalk";
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
        return <div className="basis-color"><Button amStyle="primary" radius amSize="xl">Hello world</Button></div>;
    }

    private UpdateContent() {
        let model = new SampleModel();
        model.getBookContent()
            .then(msg => this.setState({
                content: msg.Title,
            }));
    }
}
