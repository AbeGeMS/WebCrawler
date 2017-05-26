/// <reference path="./../node_modules/@types/express/index.d.ts"/>

import * as express from "express";

module Abe.Web {
    export class WebSite {
        public static start() {
            let app = express();
            app.get("/", (req, res) => {
                res.send("This is Abe's express website!");
            });
            let server = app.listen(3000, () => {
                console.log("server is listen port: %s", server.address().port);
            });
        }
    }
}

Abe.Web.WebSite.start();
