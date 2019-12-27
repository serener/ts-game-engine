import "reflect-metadata"
import {expect} from 'chai';
import {GameObject, ObjectType} from "../objects/GameObject"
import Engine from "../Engine";

describe('GameObject', () => {

    it("create", () => {
        let engine = new Engine();
        let object = engine.createObject(ObjectType.OBJECT);

        expect(object.id).not.eq(null)
    })

})