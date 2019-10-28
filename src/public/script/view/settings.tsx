import * as React from "react";
import { SettingsModel } from "../model/settingsModel";

interface ISettingsState {

}

export interface ISettingsProp {
    settingModel: SettingsModel;
    onBackupDone: () => void;
    onRestoreDone: () => void;
}

export class Settings extends React.Component<ISettingsProp, ISettingsState>{

    private booksRefreshElement: React.RefObject<HTMLInputElement>;

    public constructor(prop) {
        super(prop);

        this.onBackUp = this.onBackUp.bind(this);
        this.onRestore = this.onRestore.bind(this);
        this.booksRefreshElement = React.createRef<HTMLInputElement>();
    }
    public render() {
        return (
            <div>
                <input className="search-bar" ref={this.booksRefreshElement}></input>
                <div className="search-flex-container">
                    <button className="search-btn bg-info" onClick={this.onBackUp}>Backup</button>
                    <button className="get-lib-btn bg-primary" onClick={this.onRestore}>Restore</button>
                </div>
            </div>
        );
    }

    private onBackUp() {
        this.props.settingModel.bakupBookLib().then(
            () => {
                this.props.onBackupDone();
            }
        );
    }

    private onRestore() {
        if (this.booksRefreshElement.current) {
            this.props.settingModel.restoreBookLib(this.booksRefreshElement.current.value)
                .then(v => this.props.onRestoreDone);
        }
    }
}