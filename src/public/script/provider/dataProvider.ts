import { ContantData, TitleData, BookMarkData } from "../../../lib/typings/dataModel";

export class DataProvider{
    public getSayHi(name: string): JQueryPromise<string> {
        return $.ajax({
            "method":"GET",
            "url":`hi?id=${name}`,
            success:msg=> msg as string,
            error:e=>`Service error ${JSON.stringify(e)}`,
        });
    }

    public getbookTableOfContent(bookUrl:string): JQueryPromise<TitleData[]>{
        return $.ajax(
            {
                type: "POST",
                data: JSON.stringify({ "url": bookUrl }),
                contentType: "application/json",
                url: "tableOfContent",
                success: data => {
                    return data;
                },
            }
        );
    }

    public getbookContent(bookUrl: string, bookId: string, chapterId: number): JQueryPromise<ContantData>{
        return $.ajax(
            {
                type: "POST",
                data: JSON.stringify({ "url": bookUrl, "bookId": bookId, "chapterId": chapterId }),
                contentType: "application/json",
                url: "book",
                success: data => {
                    return data;
                },
            }
        );
    }

    public getLatestChapertNumber(bookId: string): JQueryPromise<number>{
        return $.ajax(
            {
                type: "GET",
                url: "latestChapter?id=" + bookId,
                success: chapterNumber => chapterNumber,
            }
        );
    }

    public putLastestChapterNumber(bookId:string,chapterId:number):JQueryPromise<void>{
        return $.ajax({
            type:"GET",
            url: "putChapter?id=" + bookId + "&chapter=" + chapterId,
        });
    }

    public putBookDomain(bookDomain: string): JQueryPromise<boolean> {
        return $.ajax({
            type: "PUT",
            url: "BookDomain/" + encodeURIComponent(bookDomain).replace(/'/g,"%27").replace(/"/g,"%22"),
            success: () => true,
            error: err => false,
        });
    }

    public getBookMark(rootUrl:string):JQueryPromise<BookMarkData[]>{
        return $.ajax({
            type:"GET",
            url: "bookMark?id=" + encodeURIComponent(rootUrl),
        });
    }

    public deleteBookMark(bookId:string):JQueryPromise<boolean>{
        return $.ajax({
            type:"DELETE",
            url:`bookMark\\${bookId}`,
        });
    }
}