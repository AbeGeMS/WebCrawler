export class DataProvider{
    public getSayHi(name: string): JQueryPromise<string> {
        return $.ajax({
            "method":"GET",
            "url":`hi?id=${name}`,
            success:msg=> msg as string,
            error:e=>`Service error ${JSON.stringify(e)}`,
        });
    }
}