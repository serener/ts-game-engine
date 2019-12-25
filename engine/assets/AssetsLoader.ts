import {Asset} from "./Asset";

export default class AssetsLoader {
    private _queue: Array<Promise<Asset>>;

    public load(asset: Asset) {
        this._queue.push(asset.getPromise());
    }

    public loadALL(asset: Array<Asset>) {
        asset.forEach(this.load);
    }

    public waitAll() : Promise<Asset[]> {
        return Promise.all(this._queue);
    }

}