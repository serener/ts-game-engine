import {GameObject} from "../objects/GameObject";

export class Layer {

    private _objects: Set<GameObject> = new Set<GameObject>();

    add(object: GameObject) {

        this._objects.delete(object)

        let newSet = new Set([object])
        this.objects.forEach(obj => {
            newSet.add(obj);
        })
        this._objects = newSet

        // this._objects.delete(object)
        // this._objects.add(object)
    }

    delete(object: GameObject) {
        this._objects.delete(object)
    }

    get objects(): Set<GameObject> {
        return this._objects;
    }
}