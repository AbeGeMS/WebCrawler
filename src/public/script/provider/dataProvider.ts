import { ContantData, TitleData } from "../../../lib/dataModel";

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

    public getBookMark(rootUrl:string):JQueryPromise<{id:string,name:string}[]>{
        return $.ajax({
            type:"GET",
            url: "books?id=" + encodeURIComponent(rootUrl),
        })
    }
}