import * as express from "express";
import * as path from "path";
import { SampleService } from "../Service/sampleService";

let router = express.Router();
router.get('/',(req,res)=>{
    console.log("come to here!");
    res.sendFile(path.join(__dirname,"../public/page/index.html"));
});

router.get('/hi', (req, res) => {
    console.log("SampleRouter.hi");
    let hi = new SampleService();
    res.json(hi.SayHi(req.query.id));
});

export = router;