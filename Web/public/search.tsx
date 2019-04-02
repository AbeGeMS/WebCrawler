/// <reference path=".././../node_modules/@types/react/index.d.ts"/>
/// <reference path=".././../node_modules/@types/react-dom/index.d.ts"/>
/// <reference path="dataProvider.ts"/>

namespace Abe.Client {
    interface searchPageState {
        bookHost: string;
        bookId: string;
        bookContent: any[];
        chapterIndex: number;
        isTable: boolean;
        tableOfContent: any[];
        bookMark: { id: string, name: string }[];
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
            bookMark:[],
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
                    this.getChapterList(this.state.bookHost + "/" + this.state.bookId + "/");
                },
            };

            let bookMarkProp: React.HTMLProps<HTMLElement> = {
                onClick: () => {
                    let provider = new Abe.Client.dataProvider();
                    provider.getBookMark(this.state.bookHost)
                        .then(books => this.setState({ bookMark: books, bookId:"", tableOfContent:[] }));
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
                    <span><button {...bookMarkProp}>I'm feeling Lucky</button></span>
                    <span>{this.latestChapter()}</span>
                    <div>{this.bookMark(this.state.bookMark)}</div>
                    <div>
                        {this.tableOfContent(this.state.tableOfContent)}
                    </div>
                </div>
            );

            let backTableBtnProp: React.HTMLProps<HTMLElement> = {
                onClick: () => {
                    this.setState({ isTable: !this.state.isTable });
                }
            };
            let nextChapter: React.HTMLProps<HTMLElement> = {
                disabled: this.state.chapterIndex >= this.state.tableOfContent.length,
                onClick: () => {
                    if (this.currentContent === null) {
                        this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href, false)
                            .then(() => {
                                let chapterMark = this.currentChapter;
                                this.setState(
                                    { bookContent: this.currentContent, isTable: false, chapterIndex: this.currentChapter },
                                    () => this.putChapterMark(chapterMark)
                                        .then(() => this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href, false))
                                );
                            });
                    } else {
                        let chapterMark =this.currentChapter; 
                        this.setState(
                            { bookContent: this.currentContent, isTable: false, chapterIndex: this.currentChapter },
                            () =>this.putChapterMark(chapterMark) 
                            .then(()=>this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href, false))
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
            let chaptermark = this.state.chapterIndex == this.state.tableOfContent.length - 1
                ? this.state.chapterIndex
                : this.state.chapterIndex + 1;
            if (chaptermark == 1 || chaptermark > this.state.tableOfContent.length) {
                return;
            }

            let latestChapterProp: React.HTMLProps<HTMLElement> = {
                onClick: () => {
                    this.getContentFromTable(this.state.tableOfContent[chaptermark].href);
                },
            };
            return (
                <button {...latestChapterProp} >
                    {this.state.tableOfContent[chaptermark].title}
                </button>
            );
        }

        private bookMark(bookMark: { id: string, name: string }[]) {
            let content = bookMark.map(value => {
                let btnProp: React.HTMLProps<HTMLElement> = {
                    onClick: () => {
                        this.setState({bookId:value.id},()=>{
                        this.getChapterList(this.state.bookHost + "/" + value.id + "/")
                            .then(() => this.setState({ bookMark: [] }));
                        });
                    }
                };
                return <span><button {...btnProp}>{value.name}</button></span>;
            });
            return (
                <div>
                    {content}
                </div>
            );
        }


        private bookBuffer = 0;

        private getChapterList(bookUrl:string):JQueryPromise<void>
        {
            let provider = new Abe.Client.dataProvider();
            return provider.getbookTableOfContent(bookUrl)
                .then(c => this.setState({ tableOfContent: c },
                    () => {
                        this.getLatestChapter();
                    }
                ));
        }

        private getContentFromTable(url: string) {
            this.getBookContent([], url, true)
                .then(() => {
                    this.setState(
                        { bookContent: this.currentContent, isTable: false, chapterIndex: this.currentChapter },
                        () => {
                            $("body").scrollTop(0);
                            if (!!this.state.tableOfContent[this.state.chapterIndex + 1]) {
                                this.getBookContent([], this.state.tableOfContent[this.state.chapterIndex + 1].href, false);
                            }
                        }
                    );
                });
        }

        private getLatestChapter() {
            let provider = new Abe.Client.dataProvider();
            provider.getLatestChapertNumber(this.state.bookId)
                .then(v => this.setState({
                    chapterIndex: parseInt(v.toString())
                }));

        }

        private getBookContent(content: any[], url: string, setToCache: boolean): JQueryPromise<void> {
            if (!this.getContentDeferred || !content || content.length === 0) {
                this.getContentDeferred = $.Deferred<void>();
            }

            let provider = new Abe.Client.dataProvider();
            let chapterIndex = this.state.tableOfContent.findIndex(v => v.href === url);
            provider.getbookContent(this.state.bookHost + url, this.state.bookId, setToCache ? chapterIndex : -1)
                .then(c => {
                    if (!content) {
                        content = [];
                    }
                    content = content.concat(c);
                    let index = this.state.tableOfContent.findIndex(v => v.href === url);
                    if (++index < this.state.tableOfContent.length
                        && this.bookBuffer++ < 6) {
                        this.getBookContent(content, this.state.tableOfContent[index].href,setToCache);
                    } else {
                        this.bookBuffer = 0;
                        content.forEach(v => this.replaceGroup().forEach(r => {
                            v.p = v.p.replace(new RegExp(r.s, "gm"), r.t);
                        }));
                        content.push({ p: this.state.tableOfContent[index - 1].title + "完" });
                        this.currentContent = content;
                        this.currentChapter = index - 1;
                        console.log("current chapter is " + this.currentChapter);
                        this.getContentDeferred.resolve();
                    }
                }, () => {
                    this.currentContent = null;
                    this.getContentDeferred.reject();
                });
            return this.getContentDeferred.promise();
        }

        private putChapterMark(chapter:number):JQueryPromise<void>{
            let provider = new Abe.Client.dataProvider();
            return provider.putLastestChapterNumber(this.state.bookId, chapter);
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
                { s: "readx", t: "" },
                { s: "&nbsp;", t: "" },
                { s: "nbsp;", t: "" },
                { s: "[a-z]", t: "" },
                { s: "[A-Z]", t: "" },
                { s: "？", t: "." },
                {s:"\\\?", t:"."},
            ];
        }
    }
}
let sPageProp = {}

ReactDOM.render(<Abe.Client.searchPage {...sPageProp} />, document.getElementById("content-root"));