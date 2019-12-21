import {GameObject, ObjectType} from "../objects/GameObject";
import {expect} from "chai";
import SearchIndexImpl from "../index/SearchIndexImpl";

describe('SearchIndex', () => {

    it("get object by Id", () => {
        let object = new GameObject(ObjectType.BODY);
        let founded = SearchIndexImpl.instance().getObjectById(object.getId());
        expect(object).to.eq(founded)
    });

    it("get object by tag", () => {
        let object = new GameObject(ObjectType.BODY);
        object.mark(["hello", "world"]);

        let object1 = new GameObject(ObjectType.BODY);
        object.mark(["this", "world"]);

        let object2 = new GameObject(ObjectType.BODY);
        object.mark(["hello", "world"]);

        let index = SearchIndexImpl.instance();
        let founded = index.getObjectByTag("hello");
        expect(founded.length).to.eq(2);
        expect(founded.includes(object)).to.eq(true);
        expect(founded.includes(object2)).to.eq(true);

        founded = index.getObjectByTag("this");
        expect(founded.length).to.eq(1);
        expect(founded.includes(object1)).to.eq(true);

        founded = index.getObjectByTag("world");
        expect(founded.length).to.eq(3);
        expect(founded.includes(object)).to.eq(true);
        expect(founded.includes(object1)).to.eq(true);
        expect(founded.includes(object2)).to.eq(true);
    });

    it("get objects by type", () => {
        let body1 = new GameObject(ObjectType.BODY);
        let body2 = new GameObject(ObjectType.BODY);

        let component1 = new GameObject(ObjectType.COMPONENT);
        let component2 = new GameObject(ObjectType.COMPONENT);
        let component3 = new GameObject(ObjectType.COMPONENT);

        let force1 = new GameObject(ObjectType.FORCE);
        let force2 = new GameObject(ObjectType.FORCE);

        let index = SearchIndexImpl.instance();

        let founded = index.getObjectByType(ObjectType.BODY);
        expect(founded.length).to.equals(2);
        expect(founded.includes(body1)).to.equals(true);
        expect(founded.includes(body2)).to.equals(true);

        founded = index.getObjectByType(ObjectType.COMPONENT);
        expect(founded.length).to.equals(3);
        expect(founded.includes(component1)).to.equals(true);
        expect(founded.includes(component2)).to.equals(true);
        expect(founded.includes(component3)).to.equals(true);

        founded = index.getObjectByType(ObjectType.FORCE);
        expect(founded.length).to.equals(2);
        expect(founded.includes(force1)).to.equals(true);
        expect(founded.includes(force2)).to.equals(true);
    })

});