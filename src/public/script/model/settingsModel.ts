import { DataProvider } from "../provider/dataProvider";

export class SettingsModel {

    constructor() {
        this.provider = new DataProvider();
    }

    public setBookDomain(domain: string): JQueryPromise<string> {
        return this.provider.putBookDomain(domain).then(
            value => `document.cookie.BaseDomain is ${JSON.stringify(document.cookie)}`,
            error => `set ${domain} Failed`,
        );
    }
    private provider: DataProvider;
}