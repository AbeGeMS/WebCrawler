import * as https from "https";
import * as Promise from "bluebird";
import { IncomingMessage } from "http";
import { gunzip } from "zlib";

export class HttpAgent {

    public get(url: any): Promise<string> {
        return new Promise(
            (resolve, reject) => {
                try {
                    https.get(
                        url,
                        res => {
                            res.setEncoding("utf-8");
                            this.getContent(res).then(html => {
                                if (res.headers["content-encoding"] == "gzip") {
                                    gunzip(html, (err, data) => {
                                        resolve(data.toString("utf-8", 0, data.length));
                                    });
                                } else {
                                    resolve(html);
                                }
                            },
                                error => reject(error));
                        }
                    ).on("error", err => {
                        reject(err);
                    });
                } catch (ex) {
                    reject(`HttpAgent.get throw exception ${ex}`);
                }
            });
    }

    public post<T>(url: string, body: string): Promise<T> {
        return new Promise<T>(
            (resolve, reject) => {

            }
        );
    }

    private getContent(response: IncomingMessage): Promise<string> {
        let html = "";
        return new Promise(
            (resolve, reject) => {
                response.on("data", chunk => html += chunk);
                response.on("end", () => resolve(html));
                response.on("err", err => reject(err));
            }
        );
    }
}