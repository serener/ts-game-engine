import {GameObject} from "../GameObject";
import GraphContext from "../../GraphContext";

export default class SpriteComponent extends GameObject {
    private _image: HTMLImageElement;
    private _width: number;
    private _height: number;
    private _row: number;
    private _speed: number;
    private _startColumn: number;
    private _endColumn: number;
    private _currentColumn: number;
    private _iteration: number = 0;

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
        if (this._startColumn === undefined) {
            return
        }

        if (this._currentColumn === undefined) {
            this._currentColumn = this._startColumn;
        }

        if (this.time - (this._speed * this._iteration) > this.speed) {
            this._iteration++;
            this._currentColumn++;
            if (this._currentColumn > this._endColumn) {
                this._currentColumn = this._startColumn;
            }
        }

        context.drawSprite(this._image, this._width, this.height, this._row, this._currentColumn);
    }
}