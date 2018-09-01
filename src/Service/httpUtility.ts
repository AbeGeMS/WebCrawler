import * as Promise from "bluebird";

export class HttpAgent {

    public get(url: string): Promise<string> {
        return new Promise<string>(
            (resolve, reject) => {

            }
        );
    }

    public post<T>(url: string, body: string): Promise<T> {
        return new Promise<T>(
            (resolve, reject) => {

            }
        );
    }
}