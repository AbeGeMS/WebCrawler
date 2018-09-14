describe("Pure jasmine test suit", () => {
    it("pass test001 should be true", () => {
        let actualResult = true;
        expect(actualResult).toBe(true, "should run into here");
    });
    it("failure test002 shouldn't be true", () => {
        let actualResult =false;
        expect(actualResult).toBe(true, "what's the actual result?");
    });
});