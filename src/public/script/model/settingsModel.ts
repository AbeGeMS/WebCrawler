import { DataProvider } from "../provider/dataProvider";

export class SettingsModel {

    constructor() {
        this.provider = new DataProvider();
    }

    public parseDomainUrl(input: string) {
        let domainParser = input.split('.');
        return `www.${domainParser.length > 1 ? domainParser[1] : domainParser}`;
    }

    public getBookId(input: string) {
        let result: string[] = input.match(/\d+_\d+/g);
        return result && result.length > 0 ? result[0] : "";
    }

    public setBookDomain(domain: string): JQueryPromise<string> {
        return this.provider.putBookDomain(this.parseDomainUrl(domain)).then(
            value => `document.cookie.BaseDomain is ${JSON.stringify(document.cookie)}`,
            error => `set ${domain} Failed`,
        );
    }
    private provider: DataProvider;
}