/// <reference path=".././../node_modules/@types/react/index.d.ts"/>
/// <reference path=".././../node_modules/@types/react-dom/index.d.ts"/>
/// <reference path="dataProvider.ts"/>

module Abe.Client {
    interface searchPageState {
        searchValue: string;
        tableOfContent: any[];
        bookContent: any[];
        isTable: boolean;
        chapterIndex: number;
    }

    export class searchPage extends React.Component<any, searchPageState>{
        public componentDidMount() {
        }
        public state = {
            searchValue: "",
            tableOfContent: [],
            bookContent: [],
            isTable: true,
            chapterIndex:0,
        };
        public render() {
            let inputProp: React.HTMLProps<HTMLElement> = {
                style: { width: "60%" },

                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ searchValue: e.target.value.replace(/ /g,'') }),
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
            let nextChapter: React.HTMLProps<HTMLElement> = {
                disabled: this.state.chapterIndex >= this.state.tableOfContent.length,
                onClick: () => {
                    let content = [];
                    this.getBookContent(content, this.state.tableOfContent[this.state.chapterIndex + 1].href);
                }
            };

            let bookContent = (
                <div>
                    <div>
                        <button {...backTableBtnProp} >Table Of Content</button>
                        <button {...nextChapter}>Next Chapter</button>
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
                        let content = [];
                        this.getBookContent(content, value.href);
                    }
                };
                return <span><button {...btnProp}>{value.title}</button></span>;
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
        private bookBuffer = 0;

        private getBookContent(content: any[], url: string) {
            let provider = new Abe.Client.dataProvider();
            provider.getbookContent(this.getHostname() + url)
                .then(c => {
                    debugger;
                    if (!content) {
                        content = [];
                    }
                    content = content.concat(c);
                    let index = 0;
                    this.state.tableOfContent.forEach((v, i) => {
                        if (v.href === url) {
                            index = i;
                        }
                    });
                    if (++index < this.state.tableOfContent.length
                        && this.bookBuffer++ < 6) {
                        this.getBookContent(content, this.state.tableOfContent[index].href);
                    } else {
                        this.bookBuffer = 0;
                        content.push({ p: this.state.tableOfContent[index - 1].title })
                        this.setState({ bookContent: content, isTable: false, chapterIndex: index - 1 });
                    }
                });
        }
    }
}
let sPageProp = {}

ReactDOM.render(<Abe.Client.searchPage {...sPageProp} />, document.getElementById("content-root"));