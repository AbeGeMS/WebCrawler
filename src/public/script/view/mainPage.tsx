import * as React from "react";
import * as ReactDOM from "react-dom";
import { SamplePage } from "./samplePage";

interface IMainPageState {
    test: any
}

export class MainPage extends React.Component<any, IMainPageState> {
    public componentWillMount() {
    }
    public render() {
        return <SamplePage /> 
    }
}

let mainPageProp = {};
ReactDOM.render(<MainPage {...mainPageProp} />,document.getElementById("content-root"));