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
            app.get("/book", (req, res) => {
                //WebSite.crawlerBook(res);
            });
            app.post("/tableOfContent", (req, res) => {
                console.log(req.body.url);
                WebSite.crawlerTableOfContent(req.body.url)
                    .then(tableOfContentArray => {
                        res.json(200, tableOfContentArray);
                    });
            });
            let server = app.listen(3000, () => {
                console.log("server is listen port: %s", server.address().port);
            });
        }

        private static crawlerTableOfContent(bookUrl: string) {
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.downloadPage(bookUrl)
                .then(html => webCrawler.parsTable(html));
                //    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
                //    res.write("<p>" + content + "</p>");
                //    res.end();
                //})
        }
    }
}

Abe.Web.WebSite.start();
