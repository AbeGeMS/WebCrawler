import { ICorrection } from "../../../lib/typings/dataModel";

export let GetBooks_Request = "GetBooks_Request";
export type GetBooks_Request = typeof GetBooks_Request;

export let GetBooks_Response = "GetBooks_Response";
export type GetBooks_Response = typeof GetBooks_Response; 

export let SetBookDomain_Request = "SetBookDomain_Request";
export type SetBookDomain_Request = typeof SetBookDomain_Request;

export let SetBookDomain_Response = "SetBookDomain_Response";
export type SetBookDomain_Response = typeof SetBookDomain_Response;

export let ChangeNotification = "ChangeNotification";
export type changeNotification = typeof ChangeNotification;


export let CorrectionList:ICorrection[] = [
    { pattern: "sè", value: "色" },
    { pattern: "rì", value: "日" },
    { pattern: "jīng", value: "精" },
    { pattern: "xìng", value: "兴" },
    { pattern: "()", value: "" },
    { pattern: "cháo", value: "糙" },
    { pattern: "jǐng", value: "景" },
    { pattern: "yīn", value: "音" },
    { pattern: "sāo", value: "瘙" },
    { pattern: "yù", value: "域" },
    { pattern: "レwww.siluke.com♠思♥路♣客レ", value: "" },
    { pattern: "jiǔ", value: "酒" },
    { pattern: "zì ", value: "字" },
    { pattern: "yóu", value: "油" },
    { pattern: "zhèng", value: "正" },
    { pattern: "fǔ", value: "府" },
    { pattern: "nǎi", value: "乃" },
    { pattern: "jiān", value: "间" },
    { pattern: "chūn", value: "春" },
    { pattern: "shè", value: "社" },
    { pattern: "cāo", value: "糙" },
    { pattern: "dú", value: "队" },
    { pattern: "lì", value: "丽" },
    { pattern: "jǐng", value: "警" },
    { pattern: "jǐng", value: "警" },
    { pattern: "chéng", value: "城" },
    { pattern: "rén", value: "人" },
    { pattern: "zhèng ", value: "正" },
    { pattern: "fǔ", value: "腹" },
    { pattern: "nǎi", value: "奶" },
    { pattern: "è", value: "色" },
    { pattern: "jī", value: "基" },
    { pattern: "méng", value: "萌" },
    { pattern: "lù", value: "陆" },
    { pattern: "mí", value: "弥" },
    { pattern: "hún", value: "魂" },
    { pattern: "dàng", value: "荡" },
    { pattern: "bō", value: "波" },
    { pattern: "shì", value: "市" },
    { pattern: "nv", value: "女" },
    { pattern: "『", value: "" },
    { pattern: "』", value: "" },
    { pattern: "mén", value: "门" },
    { pattern: "máo", value: "毛" },
    { pattern: "hòu", value: "后" },
    { pattern: "huā", value: "花" },
    { pattern: "jiāo", value: "交" },
    { pattern: "ji", value: "基" },
    { pattern: "dòng", value: "动" },
    { pattern: "luàn", value: "换" },
    { pattern: "fù", value: "付" },
    { pattern: "xìn", value: "信" },
    { pattern: "xiōng", value: "兄" },
    { pattern: "yòu", value: "又" },
    { pattern: "luǒ", value: "裸" },
    { pattern: "sī", value: "私" },
    { pattern: "readx", value: "" },
    { pattern: "&nbsp;", value: "" },
    { pattern: "nbsp;", value: "" },
    { pattern: "[a-z]", value: "" },
    { pattern: "[A-Z]", value: "" },
    { pattern: "？", value: "." },
    { pattern: "\\\?", value: "." },
];