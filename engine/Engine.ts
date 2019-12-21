let instance : Engine;

export default class Engine {
    private canvas : HTMLCanvasElement;
    private context : CanvasRenderingContext2D;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        instance = this;
    }



    static instance(): Engine {
        return instance;
    }
}

