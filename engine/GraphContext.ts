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

    clear() {
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}