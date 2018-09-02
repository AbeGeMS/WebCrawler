import { DataProvider } from "../provider/dataProvider";
import { ContantData } from "../../../lib/dataModel";

export class SampleModel {
    constructor() {
        this.provider = new DataProvider();
    }

    private provider: DataProvider;

    get Provider(): DataProvider { return this.provider }

    set Provider(provider: DataProvider) {
        this.provider = provider
    };

    public getServerMessage(): JQueryPromise<string> {
        return this.provider.getSayHi("Sample man")
            .then(msg => `server said:
            ${msg}`);
    }

    public getBookContent(): JQueryPromise<ContantData> {
        return this.provider.getbookContent("https://www.xxbiquge.com/", "1_1387", 45)
            .then(
                value => value
            );
    }
}