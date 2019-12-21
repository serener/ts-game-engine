import "reflect-metadata"
import { expect } from 'chai';
import SearchIndex from "../index/SearchIndex";
import ClassForInject from "./ClassForInject";
import {container} from "tsyringe";

describe('DIContainer', () => {

    it("register object", () => {

        let resolved = container.resolve(SearchIndex);

        let test = new ClassForInject();
        let test2 = new ClassForInject();
        expect(test).not.equals(test2);
        expect(resolved).not.equals(undefined);
        expect(test.index).not.equals(undefined);
        expect(test.index).to.equals(resolved);

    })

})