import {ObjectType} from "./objects/GameObject";
import Vector2D from "./math/2DVector";
import ImageAsset from "./assets/ImageAsset";
import AssetsLoader from "./assets/AssetsLoader";
import Engine from "./Engine";

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
window.AssetLoader = AssetsLoader;