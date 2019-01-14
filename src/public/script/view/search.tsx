import * as React from "react";
import { SettingsModel } from "../model/settingsModel";

interface ISearchState {

}

export interface ISearchProp {
    settingModel: SettingsModel;
    onSearchDone: () => void;
    onGoLibDone:()=>void;
}

export class Search extends React.Component<ISearchProp, ISearchState>{
    private searchElement: React.RefObject<HTMLInputElement>;
    public constructor(prop) {
        super(prop);

        this.onSearchClick = this.onSearchClick.bind(this);
        this.onGoLibClick = this.onGoLibClick.bind(this);
        this.searchElement = React.createRef<HTMLInputElement>();
    }
    public render() {
        return (
            <div>
                <input className="search-bar"></input>
                <button className="search-btn bg-info" onClick={this.onSearchClick}>Search</button>
                <button className="get-lib-btn bg-primary" onClick={this.onGoLibClick}>Go Book Lib</button>
            </div>
        );
    }

    private onSearchClick() {
        let bookLib: string[];
    }

    private onGoLibClick(){
        this.props.settingModel.setBookDomain(this.searchElement.current.value)
            .then(v => this.props.onGoLibDone());
    }
}