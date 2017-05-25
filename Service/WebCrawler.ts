/// <reference path="./../node_modules/@types/node/index.d.ts"/>
/// <reference path="./../node_modules/@types/cheerio/index.d.ts"/>

import * as nConsole from "console";
import * as http from "http";
import * as cheerio from "cheerio";

module Abe.Service {

    export class WebCrawler {
        public downloadPage() {
            http.get("http://www.baidu.com/", (res) => { this.getConent(res); });
        }

        private getConent(response: http.IncomingMessage) {
            let message = "";
            response.on("data", (chunk) => {
                message += chunk;
            });
            response.on("end", () => {
                nConsole.log(message);
                this.parseHTML(message);
            });
        }

        private parseHTML(content: string) {
            var _$ = cheerio.load(content);
            let contentList = _$("h1").toArray();
            nConsole.log(contentList.map(value => _$(value).text()).join("\r\n"));
        }
    }
}

var run = new Abe.Service.WebCrawler();
run.downloadPage();