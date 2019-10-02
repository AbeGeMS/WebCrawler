import * as  Promise from "bluebird";
import { BookService } from "../Service/bookService";
import { BookMarkData } from "../lib/typings/dataModel";
import { RedisAgent } from "./redisUtility";
import { reject } from "bluebird";


export class CacheService {
    private _bookService: BookService;
    private _redisAgent: RedisAgent

    public constructor(bookService: BookService, redisClient: RedisAgent) {
        this._redisAgent = redisClient;
        this._bookService = bookService;
    }

    public getBookList(): Promise<BookMarkData[]> {
        try {
            return this._redisAgent.SCAN(0, 20).then(values => {
                let booksPromise = values.map<Promise<BookMarkData>>(
                    v => this._bookService.getTitle(v).then(title => {
                        return { BookId: v, Name: title };
                    }, err => {
                        return { BookId: v, Name: err };
                    })
                );
                return Promise.filter(booksPromise, item => item.Name.trim() != null);
            });
        } catch (error) {
            return reject(`CacheService.getBookList: Failed by ${error}`);
        }
    }

    public getLatestCharpter(bookId: string): Promise<number> {
        try {
            return this._redisAgent.get(bookId)
                .then(charpter => {
                    return parseInt(charpter)
                },
                    err => reject(`CacheService.getLatestCharpter: Faied by ${err}`));
        } catch (ex) {
            return reject(`CacheService.getLatestCharpter: Failed by ${ex}`);
        }
    }

    public setBookMark(bookId: string, charpter: string): Promise<void> {
        let charpterNumber = parseInt(charpter, 10);
        if (charpterNumber >= 0) {
            return this._redisAgent.set(bookId, charpterNumber.toString());
        } else {
            return new Promise((resolve, reject) => {
                reject(`invalid parameter. the @charpter:${charpter} must be a number`)
            });
        }
    }

    public extendExpiry(bookId: string): Promise<boolean> {
        try {

            return this._redisAgent.expiry(bookId)
                .then(() => true,
                    err => reject(`CacheService.extendExpiry: Failed to extend expiry time by ${err}`));
        } catch (ex) {
            return reject(`CacheService.extendExpiry: Failed by ${ex}`);
        }
    }
}