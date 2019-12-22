import {GameObject} from "../GameObject";
import GraphContext from "../../GraphContext";
import ColoredComponent from "./ColoredComponent";

export default class DotComponent extends ColoredComponent {
    addComponent(component: GameObject) {
        throw new Error(this.type.toString() + " can't have children components")
    }

    update(context: GraphContext) {
        context.arc(3, 0, 2 * Math.PI);
    }

}