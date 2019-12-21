import "reflect-metadata"
import { expect } from 'chai';
import {GameObject, ObjectType} from "../objects/GameObject"

describe('GameObject', () => {

    it("create", () => {
        let object = new GameObject();

        expect(object.id).not.eq(null)
    })

})