import "reflect-metadata"
import {GameObject, ObjectType} from "../objects/GameObject";
import {expect} from "chai";
import SearchIndex from "../index/SearchIndex";
import {container} from "tsyringe";

function body(): GameObject {
    let object = new GameObject();
    object.type = ObjectType.BODY
    return object
}

function force(): GameObject {
    let object = new GameObject();
    object.type = ObjectType.FORCE
    return object
}

function component(): GameObject {
    let object = new GameObject();
    object.type = ObjectType.COMPONENT
    return object
}

describe('SearchIndex', () => {

    beforeEach(()=>{
        container.reset()
        container.registerSingleton<SearchIndex>(SearchIndex);
    })

    it("get object by Id", () => {
        let object: GameObject = body();
        let index = container.resolve(SearchIndex);
        let founded = index.getObjectById(object.id);
        expect(object).to.eq(founded)
    });

    it("get objects by type", () => {
        let body1 = body();
        let body2 = body();

        let component1 = component();
        let component2 = component();
        let component3 = component();

        let force1 = force();
        let force2 = force();

        let index = container.resolve(SearchIndex);

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
        let object = body();
        object.mark(["hello", "world"]);

        let object1 = force();
        object1.mark(["this", "world"]);

        let object2 = component();
        object2.mark(["hello", "world"]);

        let index = container.resolve(SearchIndex);
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