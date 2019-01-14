export function encodingStr(value: string): string {
    return encodeURIComponent(value || "").replace(/'/g, "%27").replace(/"/g, "%22");
}

export function decodingStr(value: string): string {
    return decodeURIComponent(value && value.replace(/\+/g, " "));
}

export function guid(): string {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}