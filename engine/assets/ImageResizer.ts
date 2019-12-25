enum ResizeAlgorithm {
    NEAREST_NEIGHBORS,
    BILINEAR_INTERPOLATION
}

class ImageResizer {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    constructor() {
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
    }

    getImageData(image: HTMLImageElement): ImageData {
        this._canvas.width = image.width;
        this._canvas.height = image.height;

        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.drawImage(image, 0, 0, image.width, image.height);
        return this._context.getImageData(0, 0, image.width, image.height);
    }

    resize(image: HTMLImageElement, width: number, height: number, algorithm?: ResizeAlgorithm): HTMLImageElement {
        let alg = algorithm === undefined ? ResizeAlgorithm.NEAREST_NEIGHBORS : algorithm;

        let source = this.getImageData(image);

        let result = new ImageData(new Uint8ClampedArray(4 * width * height), width, height)

        switch (alg) {
            case ResizeAlgorithm.NEAREST_NEIGHBORS:
                this.nearestNeighbor(source, result);
                break;
            case ResizeAlgorithm.BILINEAR_INTERPOLATION:
                this.bilinearInterpolation(source, result)
                break;
            default:
                throw new Error(`Unknown algorithm: ${algorithm}`)
        }

        this._canvas.width = result.width;
        this._canvas.height = result.height;
        this._context.putImageData(result, 0, 0);

        let res = new Image();
        res.src = this._canvas.toDataURL();
        return res;
    }


    nearestNeighbor(src: ImageData, dst: ImageData) {
        let pos = 0

        for (let y = 0; y < dst.height; y++) {
            for (let x = 0; x < dst.width; x++) {
                const srcX = Math.floor(x * src.width / dst.width)
                const srcY = Math.floor(y * src.height / dst.height)

                let srcPos = ((srcY * src.width) + srcX) * 4

                dst.data[pos++] = src.data[srcPos++] // R
                dst.data[pos++] = src.data[srcPos++] // G
                dst.data[pos++] = src.data[srcPos++] // B
                dst.data[pos++] = src.data[srcPos++] // A
            }
        }
    }

    bilinearInterpolation(src: ImageData, dst: ImageData) {
        function interpolate(k, kMin, kMax, vMin, vMax) {
            return Math.round((k - kMin) * vMax + (kMax - k) * vMin)
        }

        function interpolateHorizontal(offset, x, y, xMin, xMax) {
            const vMin = src.data[((y * src.width + xMin) * 4) + offset]
            if (xMin === xMax) return vMin

            const vMax = src.data[((y * src.width + xMax) * 4) + offset]
            return interpolate(x, xMin, xMax, vMin, vMax)
        }

        function interpolateVertical(offset, x, xMin, xMax, y, yMin, yMax) {
            const vMin = interpolateHorizontal(offset, x, yMin, xMin, xMax)
            if (yMin === yMax) return vMin

            const vMax = interpolateHorizontal(offset, x, yMax, xMin, xMax)
            return interpolate(y, yMin, yMax, vMin, vMax)
        }

        let pos = 0

        for (let y = 0; y < dst.height; y++) {
            for (let x = 0; x < dst.width; x++) {
                const srcX = x * src.width / dst.width
                const srcY = y * src.height / dst.height

                const xMin = Math.floor(srcX)
                const yMin = Math.floor(srcY)

                const xMax = Math.min(Math.ceil(srcX), src.width - 1)
                const yMax = Math.min(Math.ceil(srcY), src.height - 1)

                dst.data[pos++] = interpolateVertical(0, srcX, xMin, xMax, srcY, yMin, yMax) // R
                dst.data[pos++] = interpolateVertical(1, srcX, xMin, xMax, srcY, yMin, yMax) // G
                dst.data[pos++] = interpolateVertical(2, srcX, xMin, xMax, srcY, yMin, yMax) // B
                dst.data[pos++] = interpolateVertical(3, srcX, xMin, xMax, srcY, yMin, yMax) // A
            }
        }
    }
}

export {ResizeAlgorithm, ImageResizer}