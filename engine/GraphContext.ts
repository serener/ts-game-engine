import Vector2D from "./math/2DVector";

export default class GraphContext {
    private canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this._context = canvas.getContext("2d");
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }

    arc(position : Vector2D, radius : number, startAngle : number, endAngle : number){
        this._context.beginPath();
        this._context.arc(position.get("x"), position.get("y"), radius, startAngle, endAngle);
        this._context.fill();
    }

    clear() {
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}