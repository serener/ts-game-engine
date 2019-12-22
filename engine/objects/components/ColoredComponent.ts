import {GameObject} from "../GameObject";
import GraphContext from "../../GraphContext";

export default class ColoredComponent extends GameObject {

    private _color: string | CanvasGradient | CanvasPattern = "blue";
    private _oldColor: string | CanvasGradient | CanvasPattern

    get color(): string | CanvasGradient | CanvasPattern {
        return this._color;
    }

    set color(value: string | CanvasGradient | CanvasPattern) {
        this._color = value;
    }

    get oldColor(): string | CanvasGradient | CanvasPattern {
        return undefined;
    }

    set oldColor(value: string | CanvasGradient | CanvasPattern) {
    }

    addComponent(component: GameObject) {
        throw new Error(this.type.toString() + " can't have children components")
    }

    beforeUpdate(context: GraphContext) {
        super.beforeUpdate(context);
        this._oldColor = context.color;
        context.color = this._color;
    }

    afterUpdate(context: GraphContext) {
        context.color = this._oldColor;
        super.afterUpdate(context);
    }
}