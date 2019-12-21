import { expect } from 'chai';
import Vector2D from "../math/2DVector";

describe('Vector', () => {

    it("summ of vectors", () => {
        let first = new Vector2D(1,1);
        let second = new Vector2D(1, 1);

        let res = first.plus(second);

        expect(res.get("x")).to.eq(2)
        expect(res.get("y")).to.eq(2)
   })

    it("difference of vectors", () => {
        let first = new Vector2D(1,1);
        let second = new Vector2D(1, 1);

        let res = first.minus(second);

        expect(res.get("x")).to.eq(0)
        expect(res.get("y")).to.eq(0)
   })

    it("scale of vectors", () => {
        let first = new Vector2D(1,2);
        let res = first.scale(100);
        expect(res.get("x")).to.eq(100)
        expect(res.get("y")).to.eq(200)
   })

})