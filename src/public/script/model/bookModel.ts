import { ContentData, TitleData } from "../../../lib/typings/dataModel";
import { DataProvider } from "../provider/dataProvider";

export class BookModel {
    constructor() {
        this.provider = new DataProvider();
    }

    private provider: DataProvider;

    public get Provider(): DataProvider { return this.provider }

    public set Provider(provider: DataProvider) {
        this.provider = provider
    };

    private bookId: string | null = null;

    public get BookId(): string | null {
        return this.bookId;
    }

    public set BookId(bookId: string) {
        this.bookId = bookId;
    }

    public getBookContent(bookId: string, chapter: string[]): JQueryPromise<ContentData[]> {
        return $.when(
            ...chapter.map(
                (value, index) => this.provider.getbookContent(bookId, value, index)
            )
        ).then(
            (...contents) => {
                if (contents.length===3 && !contents[1].Title) {
                    let result = [];
                    result.push(contents[0]);
                    return result;
                }
                return contents.map(c=>c[0]);
            },
            err => err
        );
    }

    public getTableOfContents(bookId: string): JQueryPromise<TitleData[]> {
        return this.provider.getbookTableOfContent(bookId);
    }
}
