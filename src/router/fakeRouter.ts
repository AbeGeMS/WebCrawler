
import * as express from "express";
import bodyParser = require("body-parser");
import { decodingStr } from "../lib/utility";
import * as cookieParser from "cookie-parser";
import { TitleData, BookMarkData, ContentData } from "../lib/typings/dataModel";

let router = express.Router();

router.get('/latestChapter', (req,res) => {
    res.json(2);
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

router.put("/bookMark",()=>{
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

export = router
