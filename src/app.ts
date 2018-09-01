import * as express from "express";
import * as path from "path";
import * as sampleRouter from "./router/sampleRouter";

export class Demo {
    public static start() {
        let app = express();
        app.use(express.static(path.join(__dirname, "public")));
        app.use("/", sampleRouter);

        let server = app.listen(3000, () => {
            console.log("[" + new Date().toUTCString() + "] Demo is listening port:%s", server.address().port);
        });
    }
}

Demo.start();