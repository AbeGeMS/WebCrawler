import { SampleService } from '../../Service/sampleService'

describe('jasmine test suite', () => {
    it('sample service test sayHi()', () => {
        let sayHelloService = new SampleService();
        let actualResult = sayHelloService.SayHi("tester");
        expect(actualResult).toBe('Hello, my name is tester');
    });
});