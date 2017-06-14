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

        public getbookContent(bookUrl:string): JQueryPromise<any>{
            return $.ajax(
                {
                    type: "POST",
                    data: JSON.stringify({ "url": bookUrl }),
                    contentType: "application/json",
                    url: "book",
                    success: data => {
                        return data;
                    },
                }
            );
        }
    }
}