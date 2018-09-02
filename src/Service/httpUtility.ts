import * as https from "https";
import * as Promise from "bluebird";
import {IncomingMessage} from "http";
import { URL } from "url";

export class HttpAgent {

    public get(url:any): Promise<string> {
        let inputUrl = new URL(url);
        let options = {
            hostname: inputUrl.hostname,
            path: inputUrl.pathname,
            method: "GET",
        };
        console.log(`On get.......${options.hostname}${options.path}`);

        return new Promise(
            (resolve, reject) => {
                console.log("start get ....");
                
                https.get(
                    url,
                    res => {
                        console.log("after get ...");
                        
                        res.setEncoding("utf-8");
                        this.getContent(res).then(html => resolve(html), error => reject(error));
                    }
                );
            });
    }

    public post<T>(url: string, body: string): Promise<T> {
        return new Promise<T>(
            (resolve, reject) => {

            }
        );
    }

    private getContent(response:IncomingMessage):Promise<string>{
        let html = "";
        console.log("on getContent ...");
        
        return new Promise(
            (resolve,reject)=>{
                response.on("data",chunk=>html+=chunk);
                response.on("end",()=>resolve(html));
                response.on("err",err=>reject(err));
            }
        );
    }
}