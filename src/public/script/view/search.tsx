import * as React from "react";
import { SettingsModel } from "../model/settingsModel";
import { BookModel } from "../model/bookModel";

interface ISearchState {

}

export interface ISearchProp {
    settingModel: SettingsModel;
    searchedBook: BookModel;
    onSearchDone: () => void;
    onGoLibDone: () => void;
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
                <input className="search-bar" ref={this.searchElement}></input>
                <button className="search-btn bg-info" onClick={this.onSearchClick}>Search</button>
                <button className="get-lib-btn bg-primary" onClick={this.onGoLibClick}>Go Book Lib</button>
            </div>
        );
    }

    private onSearchClick() {
        let bookLib: string[];

        if (this.searchElement.current) {
            this.props.settingModel.setBookDomain(this.searchElement.current.value)
                .then(v => {
                    this.props.searchedBook.BookId =
                        this.props.settingModel.getBookId(this.searchElement.current.value);
                    this.props.onSearchDone();
                });
        }
    }

    private onGoLibClick() {
        if (this.searchElement.current) {
            this.props.settingModel.setBookDomain(this.searchElement.current.value)
                .then(v => this.props.onGoLibDone());
        }
    }
}