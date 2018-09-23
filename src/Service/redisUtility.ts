import * as  Promise from "bluebird";
import { RedisClient, createClient } from "redis";

const redisPort: number = 6380;
const redisAddress: string = "myBookmark.redis.cache.windows.net";

export class RedisAgent {
    private _client = createClient(redisPort, redisAddress, {
        auth_pass: "",
        tls: {
            servername: redisAddress,
        },
    });

    public SCAN(start: number, count: number): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this._client.scan(start.toString(), 'COUNT', count.toString(), (err, reply) => {
                if (!!err) {
                    reject("scan resdis failed");
                    console.log("WebCrawler.getBookList: scan redis Error is " + err);
                    return;
                }

                if (reply.length != 2) {
                    reject(`invalid book list in redis ${JSON.stringify(reply)}`);
                    return;
                };
                resolve(reply[1]);
            });
        });
    }

}