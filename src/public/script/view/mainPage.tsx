import * as React from "react";
import * as ReactDOM from "react-dom";
import { HomePage } from "./homePage";

interface IMainPageState {
    test: any
}

export class MainPage extends React.Component<any, IMainPageState> {
    public componentWillMount() {
    }
    public render() {
        return <HomePage/> 
    }
}

let mainPageProp = {};
ReactDOM.render(<MainPage {...mainPageProp} />,document.getElementById("content-root"));