import { DataProvider } from "../provider/dataProvider";

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
}