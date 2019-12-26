import {GameObject} from "../objects/GameObject";

export class Layer {

    private _objects :Set<GameObject>;

    add(object: GameObject) {
        this._objects.delete(object)
        this._objects.add(object)
    }


    get objects(): Set<GameObject> {
        return this._objects;
    }
}