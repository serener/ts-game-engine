import "reflect-metadata"
import {autoInjectable} from "tsyringe";
import SearchIndex from "./index/SearchIndex";
import {GameObject, ObjectType} from "./objects/GameObject";
import GraphContext from "./GraphContext";

@autoInjectable()
export default class Engine {
    private context: GraphContext;
    private index: SearchIndex;

    constructor(private searchIndex?: SearchIndex) {
        this.index = searchIndex;
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.context = new GraphContext(canvas);
        window.requestAnimationFrame(this.update);
    }

    //todo factory
    createObject(type: ObjectType): GameObject {
        let object = new GameObject();
        object.type = type;
        return object;
    }

    private update() {
        this.context.clear();

        this.index.getObjectByType(ObjectType.OBJECT).forEach(
            object => {
                object.update(context)
            });

        window.requestAnimationFrame(this.update);
    }
}
declare global {
    interface Window {
        Engine : any;
    }
}

window.Engine = Engine;
