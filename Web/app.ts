/// <reference path="./../node_modules/@types/express/index.d.ts"/>
/// <reference path="./../node_modules/@types/body-parser/index.d.ts"/>
/// <reference path="./../Service/WebCrawler.ts"/>

import * as express from "express";
import * as __ from "./../Service/WebCrawler";
import * as bodyParser from "body-parser";
import * as path from "path";

module Abe.Web {
    export class WebSite {
        public static start() {
            let app = express();
            app.use(express.static(path.join(__dirname, "public")));
            app.use(bodyParser());
            app.post("/book", (req, res) => {
                WebSite.crawlerContent(req.body.url, req.body.bookId, req.body.chapterId)
                    .then(bookContent => {
                        res.json(bookContent);
                    });
            });
            app.post("/tableOfContent", (req, res) => {
                WebSite.crawlerTableOfContent(req.body.url)
                    .then(tableOfContentArray => {
                        res.json(tableOfContentArray);
                    });
            });
            app.get("/latestChapter", (req, res) => {
                WebSite.getCrawlerLateastChapter(req.query.id)
                .then(latestChapter=>{
                    console.log('[log] latestChapter is ' + parseInt(latestChapter));
                    res.send(latestChapter);
                });
            });
            app.get("/putChapter",(req,res)=>{
                WebSite.putCrawlerLateastChapter(req.query.id,req.query.chapter)
                .then(value=>{
                    res.send(value);
                });
            })
            app.get("/delCache",(req,res)=>{
                WebSite.delCache(req.query.id)
                .then(value=>res.send(value));
            });
            app.get("/books",(req,res)=>{
                console.log(req.query.id);
                WebSite.getBookList(req.query.id)
                .then(v=>res.send(v));
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
                    webCrawler.putLatestChapterNumber(bookId, chapter.toString());
                    let result = webCrawler.parseContent(html);
                    return result;
                });
        }

        private static getCrawlerLateastChapter(bookId: string) {
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.getLatestChapterNumber(bookId);
        }

        private static putCrawlerLateastChapter(bookId:string, chapterNum:string){
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.putLatestChapterNumber(bookId,chapterNum);
        }

        private static delCache(key:string){
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.deleteCache(key);
        }

        private static getBookList(rootUrl:string){
            let webCrawler = new __.Abe.Service.WebCrawler();
            return webCrawler.getBookList(rootUrl);
        }
    }
}

Abe.Web.WebSite.start();
