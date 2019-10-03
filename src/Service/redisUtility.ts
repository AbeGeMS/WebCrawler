import * as  Promise from "bluebird";
import { createClient, RedisClient } from "redis";

const redisPort: number = 6380;
const redisAddress: string = "myBookmark.redis.cache.windows.net";
const redisPassword: string = "";
const expiryTimeSpan = 1296000;
var Redis_Client: RedisClient;

export class RedisAgent {

    public SCAN(start: number, count: number): Promise<string[]> {

        return new Promise((resolve, reject) => {
            try {
                this.Client.scan(start.toString(), 'COUNT', count.toString(), (err, reply) => {
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
                this.Client.get(key, (err, value) => {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    resolve(value);
                });
            } catch (ex) {
                console.log(`RedisAgent.get unexpected exception by ${ex}`);
                reject(`RedisAgent.get:Failed by ${ex}`);
            }
        });
    }

    public set(key: string, value: string): Promise<void> {

        return new Promise((resolve, reject) => {
            try {
                this.Client.set(key, value, (err, reply) => {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    resolve();
                })
            } catch (ex) {
                console.log(`RedisAgent.set unexpected exception by ${ex}`);
                reject(`RedisAgent.set: Failed by ${ex}`);
            }
        });
    }

    public expiry(key: string): Promise<void> {

        return new Promise((resolve, reject) => {
            try {
                this.Client.expire(key, expiryTimeSpan, (err, reply) => {
                    if (!!err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            } catch (ex) {
                console.log(`RedisAgent.expiry unexpected exception by ${ex}`);
                reject(`RedisAgent.expiry: Faied by ${ex}`);
            }
        }

        );
    }

    private get Client(): RedisClient {
        try {
            if(Redis_Client){
                return Redis_Client;
            }

            let redisClient = createClient(redisPort, redisAddress, {
                auth_pass: redisPassword,
                tls: {
                    servername: redisAddress,
                },
            });
            redisClient.on("error",
                err => console.log(`RedisAgent.createRedisClient unexpected exception by ${err}`)
            );

            Redis_Client = redisClient;
            console.error(`new redis client`);
            return redisClient;
        } catch (ex) {
            console.log(`RedisAgent.createRedisClient unexpected exception by ${ex}`);
            return null;
        }
    }

}