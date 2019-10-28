import { DataProvider } from "../provider/dataProvider";
import { BookLibModel } from "../../../lib/typings/dataModel";

export class SettingsModel {

    constructor() {
        this.provider = new DataProvider();
    }

    public parseDomainUrl(input: string): string {
        let domainParser = input.split('.');
        return `www.${domainParser.length > 1 ? domainParser[1] : domainParser}`;
    }

    public getBookId(input: string): string {
        let result: string[] = input.match(/\d+_\d+/g);
        return result && result.length > 0 ? result[0] : "";
    }

    public setBookDomain(domain: string): JQueryPromise<string> {
        return this.provider.putBookDomain(this.parseDomainUrl(domain)).then(
            value => `document.cookie.BaseDomain is ${JSON.stringify(document.cookie)}`,
            error => `set ${domain} Failed`,
        );
    }

    public bakupBookLib():JQueryPromise<boolean>{
        return this.provider.backUp();
    }

    public restoreBookLib(input: string): JQueryPromise<boolean> {
        let booklib: BookLibModel[] = JSON.parse(input);

        return $.when(
            booklib.map(
                mark => this.provider.putLastestChapterNumber(mark.bookId, mark.charpterIndex)
            )
        ).then(done => true, err => false);
    }

    private provider: DataProvider;
}