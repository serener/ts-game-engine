import "reflect-metadata"
import {autoInjectable} from "tsyringe";
import SearchIndex from "./index/SearchIndex";
import {GameObject, ObjectType} from "./objects/GameObject";
import GraphContext from "./GraphContext";
import DotComponent from "./objects/components/DotComponent";
import Vector2D from "./math/2DVector";
import ImageComponent from "./objects/components/ImageComponent";
import TextComponent from "./objects/components/TextComponent";
import SpriteComponent from "./objects/components/SpriteComponent";
import ImageAsset from "./assets/ImageAsset";
import {ImageResizer} from "./assets/ImageResizer";
import {Asset} from "./assets/Asset";

@autoInjectable()
export default class Engine {
    private _context: GraphContext;
    private index: SearchIndex;
    private resizer: ImageResizer;

    constructor(private searchIndex?: SearchIndex) {
        this.index = searchIndex;
        this.update = this.update.bind(this);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this._context = new GraphContext(canvas);
        this.resizer = new ImageResizer();
        window.requestAnimationFrame(this.update);
    }

    get context(): GraphContext {
        return this._context;
    }

    loadImageAsset(url: string, width ?: number, height ?: number): Promise<Asset> {
        let image;
        if (width !== undefined && height !== undefined) {
            image = new ImageAsset(url, this.resizer, width, height);
        } else {
            image = new ImageAsset(url, this.resizer);
        }
        return image;
    }

    createObject(type: ObjectType): GameObject {
        switch (type) {
            case ObjectType.DOT_COMPONENT: {
                let object = new DotComponent();
                object.type = type;
                return object;
            }
            case ObjectType.IMAGE_COMPONENT: {
                let object = new ImageComponent();
                object.type = type;
                return object;
            }
            case ObjectType.SPRITE_COMPONENT: {
                let object = new SpriteComponent();
                object.type = type;
                return object;
            }
            case ObjectType.TEXT_COMPONENT: {
                let object = new TextComponent();
                object.type = type;
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
        this._context.clear();

        this.index.getObjectByType(ObjectType.OBJECT).forEach(
            object => {
                if (object.visible) {
                    object.beforeUpdate(this._context)
                    object.update(this._context)
                    object.afterUpdate(this._context)
                }
            });
        window.requestAnimationFrame(this.update);
    }
}

declare global {
    interface Window {
        Engine: any;
        ObjectType: any;
        Vector: any;
        ImageAsset: any;
        AssetLoader: any;
    }
}

window.Engine = Engine;
window.ObjectType = ObjectType;
window.Vector = Vector2D;
window.ImageAsset = ImageAsset;