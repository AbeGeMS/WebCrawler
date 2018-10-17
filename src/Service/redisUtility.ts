import * as  Promise from "bluebird";
import { createClient, RedisClient } from "redis";

const redisPort: number = 6380;
const redisAddress: string = "myBookmark.redis.cache.windows.net";

export class RedisAgent {
    private _client = this.createRedisClient();

    public SCAN(start: number, count: number): Promise<string[]> {

        return new Promise((resolve, reject) => {
            try {
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
            } catch (ex) {
                console.log(`RedisAgent.SCAN unexpected exception by ${ex}`);
                return reject(`RedisAgent.SCAN:Failed by ${ex}`);
            }
        });
    }

    public get(key: string): Promise<string> {

        return new Promise((resolve, reject) => {
            try {
                this._client.get(key, (err, value) => {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    resolve(value);
                });
            } catch (ex) {
                console.log(`RedisAgent.get unexpected exeption by ${ex}`);
                reject(`redisAgent.get:Failed by ${ex}`);
            }
        });
    }

    private createRedisClient(): RedisClient {
        try {
            if (this._client) {
                return this._client;
            }

            let redisClient = createClient(redisPort, redisAddress, {
                auth_pass: redisPassword,
                tls: {
                    servername: redisAddress,
                },
            });
            redisClient.on("error",
            err=>console.log(`RedisAgent.createRedisClient unexpected exception by ${err}`)
            );

            return redisClient;
        } catch (ex) {
            console.log(`RedisAgent.createRedisClient unexpected exception by ${ex}`);
            return null;
        }
    }

}