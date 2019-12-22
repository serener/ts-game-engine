import "reflect-metadata"
import {autoInjectable} from "tsyringe";
import SearchIndex from "./index/SearchIndex";
import {GameObject, ObjectType} from "./objects/GameObject";
import GraphContext from "./GraphContext";
import DotComponent from "./objects/components/DotComponent";
import Vector2D from "./math/2DVector";
import ImageComponent from "./objects/components/ImageComponent";
import TextComponent from "./objects/components/TextComponent";

@autoInjectable()
export default class Engine {
    private context: GraphContext;
    private index: SearchIndex;

    constructor(private searchIndex?: SearchIndex) {
        this.index = searchIndex;
        this.update = this.update.bind(this);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.context = new GraphContext(canvas);
        window.requestAnimationFrame(this.update);
    }

    //todo factory
    createObject(type: ObjectType): GameObject {
        switch (type) {
            case ObjectType.DOT_COMPONENT: {
                let object = new DotComponent();
                object.type = ObjectType.DOT_COMPONENT;
                return object;
            }
            case ObjectType.IMAGE_COMPONENT: {
                let object = new ImageComponent();
                object.type = ObjectType.IMAGE_COMPONENT;
                return object;
            }
            case ObjectType.TEXT_COMPONENT: {
                let object = new TextComponent();
                object.type = ObjectType.TEXT_COMPONENT;
                return object;
            }
            default:
            case ObjectType.OBJECT: {
                let object = new GameObject();
                object.type = type;
                return object;
            }
        }
    }

    private update() {
        this.context.clear();

        this.index.getObjectByType(ObjectType.OBJECT).forEach(
            object => {
                object.beforeUpdate(this.context)
                object.update(this.context)
                object.afterUpdate(this.context)
            });

        window.requestAnimationFrame(this.update);
    }
}

declare global {
    interface Window {
        Engine: any;
        ObjectType: any;
        Vector: any;
    }
}

window.Engine = Engine;
window.ObjectType = ObjectType;
window.Vector = Vector2D;
