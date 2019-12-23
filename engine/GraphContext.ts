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

    translate(position: Vector2D) {
        this._context.translate(position.get("x"), position.get("y"));
    }

    rotate(angle: number) {
        this._context.rotate(angle);
    }

    scale(factor: number) {
        this._context.scale(factor, factor);
    }

    arc(radius: number, startAngle: number, endAngle: number) {
        this._context.beginPath();
        this._context.arc(0, 0, radius, startAngle, endAngle);
        this._context.fill();
    }

    drawImage(image: HTMLImageElement, width: number, height: number) {
        this._context.drawImage(image, 0, 0, width, height);
    }

    drawSprite(image: HTMLImageElement, width: number, height: number, row: number, column: number) {
        this._context.drawImage(image, width * column, height * row, width, height, 0, 0, width, height)
    }

    fillText(text: string, font?: string, maxWidth ?: number) {
        let oldFont = this._context.font;
        if (font !== undefined) {
            this._context.font = font;
        }

        this._context.fillText(text, 0, 0, maxWidth);

        if (font !== undefined) {
            this._context.font = oldFont;
        }
    }

    strokeText(text: string, font?: string, maxWidth ?: number) {
        let oldFont = this._context.font;
        if (font !== undefined) {
            this._context.font = font;
        }

        this._context.strokeText("text", 0, 0, maxWidth);

        if (font !== undefined) {
            this._context.font = oldFont;
        }
    }

    set color(color: string | CanvasGradient | CanvasPattern) {
        this._context.fillStyle = color;
    }

    get color(): string | CanvasGradient | CanvasPattern {
        return this._context.fillStyle;
    }

    clear() {
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}