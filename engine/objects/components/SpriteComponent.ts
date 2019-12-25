import GraphContext from "../../GraphContext";
import VisualComponent from "./VisualComponent";
import ImageAsset from "../../assets/ImageAsset";

export default class SpriteComponent extends VisualComponent {
    private _image: ImageAsset;
    private _row: number;
    private _speed: number;
    private _startColumn: number;
    private _endColumn: number;
    private _padding: number = 0;

    private _currentColumn: number;
    private _lastUpdateTime: number = 0;

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    get row(): number {
        return this._row;
    }

    set row(value: number) {
        this._row = value;
    }

    get startColumn(): number {
        return this._startColumn;
    }

    set startColumn(value: number) {
        this._startColumn = value;
    }

    get endColumn(): number {
        return this._endColumn;
    }

    set endColumn(value: number) {
        this._endColumn = value;
    }

    get image(): ImageAsset {
        return this._image;
    }

    set image(value: ImageAsset) {
        this._image = value;
    }

    get padding(): number {
        return this._padding;
    }

    set padding(value: number) {
        this._padding = value;
    }

    update(context: GraphContext) {
        if (this._startColumn === undefined) {
            return;
        }

        if (this._currentColumn === undefined) {
            this._currentColumn = this._startColumn;
        }

        if (this.time - this._lastUpdateTime > this.speed) {
            this._lastUpdateTime = this.time

            this._currentColumn++;
            if (this._currentColumn > this._endColumn) {
                this._currentColumn = this._startColumn;
            }
        }

        context.drawSprite(this._image.image, this._width, this.height, this._row, this._currentColumn, this._padding);
    }
}