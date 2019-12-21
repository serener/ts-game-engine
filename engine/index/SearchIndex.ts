import {GameObject, ObjectType} from "../objects/GameObject";

export default interface SearchIndex {
    index(object: GameObject);
    update(object: GameObject);
    getObjectByTag(tag: string | Array<string>);
    getObjectById(id: string): GameObject;
    getObjectByType(type: ObjectType): Array<GameObject>;
}