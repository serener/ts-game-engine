import {autoInjectable, container, inject, injectable} from "tsyringe";
import SearchIndex from "../index/SearchIndex";

@autoInjectable()
export default class ClassForInject {
    private _index : SearchIndex

    public constructor(private searchIndex? : SearchIndex) {
        this._index = searchIndex;
    }

    get index(): SearchIndex {
        return this._index;
    }
}