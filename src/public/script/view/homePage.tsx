import * as CONST from "../model/constants";
import * as React from "react";
import { NotificationControl } from "./notificationControl";
import { TabBarControl, TabCategory } from "./tabBarControl";
import { requestGetBooksAction } from "../model/bookMarkReducer";
import { BookList } from "./bookList";
import { TableOfContents } from "./TableOfContents";
import ReduxStore from "../model/dataContainer";
import { Contents } from "./contents";
import { BaseComponent } from "./baseComponent";

interface HomePageState {
    SearchValue: string;
    Contents?: JSX.Element;
}

export class HomePage extends BaseComponent<any, HomePageState>{
    public constructor(prop) {
        super(prop);

        this.state = {
            SearchValue: "",
        };

        this.onTabBarClick = this.onTabBarClick.bind(this);
        this.createContents = this.createContents.bind(this);
        this.createTableOfContents = this.createTableOfContents.bind(this);
    }

    public componentDidMount() {
        let getBookAction: requestGetBooksAction = {
            type: CONST.GetBooks_Request,
        };
        ReduxStore().dispatch(getBookAction);
    }

    public render() {
        return (
            <div className="home-page-container">
                <NotificationControl />
                <div className="home-page-content">
                    {this.state.Contents}
                </div>
                <div className="home-page-footer">
                    <TabBarControl onClick={this.onTabBarClick} />
                </div>
            </div>
        );
    }

    private onTabBarClick(key: string) {
        switch (key) {
            case TabCategory.Home:
                this.setState({ Contents: <BookList
                     onItemClick={this.createTableOfContents} /> });
                break;
            case TabCategory.Gear:
            case TabCategory.Next:
                this.setState({ Contents: undefined });
                break;
        }
    }

    private createTableOfContents(){
        this.setState({ Contents: <TableOfContents onTitleClick={this.createContents} /> });
    }

    private createContents(){
        this.setState({ Contents: <Contents/> });
    }
}
