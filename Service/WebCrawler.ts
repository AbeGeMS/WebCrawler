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
            let defer = b.defer();
            http.get(url,
                (res) => {
                    res.setEncoding("utf-8");
                    return this.getConent(res)
                        .then(message => defer.resolve(message));
                });
            return defer.promise;
        }

        private getConent(response: http.IncomingMessage) {
            let defer = b.defer();
            let message = "";
            response.on("data", (chunk) => {
                message += chunk;
            });
            response.on("end", () => {
                defer.resolve(this.parseHTML(message));
            });
            return defer.promise;
        }

        private parseHTML(content: string) {
            var _$ = cheerio.load(content);
            let contentList = _$("#content").toArray();
            return contentList.map(value => _$(value).html()).join("\r\n");
        }
    }
}