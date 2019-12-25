import GraphContext from "../../GraphContext";
import VisualComponent from "./VisualComponent";
import ImageAsset from "../../assets/ImageAsset";

export default class ImageComponent extends VisualComponent {
    private _image: ImageAsset;

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
        if (this._width === undefined || this._height === undefined) {
            this.width = this._image.width;
            this.height = this._image.height;
        }
    }

    update(context: GraphContext) {
        let img = this._image.image;

        context.drawImage(img, this._width, this.height);
    }
}