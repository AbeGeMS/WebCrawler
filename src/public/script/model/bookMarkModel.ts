import { DataProvider } from "../provider/dataProvider";
import { BookMarkData } from "../../../lib/typings/dataModel";

export class BookMark {

    private provider: DataProvider;

    public constructor() {
        this.provider = new DataProvider();
    }

    public set Provider(provider: DataProvider) {
        this.provider = provider;
    }

    public deleteBook(bookId: string): JQueryPromise<string> {
        return this.provider.deleteBookMark(bookId)
            .then(value => {
                if (value) {
                    return `${bookId} was deleted`;
                } else {
                    return `${bookId} wasn't deleted`;
                }
            }, err => {
                return `failed to delete ${JSON.stringify(err)}`;
            });
    }

    public getBooks(): JQueryPromise<BookMarkData[]> {
        return this.provider.getBookMarks()
            .then(b => b.filter(v => v.BookId.trim() !== "" || v.Name.trim() !== ""));
    }

    public getLatestChapter(bookId: string): JQueryPromise<number> {
        return this.provider.getLatestChapterNumber(bookId);
    }
}