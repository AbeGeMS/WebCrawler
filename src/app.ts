import * as express from "express";
import * as path from "path";
import * as bookRouter from "./router/bookRouter";
import * as cacheRouter from "./router/cacheRouter";
import * as cookieParser from "cookie-parser";

export class Demo {
    public static start() {
        let app = express();
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, "public")));
        app.use("/", bookRouter);
        app.use("/", cacheRouter);
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "./public/page/index.html"));
        });

        let server = app.listen(3000, () => {
            console.log("[" + new Date().toUTCString() + "] Demo is listening port:%s", server.address().port);
        });
    }
}

Demo.start();