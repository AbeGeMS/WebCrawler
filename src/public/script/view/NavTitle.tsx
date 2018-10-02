import { NavBar, Icon, SearchBar } from "amazeui-dingtalk";
import { SetBookDomainAction_Request } from "../model/settingsReducer";
import React = require("react");
import CONST = require("../model/constants");
import ReduxStore from "../model/dataContainer";

export interface INavTitleProp {

}

interface INavTitleState {
    SearchValue: string;
    showsearBar: boolean;
}

export class NavTitle extends React.Component<INavTitleProp, INavTitleState>{
    public constructor(prop) {
        super(prop);
        this.state = {
            SearchValue: "",
            showsearBar: false,
        };
        this.onNavBarAction =this.onNavBarAction.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSearchValueChange = this.onSearchValueChange.bind(this);
    }

    public render() {
        let rightNav = [{ icon: "search" }];

        return this.state.showsearBar ?
            this.createSearchBar() :
            <NavBar rightNav={rightNav} onAction ={this.onNavBarAction} />;
    }
    private createSearchBar() {
        return <SearchBar
            placeholder="https://www.book.com/"
            cancelText="Search"
            onChange={this.onSearchValueChange}
            onReset={this.onSearchSubmit} />;
    }

    private onSearchValueChange(e: any) {
        this.setState({ SearchValue: e.target.value.trim() });
    }

    private onSearchSubmit() {
        let action: SetBookDomainAction_Request = {
            type: CONST.SetBookDomain_Request,
            bookDomain: this.state.SearchValue,
        };

        ReduxStore().dispatch(action);
        this.setState({showsearBar:false});
    }

    private onNavBarAction(item,e){
        this.setState({showsearBar:true});
    }
}