import * as  Promise from "bluebird";
import { BookService } from "../Service/bookService";
import { BookMarkData } from "../lib/dataModel";
import { RedisAgent } from "./redisUtility";


export class CacheService {
    private _bookService: BookService;
    private _redisAgent: RedisAgent

    public constructor(bookService: BookService, redisClient: RedisAgent) {
        this._redisAgent = redisClient;
        this._bookService = bookService;
    }

    public getBookList(): Promise<BookMarkData[]> {
        return new Promise((resolve, reject) => {
            try {
                this._redisAgent.SCAN(0, 20).then(values => {
                    let booksPromise = values.map<Promise<BookMarkData>>(
                        v=>this._bookService.getTitle(v).then(title=>{
                          return {BookId:v,Name:title};  
                        })
                    );
                    resolve(Promise.filter(booksPromise, item => item.Name.trim() != null));
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}