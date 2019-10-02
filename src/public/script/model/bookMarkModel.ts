import { DataProvider } from "../provider/dataProvider";
import { BookMarkData } from "../../../lib/typings/dataModel";

export class BookMark {

    private provider: DataProvider;

    public constructor(provider?: DataProvider) {

        if (!!provider) {
            this.provider = provider;
        } else {
            this.provider = new DataProvider();
        }
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

    public setLatestCharpter(bookId: string, charpter: string): JQueryPromise<void> {
        let charpterNumber = parseInt(charpter, 0);

        if (!Number.isInteger(charpterNumber)) {
            let result = $.Deferred<void>();
            result.reject(`Invalid parameter. @charpter: ${charpter} should be a number`);
            return result.promise();
        }

        return this.provider.getLatestChapterNumber(bookId)
            .then(v => {
                if (v < charpterNumber) {
                    this.provider.putLastestChapterNumber(bookId, charpterNumber);
                }
            });
    } 
}