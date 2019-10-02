import { ContentData, TitleData } from "../../../lib/typings/dataModel";
import { DataProvider } from "../provider/dataProvider";
import { BookMark } from "./bookMarkModel";

export class BookModel {
    constructor() {
        this.provider = new DataProvider();
        this.bookMark = new BookMark(this.provider);
    }

    private bookMark: BookMark;
    private provider: DataProvider;

    public get Provider(): DataProvider { return this.provider }

    public set Provider(provider: DataProvider) {
        this.provider = provider
    };

    private bookId: string | null = null;

    private tableOfContent: string[] = [];

    public set TableOfContent(tableOfContent: string[]) { this.tableOfContent = tableOfContent };

    public get TableOfContent(): string[] { return this.tableOfContent };

    public get BookId(): string | null {
        return this.bookId;
    }

    public set BookId(bookId: string) {
        this.bookId = bookId;
    }

    public getBookContent(bookId: string, chapter: string): JQueryPromise<ContentData[]> {
        let charpters = this.downloadCharpters(chapter);
        return $.when(
            ...charpters.map(
                (value, index) => this.provider.getbookContent(bookId, value, index)
            )
        ).then(
            (...contents) => {
                if (contents.length === 3 && !contents[1].Title) {
                    let result = [];
                    result.push(contents[0]);
                    return result;
                }
                return contents.map(c => c[0]);
            },
            err => err
        ).then(Content => {
            let latestCharpterIndex = this.tableOfContent.indexOf(chapter) + charpters.length;
            this.bookMark.setLatestCharpter(bookId, latestCharpterIndex.toString());
            return Content;
        });
    }

    public getTableOfContents(bookId: string): JQueryPromise<TitleData[]> {
        return this.provider.getbookTableOfContent(bookId);
    }

    private downloadCharpters(startChapter: string): string[] {
        let index = this.tableOfContent.indexOf(startChapter);
        return this.tableOfContent.slice(index, index + 5);
    }
}
