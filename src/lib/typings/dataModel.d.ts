export interface ContentData {
    Index: number;
    Title: string;
    Content: string[];
}

export interface TitleData {
    Href: string;
    Title: string;
}

export interface BookMarkData {
    BookId: string;
    Name: string;
}

export interface ICorrection {
    pattern: string,
    value: string,
}

export interface ILatestChapter {
    latestChapter: number;
}

export interface BookLibModel {
    bookId: string;
    charpterIndex: number;
}