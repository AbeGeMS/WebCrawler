/// <reference path=".././../node_modules/@types/jquery/index.d.ts"/>

module Abe.Client {
    export class dataProvider {
        public getbookTableOfContent(bookUrl:string): JQueryPromise<any>{
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

        public getbookContent(bookUrl: string, bookId: string, chapterId: number): JQueryPromise<any>{
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
    }
}