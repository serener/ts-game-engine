import {GameObject} from "../GameObject";
import GraphContext from "../../GraphContext";
import ColoredComponent from "./ColoredComponent";

export default class TextComponent extends ColoredComponent {
    private _font: string = "30px Arial";
    private _text: string = "[EMPTY TEXT]";
    private _maxWidth: number;
    private _fill: boolean = true;

    get font(): string {
        return this._font;
    }

    set font(value: string) {
        this._font = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get maxWidth(): number {
        return this._maxWidth;
    }

    set maxWidth(value: number) {
        this._maxWidth = value;
    }

    get fill(): boolean {
        return this._fill;
    }

    set fill(value: boolean) {
        this._fill = value;
    }

    addComponent(component: GameObject) {
        throw new Error(this.type.toString() + " can't have children components")
    }

    update(context: GraphContext) {
        if (this._fill) {
            context.fillText(this._text, this._font, this._maxWidth);
        } else {
            context.strokeText(this._text, this._font, this._maxWidth);
        }
    }
}