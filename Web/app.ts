/// <reference path="./../node_modules/@types/express/index.d.ts"/>
/// <reference path="./../Service/WebCrawler.ts"/>

import * as express from "express";
import * as __ from "./../Service/WebCrawler";

module Abe.Web {
    export class WebSite {
        public static start() {
            let app = express();
            app.use(express.static("web/public"));
            app.get("/book", (req, res) => {
                WebSite.crawlerBook(res);
            });
            app.post("/tableOfContent", (req, res) => {
                console.log(JSON.stringify(req.body));
                res.json(200, { data: "good" });
            });
            let server = app.listen(3000, () => {
                console.log("server is listen port: %s", server.address().port);
            });
        }

        private static crawlerBook(res: any) {
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.downloadPage("")
                .then(content => {
                    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
                    res.write("<p>" + content + "</p>");
                    res.end();
                })
        }
    }
}

Abe.Web.WebSite.start();
