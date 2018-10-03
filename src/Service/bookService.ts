import * as cheerio from "cheerio";
import * as Promise from "bluebird";
import { HttpAgent } from "./httpUtility";
import { ContentData, TitleData } from "../lib/typings/dataModel";

export class BookService {
    constructor(bookDomain: string, agent: HttpAgent) {
        this._http = agent;
        this.bookDomain = bookDomain;
    }

    private readonly _http: HttpAgent;
    private readonly bookDomain: string;

    public getContent(bookId: string, chapterId: string)
        : Promise<ContentData> {
        try {
            let url = `${this.bookDomain}${bookId}/${chapterId}/`;

            return this._http.get(url).then(
                html => this.parseContent(html));
        } catch (ex) {
            return new Promise((resolve, reject) => {
                reject(JSON.stringify(ex));
            });
        }
    }

    public getTableOfContent(bookId: string): Promise<TitleData[]> {
        try {
            let url = `${this.bookDomain}${bookId}/`;

            return this._http.get(url)
                .then(html => {
                    let _$ = cheerio.load(html);
                    let tableList = _$("#list dd").toArray();
                    return tableList.map(caption => {
                        let aElem = _$(caption).children().first();
                        return { Href: aElem.attr("href"), Title: aElem.text() };
                    });
                });
        } catch (ex) {
            return new Promise((resolve, reject) => reject(JSON.stringify(ex)));
        }

    }

    public getTitle(bookId: string): Promise<string> {
        try {
            let url = `${this.bookDomain}${bookId}/`;
            return this._http.get(url).then(html => {
                return this.parsTile(html);
            }, err => { return JSON.stringify(err) });
        } catch (ex) {
            return new Promise((resolve, reject) => reject(JSON.stringify(ex)));
        }
    }

    private parseContent(html: string): ContentData {
        let _$ = cheerio.load(html);
        let contentList = _$("#content");
        let title = this.parsTile(html);
        let content = contentList.contents().toArray()
            .filter((elem) => !_$(elem).is('br') && _$(elem).text().trim() !== "")
            .map((element) => {
                return _$(element).text().trim();
            });
        console.log(`title:${title} content:${content.length}`);

        return { Title: title, Content: content };
    }

    private parsTile(html: string): string {
        let _$ = cheerio.load(html);
        return _$("#info h1").text().trim().replace(/\n/g, '');
    }
}