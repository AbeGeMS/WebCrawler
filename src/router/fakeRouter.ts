
import * as express from "express";
import bodyParser = require("body-parser");
import { decodingStr } from "../lib/utility";
import * as cookieParser from "cookie-parser";
import { TitleData, BookMarkData, ContentData } from "../lib/typings/dataModel";
import { reject, resolve, any } from "bluebird";
import { BookLib } from "../public/script/view/bookLib";
import { number } from "prop-types";

let router = express.Router();

router.get('/latestChapter', (req,res) => {
    res.json(1);
});

router.get('/tableOfContent', (req,res) => {
        let result:TitleData[] = [
            {Href:"fakeHref",Title:"Fake"},
            {Href:"MockHref",Title:"Mock"}
        ];
        res.json(result); 
});

router.get("/books", (req, res) => {
    let result: BookMarkData[] = [{
        Name: "book001",
        BookId: "001"
    }, {
        Name: "book002",
        BookId: "002",
    }];

    res.json(result);
});

router.delete("/bookMark/:id", () => {
});

router.put("/bookMark",(req,res)=>{
    res.status(200);
    res.send();
});

router.use(bodyParser());
router.unsubscribe(cookieParser());

router.post('/book', (req, res) => {
    let result :ContentData={Index:1,
        Title:"charpter001",
        Content:["this is first","This is second"]};
    res.json(result); 
});

router.post('/tableOfContent', (req, res) => {
    let result: TitleData[] = [
        { Href: "fakeHref", Title: "Fake" },
        { Href: "MockHref", Title: "Mock" }
    ];
    res.json(result);
});

router.put("/BookDomain/:id", (req, res) => {
    let bookid = decodingStr(req.params["id"]);
    if (bookid) {
        res.cookie("BaseDomain", bookid, {
            maxAge: 86400 * 1000,
        });
        res.send(bookid);
    } else {
        res.status(500);
    }
});

router.put("/backup", (req, res) => {
    let cacheService = {
        getBookList: ()=>new Promise<BookMarkData[]>((resolve,reject)=>{
            let books: BookMarkData[] = [{ BookId: "1", Name: "001" }, { BookId: "2", Name: "002" }];
            resolve(books);
        }),
        getLatestCharpter: v => new Promise<number>((resolve, reject) => {
            resolve(v+1);
        }),
    };

    cacheService.getBookList().then(book => {
        let pp = book.map(
            v => cacheService.getLatestCharpter(v.BookId).then(id => {
                console.log(`{"bookId": "${v.BookId}","charpterIndex": ${id}}`);
            })
        );

        Promise.all(pp).then(()=>{res.status(200);res.send();});
    });
});


export = router
