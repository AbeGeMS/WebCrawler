import { BookMark } from "./bookMarkModel";
import { BookModel } from "./bookModel";
import { SettingsModel } from "./settingsModel";

export class ModelFactory {
    private readonly settings: SettingsModel;
    private readonly bookMark: BookMark;
    private readonly book: BookModel;

    constructor() {
        this.settings = new SettingsModel();
        this.bookMark = new BookMark();
        this.book = new BookModel();
    }

    public get Setting(): SettingsModel {
        return this.settings;
    }

    public get BookMark(): BookMark {
        return this.bookMark;
    }

    public get Book(): BookModel {
        return this.book;
    }
}