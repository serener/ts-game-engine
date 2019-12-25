export interface Asset {
    getPromise() : Promise<Asset>;
}