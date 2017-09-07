/// <reference path="./../node_modules/@types/express/index.d.ts"/>
/// <reference path="./../node_modules/@types/body-parser/index.d.ts"/>
/// <reference path="./../Service/WebCrawler.ts"/>

import * as express from "express";
import * as __ from "./../Service/WebCrawler";
import * as bodyParser from "body-parser";

module Abe.Web {
    export class WebSite {
        public static start() {
            let app = express();
            app.use(express.static("public"));
            app.use(bodyParser());
            app.post("/book", (req, res) => {
                WebSite.crawlerContent(req.body.url, req.body.bookId, req.body.chapterId)
                    .then(bookContent => {
                        res.json(200, bookContent);
                    });
            });
            app.post("/tableOfContent", (req, res) => {
                WebSite.crawlerTableOfContent(req.body.url)
                    .then(tableOfContentArray => {
                        res.json(200, tableOfContentArray);
                    });
            });
            app.get("/latestChapter", (req, res) => {
                let latestChapter = WebSite.getCrawlerLateastChapter(req.query.id);
                res.send(200, latestChapter);
            });

            let server = app.listen(3000, () => {
                console.log("server is listen port: %s", server.address().port);
            });
        }

        private static crawlerTableOfContent(bookUrl: string) {
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.downloadPage(bookUrl)
                .then(html => {
                    return webCrawler.parsTable(html);
                });
        }

        private static crawlerContent(bookurl: string, bookId: string, chapter: number) {
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.downloadPage(bookurl)
                .then(html => {
                    webCrawler.putLatestChapterNumber(bookId, chapter);
                    let result = webCrawler.parseContent(html);
                    return result;
                });
        }

        private static getCrawlerLateastChapter(bookId: string) {
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.getLatestChapterNumber(bookId);
        }
    }
}

Abe.Web.WebSite.start();
