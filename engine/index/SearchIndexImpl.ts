import {GameObject, ObjectType} from "../objects/GameObject";
import SearchIndex from "./SearchIndex";

export default class SearchIndexImpl implements SearchIndex {

    private byTag: Map<string, Array<GameObject>> = new Map<string, Array<GameObject>>();
    private byId: Map<string, GameObject> = new Map<string, GameObject>();
    private byType: Map<ObjectType, Array<GameObject>> = new Map<ObjectType, Array<GameObject>>();


    public index(object: GameObject) {

        this.byId.set(object.getId(), object);

        let typeArray = this.byType.get(object.getType());
        if (typeArray === undefined) {
            typeArray = new Array<GameObject>();
            this.byType.set(object.getType(), typeArray);
        }
        typeArray.push(object);
    }

    public update(object: GameObject) {

    }

    static instance(): SearchIndexImpl {
        return instance;
    }

    getObjectByTag(tag: string | Array<string>) {
        if (!Array.isArray(tag)) {
            return this.byTag.get(tag);
        }

        let res = new Array<GameObject>();
        let self = this;

        tag.forEach(tag => {
            res.concat(self.byTag.get(tag));
        })
    }

    getObjectById(id: string): GameObject {
        return this.byId.get(id);
    }

    getObjectByType(type: ObjectType): Array<GameObject> {
        return this.byType.get(type);
    }
}

let instance = new SearchIndexImpl();
