import { ReversePipe } from "./reverse.pipe"

describe('Reverse pipe', ()=>{
    it('shpuld reverse the word',()=>{
        let reversePipe = new ReversePipe();
        expect(reversePipe.transform('hello')).toEqual('olleh');
    })
})