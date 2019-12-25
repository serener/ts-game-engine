import {Asset} from "./Asset";
import {ImageResizer, ResizeAlgorithm} from "./ImageResizer";

export default class ImageAsset implements Asset {
    private _sourceUrl: string;
    private _resizer: ImageResizer;
    private _image: HTMLImageElement;

    public _promise: Promise<Asset>;

    private _reject: (reason?: any) => void;
    private _resolve: (value?: Asset | PromiseLike<Asset>) => void;
    private _needToResize: boolean = false;

    constructor(src: string, resizer: ImageResizer, width?: number, height?: number) {
        this._sourceUrl = src;
        this._resizer = resizer;
        this._needToResize = width !== undefined && height !== undefined;

        let self = this;

        this._promise = new Promise<Asset>((resolve, reject) => {
            self._reject = reject;
            self._resolve = resolve;
        })

        this._image = new Image();
        this._image.src = src;

        this._image.addEventListener("load", () => {
            if (self._needToResize) {
                self._image = self._resizer.resize(this._image, width, height, ResizeAlgorithm.NEAREST_NEIGHBORS)
            }
            self._resolve(self);
        })

        this._image.addEventListener("error", () => {
            self._reject();
        })
    }

    get src(): string {
        return this.src;
    }


    get image(): HTMLImageElement {
        return this._image;
    }

    get width(): number {
        return this._image.width;
    }

    get height(): number {
        return this._image.height;
    }

    getPromise(): Promise<Asset> {
        return this._promise;
    }
}