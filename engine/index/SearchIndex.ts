import {GameObject, ObjectType} from "../objects/GameObject";
import {singleton} from "tsyringe";

@singleton()
class SearchIndex {

    private byTag: Map<string, Set<GameObject>> = new Map<string, Set<GameObject>>();
    private byId: Map<string, GameObject> = new Map<string, GameObject>();
    private byType: Map<ObjectType, Set<GameObject>> = new Map<ObjectType, Set<GameObject>>();

    constructor() {
    }

    public index(object: GameObject) {

        this.byId.set(object.id, object);

        let typeArray = this.byType.get(object.type);
        if (typeArray === undefined) {
            typeArray = new Set<GameObject>();
            this.byType.set(object.type, typeArray);
        }
        typeArray.add(object);
    }

    public update(object: GameObject) {
        object.tags.forEach(tag => {
            let array: Set<GameObject> = this.byTag.get(tag);
            if (array === undefined) {
                array = new Set<GameObject>();
                this.byTag.set(tag, array);
            }
            array.add(object);
        })
    }

    getObjectByTag(tag: string | Array<string>) {
        if (!Array.isArray(tag)) {
            return this.byTag.get(tag);
        }

        if (tag.length == 1) {
            return this.byTag.get(tag[0]);
        }

        let candidates = new Set<GameObject>();
        let self = this;

        tag.forEach(tag => {
            self.byTag.get(tag).forEach(obj => {
                candidates.add(obj);
            });
        })

        let result = new Set<GameObject>();
        candidates.forEach(object => {
            if (object.hasTags(tag)) {
                result.add(object);
            }
        })

        return result;
    }

    getObjectById(id: string): GameObject {
        return this.byId.get(id);
    }

    getObjectByType(type: ObjectType): Set<GameObject> {
        return this.byType.get(type);
    }
}

export default SearchIndex;