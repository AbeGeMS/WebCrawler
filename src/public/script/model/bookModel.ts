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

    private bookDomain: string | null = null;

    public get BookDomain(): string | null {
        return this.bookDomain;
    };

    public set BookDomain(bookDomain: string) {
        this.bookDomain = bookDomain.trim().endsWith("/") ?
            bookDomain.trim() :
            `${bookDomain.trim()}/`;
    }

    private bookId: string | null = null;

    public get BookId(): string | null {
        return this.bookId;
    }

    public set BookId(bookId: string) {
        this.bookId = bookId;
    }

    public getServerMessage(): JQueryPromise<string> {
        return this.provider.getSayHi("Sample man")
            .then(msg => `server said:
            ${msg}`);
    }

    public getBookContent(domain: string, bookId: string, latestBook: number): JQueryPromise<ContantData> {
        return this.provider.getbookContent(this.bookDomain, this.bookId, latestBook)
            .then(
                value => value
            );
    }

    public setBookDomain(domain:string):JQueryPromise<string>{
        this.bookDomain = domain;
        return this.provider.putBookDomain(domain).then(
            value=>`document.cookie.BaseDomain is ${JSON.stringify(document.cookie)}`,
            error=>`set ${domain} Failed`,
        );
    }
}