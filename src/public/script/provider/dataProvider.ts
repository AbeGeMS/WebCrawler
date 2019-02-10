import { ContentData, TitleData, BookMarkData } from "../../../lib/typings/dataModel";
import { encodingStr } from "../../../lib/utility";
const root:string = "debug/";

export class DataProvider {
    public getbookTableOfContent(bookId: string): JQueryPromise<TitleData[]> {
        return $.ajax(
            {
                type: "POST",
                data: JSON.stringify({ "id": bookId }),
                contentType: "application/json",
                url: `${root}tableOfContent`,
                success: data => {
                    return data;
                },
            }
        );
    }

    public getbookContent(bookId: string, chapterId: string, index: number): JQueryPromise<ContentData> {
        return $.ajax(
            {
                type: "POST",
                data: JSON.stringify({ "bookId": bookId, "chapterId": chapterId, "index": index }),
                contentType: "application/json",
                url: `${root}book`,
                success: data => {
                    return data;
                },
            }
        );
    }

    public getLatestChapterNumber(bookId: string): JQueryPromise<number> {
        return $.ajax(
            {
                type: "GET",
                url: `${root}latestChapter?id=${bookId}`,
                success: chapterNumber => chapterNumber.latestChapter,
            }
        );
    }

    public putLastestChapterNumber(bookId: string, chapterId: number): JQueryPromise<void> {
        return $.ajax({
            type: "GET",
            url: `${root}putChapter?id=${bookId}&chapter=${chapterId}`,
        });
    }

    public putBookDomain(bookDomain: string): JQueryPromise<boolean> {
        return $.ajax({
            type: "PUT",
            url: `${root}BookDomain/${encodingStr(bookDomain)}`,
            success: () => true,
            error: err => false,
        });
    }

    public getBookMarks(): JQueryPromise<BookMarkData[]> {
        return $.ajax({
            type: "GET",
            url: `${root}books`,
        });
    }

    public deleteBookMark(bookId: string): JQueryPromise<boolean> {
        return $.ajax({
            type: "DELETE",
            url: `${root}bookMark/${bookId}`,
        });
    }
}