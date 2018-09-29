import { DataProvider } from "../provider/dataProvider";
import { ContantData } from "../../../lib/typings/dataModel";

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

    public getBookContent(domain: string, bookId: string, latestBook: number): JQueryPromise<ContantData> {
        return this.provider.getbookContent(this.bookId, latestBook)
            .then(
                value => value
            );
    }

    }