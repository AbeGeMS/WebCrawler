import * as React from "react";

interface IFooterState {

}

export interface IFooterProp {
    onSearchClick: () => void,
    onSettingClick: () => void,
}

export class Footer extends React.Component<IFooterProp, IFooterState>{
    constructor(prop) {
        super(prop);
        this.onSearchClick= this.onSearchClick.bind(this);
        this.onSettingsClick = this.onSettingsClick.bind(this);
    }
    public render() {
        return (
            <div className="footer-root">
                <div className="footer-left" onClick={this.onSearchClick}>Search</div>
                <div className="footer-right" onClick={this.onSettingsClick}>Settings</div>
            </div>
        );
    }

    private onSearchClick() {
        this.props.onSearchClick();
    }

    private onSettingsClick() {
        this.props.onSettingClick();
    }
}