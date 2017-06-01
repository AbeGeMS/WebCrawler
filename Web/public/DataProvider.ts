/// <reference path=".././../node_modules/@types/jquery/index.d.ts"/>

module Abe.Client {
    export class dataProvider {
        public getbookTableOfContent(): JQueryPromise<any>{
            return $.ajax(
                {
                    type: "POST",
                    data: JSON.stringify({ "name": "Abe Ge"}),
                    contentType: "application/json",
                    url: "tableOfContent",
                    success: data => {
                        alert(JSON.stringify(data));
                    },
                }
            );
        }
    }
}

var test = new Abe.Client.dataProvider();
test.getbookTableOfContent();