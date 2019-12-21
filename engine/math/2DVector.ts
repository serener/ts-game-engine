import Vector from "./Vector";

const LABEL_X = "x";
const LABEL_Y = "y";

// utils
function random() {
    return (Math.random() < 0.5 ? -1 : 1) * Math.random() * 1000;
}

function isNegative() {
    return Math.random() < 0.5 ? -1 : 1;
}

export default class Vector2D implements Vector {
    private readonly coordinates: Map<string, number>;

    constructor(x: number, y: number) {
        this.coordinates = new Map<string, number>();
        this.coordinates.set(LABEL_X, x);
        this.coordinates.set(LABEL_Y, y);
    }

    public minus(vector: Vector): Vector {
        let x = vector.get(LABEL_X) - this.get(LABEL_X);
        let y = vector.get(LABEL_Y) - this.get(LABEL_Y);
        return new Vector2D(x, y);
    }

    public plus(vector: Vector): Vector {
        let x = vector.get(LABEL_X) + this.get(LABEL_X);
        let y = vector.get(LABEL_Y) + this.get(LABEL_Y);
        return new Vector2D(x, y);
    }

    public scale(scalar: number): Vector {
        let x = scalar * this.get(LABEL_X);
        let y = scalar * this.get(LABEL_Y);
        return new Vector2D(x, y);
    }

    public get(coordinateLabel: string): number {
        return this.coordinates.get(coordinateLabel);
    }

    public getCoordinates(): Map<string, number> {
        return this.coordinates;
    }

    public set(coordinateLabel: string, value: number) {
        this.coordinates.set(coordinateLabel, value);
    }

    public static random(): Vector2D {
        return new Vector2D(random(), random())
    }


}