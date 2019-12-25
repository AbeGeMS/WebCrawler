import { ContentData, TitleData, BookMarkData } from "../../../lib/typings/dataModel";
import { encodingStr } from "../../../lib/utility";
const root: string = "debug/";

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
        ).then(data=>data);
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
        ).then(data=>data);
    }

    public getLatestChapterNumber(bookId: string): JQueryPromise<number> {
        return $.ajax(
            {
                type: "GET",
                url: `${root}latestChapter?id=${bookId}`,
                success: chapterNumber => chapterNumber.latestChapter,
            }
        ).then(data => data.latestChapter);
    }

    public putLastestChapterNumber(bookId: string, chapterId: number): JQueryPromise<void> {
        return $.ajax({
            type: "PUT",
            url: `${root}bookMark?id=${bookId}&chapter=${chapterId}`,
            data: { id: bookId, chapter: chapterId },
        }).then(data=>data);
    }

    public putBookDomain(bookDomain: string): JQueryPromise<boolean> {
        return $.ajax({
            type: "PUT",
            url: `${root}BookDomain/${encodingStr(bookDomain)}`,
            success: () => true,
            error: err => false,
        }).then(data => true, (jqr, status, error) => false);
    }

    public getBookMarks(): JQueryPromise<BookMarkData[]> {
        return $.ajax({
            type: "GET",
            url: `${root}books`,
        }).then(data=>data);
    }

    public deleteBookMark(bookId: string): JQueryPromise<boolean> {
        return $.ajax({
            type: "DELETE",
            url: `${root}bookMark/${bookId}`,
        }).then(data=>data);
    }

    public backUp():JQueryPromise<boolean>{
        return $.ajax({
            type:"PUT",
            url:`${root}backup`,
            success: () => true,
            error: err => false,
        }).then(data => true, (jqr, status, error) => false);
    }
}