import {GameObject, ObjectType} from "../objects/GameObject";
import {singleton} from "tsyringe";

let EMPTY_ARRAY = new Array<GameObject>();
let EMPTY_SET = new Set<GameObject>();

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

    getObjectByTag(tag: string | Array<string>) : Set<GameObject> {
        if (!Array.isArray(tag)) {
            let res = this.byTag.get(tag)
            return res === undefined ? EMPTY_SET : res;
        }

        if (tag.length == 1) {
            let res = this.byTag.get(tag[0]);
            return res === undefined ? EMPTY_SET : res;
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
        let res = this.byType.get(type);
        if (res === undefined) {
            return EMPTY_SET
        }
        return res;
    }
}

export default SearchIndex;