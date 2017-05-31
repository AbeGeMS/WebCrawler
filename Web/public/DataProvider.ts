/// <reference path=".././../node_modules/@types/jquery/index.d.ts"/>

module Abe.Client {
    export class dataProvider {
        public getbookTableOfContent(): JQueryPromise<any>{
            return $.post("localhost:3000/tableOfContent", { url: "http://www.xxbiquge.com" },
                (data, state) => { return { "data": data, "state": state } });
        }
    }
}