/// <reference path=".././../node_modules/@types/react/index.d.ts"/>
/// <reference path=".././../node_modules/@types/react-dom/index.d.ts"/>
/// <reference path="dataProvider.ts"/>

module Abe.Client {
    interface searchPageState {
        bookHost: string;
        bookId: string;
        bookContent: any[];
        chapterIndex: number;
        isTable: boolean;
        tableOfContent: any[];
    }

    export class searchPage extends React.Component<any, searchPageState>{
        private currentContent: any[] = [];
        private currentChapter: number = 0;
        private getContentDeferred: JQueryDeferred<void>;

        public componentDidMount() {
        }

        public state = {
            bookHost: "",
            bookId: "",
            bookContent: [],
            chapterIndex: 0,
            isTable: true,
            tableOfContent: [],
        };
        public render() {
            let inputProp: React.HTMLProps<HTMLElement> = {
                style: { width: "60%" },

                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    let parseResult = this.parseUrl(e.target.value.replace(/ /g, ''));
                    this.setState({ bookHost: parseResult.hostname, bookId: parseResult.bookId });
                },
            };
            let btnProp: React.HTMLProps<HTMLElement> = {
                onClick: () => {
                    let provider = new Abe.Client.dataProvider();
                    provider.getbookTableOfContent(this.state.bookHost + "/" + this.state.bookId + "/")
                        .then(c => this.setState({ tableOfContent: c },
                            () => {
                                this.getLatestChapter();
                            }
                        ));
                },
            };

            let tableContent = (
                <div>
                    <span>
                        <input {...inputProp} />
                    </span>
                    <span>
                        <button {...btnProp} >Search</button>
                    </span>
                    <span>{this.latestChapter()}</span>
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
                    if (this.currentContent === null) {
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

            let bookContent: JSX.Element = (
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

        private bookContent(list: { p: string }[]) {
            return list.map(value => {
                return <p>{value.p}</p>;
            });
        }

        private tableOfContent(list: { href: string, title: string }[]) {
            let content = list.map(value => {
                let btnProp: React.HTMLProps<HTMLElement> = {
                    onClick: () => {
                        this.getContentFromTable(value.href);
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

        private latestChapter() {

            let latestChapterProp: React.HTMLProps<HTMLElement> = {
                onClick: () => {
                    this.getContentFromTable(this.state.tableOfContent[this.state.chapterIndex + 1].href);
                },
            };

            if (!!this.state.tableOfContent[this.state.chapterIndex + 1]){
                return (
                        <button {...latestChapterProp} >
                             { this.state.tableOfContent[this.state.chapterIndex + 1].title }
                        </button>
                );
            } else {
                return null;
            }
        }
        private bookBuffer = 0;

        private getContentFromTable(url: string) {
            this.getBookContent([], url)
                .then(() => {
                    this.setState(
                        { bookContent: this.currentContent, isTable: false, chapterIndex: this.currentChapter },
                        () => {
                            $("body").scrollTop(0);
                            this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href);
                        }
                    );
                });
        }

        private getLatestChapter() {
            let provider = new Abe.Client.dataProvider();
            provider.getLatestChapertNumber(this.state.bookId)
                .then(v => this.setState({ chapterIndex: v }));
           
        }


        private getBookContent(content: any[], url: string): JQueryPromise<void> {
            if (!this.getContentDeferred || !content || content.length === 0) {
                this.getContentDeferred = $.Deferred<void>();
            }

            let provider = new Abe.Client.dataProvider();
            provider.getbookContent(this.state.bookHost + url, this.state.bookId, this.state.chapterIndex)
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
                        content.push({ p: this.state.tableOfContent[index - 1].title + "完" });
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

        private parseUrl(url: string): { hostname: string, bookId: string } {
            let result = url.match(/(.*)\/(.*)\//);
            return { hostname: result[1], bookId: result[2] };
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
                { s: "zhèng ", t: "正" },
                { s: "fǔ", t: "腹" },
                { s: "nǎi", t: "奶" },
                { s: "è", t: "色" },
                { s: "jī", t: "基" },
                { s: "méng", t: "萌" },
                { s: "lù", t: "陆" },
                { s: "mí", t: "弥" },
                { s: "hún", t: "魂" },
                { s: "dàng", t: "荡" },
                { s: "bō", t: "波" },
                { s: "shì", t: "市" },
                { s: "nv", t: "女" },
                { s: "『", t: "" },
                { s: "』", t: "" },
                { s: "mén", t: "门" },
                { s: "máo", t: "毛" },
                { s: "hòu", t: "后" },
                { s: "huā", t: "花" },
                { s: "jiāo", t: "交" },
                { s: "ji", t: "基" },
                { s: "dòng", t: "动" },
                { s: "luàn", t: "换" },
                { s: "fù", t: "付" },
                { s: "xìn", t: "信" },
                { s: "xiōng", t: "兄" },
                { s: "yòu", t: "又" },
                { s: "luǒ", t: "裸" },
                { s: "sī", t: "私" },
                { s: "", t: "" },
                { s: "", t: "" },
                { s: "readx", t: "" },
                { s: "&nbsp;", t: "" },
                { s: "nbsp;", t: "" },
            ];
        }
    }
}
let sPageProp = {}

ReactDOM.render(<Abe.Client.searchPage {...sPageProp} />, document.getElementById("content-root"));