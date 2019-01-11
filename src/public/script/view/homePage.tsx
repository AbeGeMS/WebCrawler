import * as CONST from "../model/constants";
import * as React from "react";
import { Footer } from "./footer";

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
        return (
            <div className="home-page-container">
                <div className="home-page-content">
                </div>
                <div className="home-page-footer bg-dark">
                    <Footer />
                </div>
            </div>
        );
    }
}
