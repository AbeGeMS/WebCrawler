import * as CONST from "../model/constants";
import * as React from "react";

interface HomePageState {
    Contents?: JSX.Element;
}

export class HomePage extends React.Component<any, HomePageState>{
    public constructor(prop) {
        super(prop);

        this.state = {
        };
    }

    public componentDidMount() {
    }

    public render() {
        return <div>Hello World</div>;
    }
}
