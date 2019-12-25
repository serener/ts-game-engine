import Vector2D from "./math/2DVector";

export default class GraphContext {
    private canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _viewPortScale: number = 1;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this._context = canvas.getContext("2d");
    }

    get viewPortScale(): number {
        return this._viewPortScale;
    }

    set viewPortScale(value: number) {
        if (this._viewPortScale !== 1) {
            this.scale(1 / this._viewPortScale);
        }
        this._viewPortScale = value;
        this.scale(this._viewPortScale);
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

    strokeRect(width: number, height: number) {
        this._context.strokeRect(0, 0, width, height);
    }

    drawImage(image: HTMLImageElement, width: number, height: number) {
        this._context.drawImage(image, 0, 0, width, height);
    }

    drawSprite(image: HTMLImageElement, width: number, height: number, row: number, column: number, padding: number) {
        this._context.drawImage(image, width * column + padding, height * row + padding, width, height, 0, 0, width, height)
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

    set lineWidth(width: number) {
        this._context.lineWidth = width;
    }

    get lineWidth(): number {
        return this._context.lineWidth;
    }

    set lineDashOffset(offset: number) {
        this._context.lineDashOffset = offset;
    }

    get lineDashOffset(): number {
        return this._context.lineDashOffset;
    }

    clear() {
        this.scale(1 / this.viewPortScale)
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.scale(this.viewPortScale)
    }
}