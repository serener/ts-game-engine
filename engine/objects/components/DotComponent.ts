import {GameObject} from "../GameObject";
import GraphContext from "../../GraphContext";

export default class DotComponent extends GameObject {
    update(context : GraphContext) {
        super.update(context);
        let pos = this.position;
        context.arc(this.position, 3, 0, 2 * Math.PI);
    }
}