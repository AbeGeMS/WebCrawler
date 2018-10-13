export function encodingStr(value: string): string {
    return encodeURIComponent(value||"").replace(/'/g, "%27").replace(/"/g, "%22");
}

export function decodingStr(value: string): string {
    return decodeURIComponent(value && value.replace(/\+/g, " "));
}