/// <reference path="./../node_modules/@types/express/index.d.ts"/>
/// <reference path="./../Service/WebCrawler.ts"/>

import * as express from "express";
import * as __ from "./../Service/WebCrawler";

module Abe.Web {
    export class WebSite {
        public static start() {
            let app = express();
            let router = express.Router();
            //router.use("/", require("./Controller"));
            app.get("/book", router);
            app.get("/", (req, res) => {
                WebSite.crawlerBook(res);
            });
            let server = app.listen(3000, () => {
                console.log("server is listen port: %s", server.address().port);
            });
        }

        private static crawlerBook(res: any) {
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.downloadPage("http://www.websiteyouwanttoget.com")
                .then(content => {
                    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
                    res.write("<p>" + content + "</p>");
                    res.end();
                })
        }
    }
}

Abe.Web.WebSite.start();
