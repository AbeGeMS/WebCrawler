/// <reference path="./../node_modules/@types/node/index.d.ts"/>
/// <reference path="./../node_modules/@types/cheerio/index.d.ts"/>
/// <reference path="./../node_modules/@types/bluebird/index.d.ts"/>

import * as nConsole from "console";
import * as http from "http";
import * as cheerio from "cheerio";
import * as b from "bluebird";

module Abe.Service {

    export class WebCrawler {
        public downloadPage(url: string) {
            let defer = b.defer();
            http.get(url,
                (res) => {
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
                nConsole.log(message);
                defer.resolve(this.parseHTML(message));
            });
            return defer.promise;
        }

        private parseHTML(content: string) {
            var _$ = cheerio.load(content);
            let contentList = _$("h1").toArray();
            return contentList.map(value => _$(value).text()).join("\r\n");
        }
    }
}

var run = new Abe.Service.WebCrawler();
run.downloadPage("http://www.test.com")
    .then(content => nConsole.log(content));