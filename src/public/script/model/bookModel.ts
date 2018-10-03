import { DataProvider } from "../provider/dataProvider";
import { ContentData, TitleData } from "../../../lib/typings/dataModel";

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

    public getBookContent(bookId: string,chapter: number): JQueryPromise<ContentData> {
        return this.provider.getbookContent(bookId,chapter);
    }

    public getTableOfContents(bookId: string): JQueryPromise<TitleData[]> {
        return this.provider.getbookTableOfContent(bookId);
    }
}
