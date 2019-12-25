import {GameObject} from "../GameObject";
import GraphContext from "../../GraphContext";

export default class VisualComponent extends GameObject {
    protected _width: number;
    protected _height: number;
    protected _showRect: boolean = false;

    protected _lineWidth: number = 0.5;

    get lineWidth(): number {
        return this._lineWidth;
    }

    set lineWidth(value: number) {
        this._lineWidth = value;
    }

    get showRect(): boolean {
        return this._showRect;
    }

    set showRect(value: boolean) {
        this._showRect = value;
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

    beforeUpdate(context: GraphContext) {
        super.beforeUpdate(context);
        if (this._showRect) {
            let oldWidth = context.lineWidth;
            context.lineWidth = this._lineWidth;
            context.strokeRect(this._width, this._height)
            context.lineWidth = oldWidth;
        }
    }
}