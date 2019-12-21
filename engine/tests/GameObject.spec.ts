import { expect } from 'chai';
import {GameObject, ObjectType} from "../objects/GameObject"
import Vector2D from "../math/2DVector";

describe('GameObject', () => {

    it("create", () => {
        let object = new GameObject(ObjectType.BODY, Vector2D.random());
        expect(object.getId()).not.eq(null)
    })

})