/// <reference path="./../node_modules/@types/node/index.d.ts"/>
/// <reference path="./../node_modules/@types/cheerio/index.d.ts"/>
/// <reference path="./../node_modules/@types/bluebird/index.d.ts"/>

import * as nConsole from "console";
import * as http from "http";
import * as cheerio from "cheerio";
import * as b from "bluebird";

export module Abe.Service {
    export class WebCrawler {
        public downloadPage(url: string) {
            let defer = b.defer<string>();
            http.get(url,
                (res) => {
                    res.setEncoding("utf-8");
                    return this.getConent(res)
                        .then(message => defer.resolve(message));
                });
            return defer.promise;
        }

        private getConent(response: http.IncomingMessage) {
            let defer = b.defer<string>();
            let message = "";
            response.on("data", (chunk) => {
                message += chunk;
            });
            response.on("end", () => {
                defer.resolve(message);
            });
            return defer.promise;
        }

        public parseContent(html: string) {
            let _$ = cheerio.load(html);
            let contentList = _$("#content");
            return contentList.contents().toArray()
                .filter((elem)=>!_$(elem).is('br'))
                .map((element) => {
                    return { p: _$(element).text().trim() };
            });
        }

        public parsTable(html: string) {
            let _$ = cheerio.load(html);
            let tableList = _$("#list dd").toArray();
            return tableList.map(caption => {
                let aElem = _$(caption).children().first();
                return { href: aElem.attr("href"), title: aElem.text() };
            });
        }
    }
}