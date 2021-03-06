﻿/// <reference path="./../node_modules/@types/node/index.d.ts"/>
/// <reference path="./../node_modules/@types/cheerio/index.d.ts"/>
/// <reference path="./../node_modules/@types/bluebird/index.d.ts"/>
/// <reference path="./../node_modules/@types/redis/index.d.ts"/>

import * as http from "http";
import * as https from "https";
import * as cheerio from "cheerio";
import * as b from "bluebird";
import * as redis from "redis";

export module Abe.Service {
    export class WebCrawler {
        public downloadPage(url: any) {
            let defer = b.defer<string>();
            https.get(url,
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
            response.on("errr", err => { console.log(err) });
            return defer.promise;
        }

        private redisClient:redis.RedisClient = redis.createClient(6380,'myBookmark.redis.cache.windows.net',{
            auth_pass:'fake redis auth key',
            tls:{
                servername:'myBookmark.redis.cache.windows.net'
            },
        });

        public getLatestChapterNumber(bookId: string){
            let defer = b.defer<string>();
            if(bookId==null)
            {
                console.log("[err] latestChapter.latestChapter parameter incorrect");
            }
            
            this.redisClient.get(bookId, (err, value) => {
                if (!value) {
                    this.redisClient.set(bookId, "0",(err,value)=>{
                        console.log('[info] set initial chapter 0, status is' + value);
                    });
                    defer.resolve("0");
                } else {
                    console.log("[log] bookId " + bookId + " last charpter " + value);
                    defer.resolve(value);
                }
            });
            return defer.promise;
        }

        public putLatestChapterNumber(bookId: string, chapter: string) {
            let defer = b.defer<string>();
            this.redisClient.get(bookId,(err,value)=>{
                if (parseInt(chapter) > parseInt(value)) {
                    this.redisClient.set(bookId, chapter.toString(),(err,value)=>{
                        defer.resolve(value);
                        console.log("[log] set chapter success");
                    });
                } else {
                    defer.reject("small chapter,input "+ chapter + "latest " + value);
                }
            });
            return defer.promise;
        }

        public deleteCache(key:string){
            let defer = b.defer<string>();
            this.redisClient.DEL(key,(err,value)=>defer.resolve(value.toString()));
            return defer.promise;
        }

        public getBookList(rootUrl:string){
            let defer = b.defer<{id:string,name:string}[]>();
            this.redisClient.scan('0','COUNT','20',(err, reply)=>{
                if(!!err){
                    defer.reject("scan resdis failed");
                    console.log("WebCrawler.getBookList: scan redis Error is " + err);
                }
                if(reply.length==2){
                    let queue=[];
                    let bookIds = reply[1];
                    bookIds.forEach(v => 
                        queue.push(
                            this.downloadPage(rootUrl + "/" + v + "/")
                            .then(html=> {
                                let title = this.parsTile(html);
                                console.log(`get id ${v}, name ${title}`);
                                return {id:v,name:title};
                            })
                        )
                    );
                    b.all(queue).then(values=>{
                        defer.resolve(values.filter(v=>v.name!=""));});
                }
            });
            return defer.promise;
        }

        public parseContent(html: string) {
            let _$ = cheerio.load(html);
            let contentList = _$("#content");
            let result = contentList.contents().toArray()
                .filter((elem)=>!_$(elem).is('br'))
                .map((element) => {
                    return { p: _$(element).text().trim() };
                });
            return result;
        }

        public parsTable(html: string) {
            let _$ = cheerio.load(html);
            let tableList = _$("#list dd").toArray();
            return tableList.map(caption => {
                let aElem = _$(caption).children().first();
                return { href: aElem.attr("href"), title: aElem.text() };
            });
        }

        public parsTile(html:string){
            let _$ = cheerio.load(html);
            return _$("#info h1").text();
        }
    }
}