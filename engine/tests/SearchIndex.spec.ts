import {GameObject, ObjectType} from "../objects/GameObject";
import {expect} from "chai";
import SearchIndex from "../index/SearchIndex";
import Engine from "../Engine";


function body(engine : Engine): GameObject {
    let object = engine.createObject(ObjectType.BODY);
    return object
}

function force(engine : Engine): GameObject {
    let object = engine.createObject(ObjectType.FORCE);
    return object
}

function component(engine : Engine): GameObject {
    let object = engine.createObject(ObjectType.COMPONENT);

    return object
}

describe('SearchIndex', () => {

    it("get object by Id", () => {
        let engine = new Engine();

        let object: GameObject = body(engine);
        let index = engine.index;
        let founded = index.getObjectById(object.id);
        expect(object).to.eq(founded)
    });

    it("get objects by type", () => {
        let engine = new Engine();

        let body1 = body(engine);
        let body2 = body(engine);

        let component1 = component(engine);
        let component2 = component(engine);
        let component3 = component(engine);

        let force1 = force(engine);
        let force2 = force(engine);

        let index = engine.index;

        let founded = index.getObjectByType(ObjectType.BODY);
        expect(founded.size).to.equals(2);
        expect(founded.has(body1)).to.equals(true);
        expect(founded.has(body2)).to.equals(true);

        founded = index.getObjectByType(ObjectType.COMPONENT);
        expect(founded.size).to.equals(3);
        expect(founded.has(component1)).to.equals(true);
        expect(founded.has(component2)).to.equals(true);
        expect(founded.has(component3)).to.equals(true);

        founded = index.getObjectByType(ObjectType.FORCE);
        expect(founded.size).to.equals(2);
        expect(founded.has(force1)).to.equals(true);
        expect(founded.has(force2)).to.equals(true);
    })

    it("get object by tag", () => {
        let engine = new Engine();

        let object = body(engine);
        object.mark(["hello", "world"]);

        let object1 = force(engine);
        object1.mark(["this", "world"]);

        let object2 = component(engine);
        object2.mark(["hello", "world"]);

        let index = engine.index;
        let founded = index.getObjectByTag("hello");
        expect(founded.size).to.eq(2);
        expect(founded.has(object)).to.eq(true);
        expect(founded.has(object2)).to.eq(true);

        founded = index.getObjectByTag("this");
        expect(founded.size).to.eq(1);
        expect(founded.has(object1)).to.eq(true);

        founded = index.getObjectByTag("world");
        expect(founded.size).to.eq(3);
        expect(founded.has(object)).to.eq(true);
        expect(founded.has(object1)).to.eq(true);
        expect(founded.has(object2)).to.eq(true);

        founded = index.getObjectByTag(["world", "hello"]);
        expect(founded.size).to.eq(2);
        expect(founded.has(object)).to.eq(true);
        expect(founded.has(object2)).to.eq(true);

        founded = index.getObjectByTag(["world", "hello", "this"]);
        expect(founded.size).to.eq(0);

        founded = index.getObjectByTag(["world"]);
        expect(founded.size).to.eq(3);
        expect(founded.has(object)).to.eq(true);
        expect(founded.has(object1)).to.eq(true);
        expect(founded.has(object2)).to.eq(true);
    });

});