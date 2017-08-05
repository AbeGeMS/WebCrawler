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
        private currentContent: any[] = [];
        private currentChapter: number = 0;
        private getContentDeferred: JQueryDeferred<void>;

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
                    if (this.currentContent === null)
                    {
                        this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href)
                            .then(() => {
                                this.setState(
                                    { bookContent: this.currentContent, isTable: false, chapterIndex: this.currentChapter },
                                    () => this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href)
                                );
                            });
                    } else {
                        this.setState(
                            { bookContent: this.currentContent, isTable: false, chapterIndex: this.currentChapter },
                            () => this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href)
                        );
                    }
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
                        this.getBookContent([], value.href)
                            .then(() => {
                                this.setState(
                                    { bookContent: this.currentContent, isTable: false, chapterIndex: this.currentChapter },
                                    () =>
                                    {
                                        $("body").scrollTop(0);
                                        this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href);
                                    }
                                );
                            });
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

        private getBookContent(content: any[], url: string): JQueryPromise<void> {
            if (!this.getContentDeferred || !content || content.length === 0) {
                this.getContentDeferred = $.Deferred<void>(); 
            }

            let provider = new Abe.Client.dataProvider();
            provider.getbookContent(this.getHostname() + url)
                .then(c => {
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
                        content.forEach(v => this.replaceGroup().forEach(r => {
                            v.p = v.p.replace(new RegExp(r.s, "gm"), r.t);
                        }));
                        content.push({ p: this.state.tableOfContent[index - 1].title + "完"});
                        this.currentContent = content;
                        this.currentChapter = index - 1;
                        this.getContentDeferred.resolve();
                    }
                }, () => {
                    this.currentContent = null;
                    this.getContentDeferred.reject();
                });
            return this.getContentDeferred.promise();
        }

        private replaceGroup() {
            return [
                { s: "sè", t: "色" },
                { s: "rì", t: "日" },
                { s: "jīng", t: "精" },
                { s: "xìng", t: "兴" },
                { s: "()", t: "" },
                { s: "cháo", t: "糙" },
                { s: "jǐng", t: "景" },
                { s: "yīn", t: "音" },
                { s: "sāo", t: "瘙" },
                { s: "yù", t: "域" },
                { s: "レwww.siluke.com♠思♥路♣客レ", t: "" },
                { s: "jiǔ", t: "酒" },
                { s: "zì ", t: "字" },
                { s: "yóu", t: "油" },
                { s: "zhèng", t: "正" },
                { s: "fǔ", t: "府" },
                { s: "nǎi", t: "乃" },
                { s: "jiān", t: "间" },
                { s: "chūn", t: "春" },
                { s: "shè", t: "社" },
                { s: "cāo", t: "糙" },
                { s: "dú", t: "队" },
                { s: "lì", t: "丽" },
                { s: "jǐng", t: "警" },
                { s: "jǐng", t: "警" },
                { s: "chéng", t: "城" },
                { s: "rén", t: "人" },
                { s: "zhèng ", t:"正"},
                { s: "fǔ", t: "腹" },
                { s: "nǎi", t: "奶" },
                { s: "è", t: "色" },
                { s: "jī", t: "基" },
                { s: "méng", t: "萌" },
                { s: "lù", t: "陆" },
                { s: "mí", t: "弥" },
                { s: "hún", t: "魂" },
                { s: "dàng", t: "荡" },
            ];
        }
    }
}
let sPageProp = {}

ReactDOM.render(<Abe.Client.searchPage {...sPageProp} />, document.getElementById("content-root"));