import * as React from "react";
import { Footer, IFooterProp } from "./footer";
import { Search, ISearchProp } from "./search";
import { ModelFactory } from "../model/model";
import { BookLib, IBookLibProp } from "./bookLib";
import { ITableOfContentProp, TableOfContent } from "./tableOfContent";
import { Content, IContentProp } from "./content";

enum ContentComponent {
    BookLib = 1,
    Search,
    TableOfContent,
    Content,
    Settings,
}

interface HomePageState {
    Contents?: JSX.Element;
    currentContent: ContentComponent;
}

export class HomePage extends React.Component<any, HomePageState>{
private readonly modelFac:ModelFactory;
    public constructor(prop) {
        super(prop);

        this.setComponentState = this.setComponentState.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.modelFac = new ModelFactory();
    }

    public componentDidMount() {
    }

    public render() {
        let footerProp: IFooterProp = {
            onSearchClick: () => { this.setComponentState(ContentComponent.Search) },
            onSettingClick: () => { this.setComponentState(ContentComponent.Settings) },
        };
        return (
            <div className="home-page-container">
                <div className="home-page-content show-scroll-y">
                    {this.renderContent()}
                </div>
                <div className="home-page-footer bg-dark">
                    <Footer {...footerProp} />
                </div>
            </div>
        );
    }

    private renderContent() {
        if (!this.state || !this.state.currentContent) {
            return <div></div>;
        }

        let bookLibProp: IBookLibProp = {
            bookMark: this.modelFac.BookMark,
            selectedBook: this.modelFac.Book,
            onBookSelect: () => this.setComponentState(ContentComponent.TableOfContent),
        };

        let tableOfContent: ITableOfContentProp = {
            book: this.modelFac.Book,
            bookMark: this.modelFac.BookMark,
            state:this.modelFac.State,
            onCharpterSelected: () => this.setComponentState(ContentComponent.Content),
        }

        let contentProp: IContentProp = {
            book: this.modelFac.Book,
            charpter:this.modelFac.State.SelectedCharpter,
        }
        let result: JSX.Element;
        switch (this.state.currentContent) {
            case ContentComponent.Search:
                let searchProp: ISearchProp = {
                    settingModel: this.modelFac.Setting,
                    onSearchDone: () => { this.setComponentState(ContentComponent.Search) },
                    onGoLibDone: () => { this.setComponentState(ContentComponent.BookLib) },
                }
                result = <Search {...searchProp} />;
                break;
            case ContentComponent.BookLib:
                result = <BookLib {...bookLibProp} />;
                break;
            case ContentComponent.Content:
                result = <Content {...contentProp}/>;
                break;
            case ContentComponent.TableOfContent:
                result = <TableOfContent {...tableOfContent}/>;
                break;
            case ContentComponent.Settings:
                break;
            default:
                break;
        }
        return result;
    }

    private setComponentState(target: ContentComponent) {
        this.setState({ currentContent: target });
    }
}
