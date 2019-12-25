import * as express from "express";
import { TitleData } from "../lib/typings/dataModel";
import { CacheService } from "../Service/cacheService";
import { BookService } from "../Service/bookService";
import { HttpAgent } from "../Service/httpUtility";
import { RedisAgent } from "../Service/redisUtility";
import { decodingStr } from "../lib/utility";

const routerName = "bookRouter";
let router = express.Router();

router.get('/latestChapter', (req, res) => {
    let baseUrl = decodingStr(req.cookies && req.cookies.BaseDomain);
    baseUrl =getBookUrl(baseUrl.trim()); 
    let bookId = req.query.id;
    if (!baseUrl || !bookId) {
        res.json(`cacheRouter.latestChapter: invailid parameter ${baseUrl}, ${bookId}`);
        return;
    }

    let cacheService = new CacheService(new BookService(baseUrl, new HttpAgent()), new RedisAgent());
    cacheService.getLatestCharpter(bookId).then(chapter => res.json({ latestChapter: chapter }), err => res.json(err));
});

router.get('/tableOfContent', (req, res) => {
    let result: TitleData[];
    res.json(result);
});

router.get("/books", (req, res) => {
    let baseurl = decodingStr(req.cookies && req.cookies.BaseDomain);
    baseurl =getBookUrl(baseurl.trim()); 
    if (baseurl) {
        let cacheService = new CacheService(new BookService(baseurl, new HttpAgent()), new RedisAgent());
        cacheService.getBookList().then(books => res.json(books), error => res.json(error));
    } else {
        res.json("Couldn't found book Domain in cookie.");
    }
});

router.delete("/bookMark/:id", (req, res) => {
    let bookId = decodingStr(req.params.id);
    console.log(`Delete book ${bookId}`);
});

router.put("/bookMark", (req, res) => {
    let bookId = req.body.id;
    let chapter = req.body.chapter;
    let baseurl = decodingStr(req.cookies && req.cookies.BaseDomain);
    baseurl =getBookUrl(baseurl.trim()); 
    if (baseurl) {
        let cacheService = new CacheService(new BookService(baseurl, new HttpAgent()), new RedisAgent());
        cacheService.setBookMark(bookId, chapter)
            .then(() => cacheService.extendExpiry(bookId));
    } else {
        res.json(`Set book ${bookId} chapter ${chapter} Failed.`);
    }
});

router.put("/backup", (req, res) => {
    let cacheService = new CacheService(new BookService("", new HttpAgent()), new RedisAgent());

    cacheService.getBookList().then(book => {
        console.log(`[${new Date().toLocaleString()}]Back up lib`);
        Promise.all(
            book.map(
                v => cacheService.getLatestCharpter(v.BookId).then(id => {
                    console.log(`{"bookId": "${v.BookId}","charpterIndex": ${id}}`);
                })
            )
        ).then(() => {res.status(200); res.send();}, err => res.json(err));
    });
});

function getBookUrl(bookDomain: string): string{

    return `https://www.${bookDomain}.info`;
}

export = router