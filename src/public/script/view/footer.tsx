import * as React from "react";

interface IFooterState {

}

export class Footer extends React.Component<any, IFooterState>{
    public render() {
        return (
            <div className="footer-root">
                <div className="footer-left">BookLib</div>
                <div className="footer-right">Settings</div>
            </div>
        );
    }
}