/// <reference path=".././../node_modules/@types/react/index.d.ts"/>
/// <reference path=".././../node_modules/@types/react-dom/index.d.ts"/>
/// <reference path="dataProvider.ts"/>

module Abe.Client {
    interface searchPageState {
        searchValue: string;
        tableOfContent: any[];
        bookContent: any[];
        isTable: boolean;
    }

    export class searchPage extends React.Component<any, searchPageState>{
        public componentDidMount() {
        }
        public state = {
            searchValue: "",
            tableOfContent: [],
            bookContent: [],
            isTable: true,
        };
        public render() {
            let inputProp: React.HTMLProps<HTMLElement> = {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ searchValue: e.target.value }),
            };
            let btnProp: React.HTMLProps<HTMLElement> = {
                onClick: () => {
                    let provider = new Abe.Client.dataProvider();
                    provider.getbookTableOfContent(this.state.searchValue)
                        .then(c => this.setState({ tableOfContent: c }));
                },
            }
            let tableContent = (
                <div>
                    <span>
                        <input {...inputProp} />
                    </span>
                    <span>
                        <button {...btnProp} >Search</button>
                    </span>
                    <div>
                        {this.tableOfContent(this.state.tableOfContent)}
                    </div>
                </div>);
            let backTableBtnProp: React.HTMLProps<HTMLElement> = {
                onClick: () => {
                    this.setState({ isTable: !this.state.isTable });
                }
            };

            let bookContent = (
                <div>
                    <div>
                        <button {...backTableBtnProp} > Table Of Content</button>
                    </div>
                    <div>
                        {this.bookContent(this.state.bookContent)}
                    </div>
                </div>
            );
            return this.state.isTable ? tableContent : bookContent;
        }

        private tableOfContent(list: { href: string, title: string }[]) {
            let content = list.map(value => {
                let btnProp: React.HTMLProps<HTMLElement> = {
                    onClick: () => {
                        let provider = new Abe.Client.dataProvider();
                        provider.getbookContent(this.getHostname() + value.href)
                            .then(c => this.setState({ bookContent: c, isTable: false }));
                    }
                };
                return <li><button {...btnProp}>{value.title}</button></li>;
            });
            return (
                <div>
                    {content}
                </div>
            );
        }

        private bookContent(list: { p: string }[]) {
            return list.map(value => {
                return <p>{value.p}</p>;
            });
        }

        private getHostname() {
            let a = document.createElement("a");
            a.href = this.state.searchValue;
            return a.protocol+"//" + a.hostname;
        }
    }
}
let sPageProp = {}

ReactDOM.render(<Abe.Client.searchPage {...sPageProp} />, document.getElementById("content-root"));