import {GameObject} from "../GameObject";
import GraphContext from "../../GraphContext";

export default class ImageComponent extends GameObject {
    private _image: HTMLImageElement;
    private _width: number;
    private _height: number;

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    update(context: GraphContext) {
        if (this._width === undefined || this._height === undefined){
            context.drawImage(this._image, this._image.width, this._image.height);
            return;
        }
        context.drawImage(this._image, this._width, this.height);
    }
}