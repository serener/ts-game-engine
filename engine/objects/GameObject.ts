import {v4 as uuid} from "uuid";
import SearchIndex from "../index/SearchIndex";
import Vector2D from "../math/2DVector";
import {autoInjectable, inject} from "tsyringe";

enum ObjectType {
    FORCE,
    OBJECT,
    BODY,
    COMPONENT
}

@autoInjectable()
class GameObject {
    private _tags: Array<string>;
    private _type: ObjectType;
    private readonly _id: string;
    private _position: Vector2D;
    private _created: number;
    private _components: Array<GameObject>;

    protected readonly searchIndex: SearchIndex;

    constructor(@inject(SearchIndex) private index?: SearchIndex) {
        this._id = uuid();
        this._tags = new Array<string>();
        this._position = Vector2D.zero()
        this.searchIndex = index;
        this._created = Date.now() / 1000;
    }

    set type(value: ObjectType) {
        if (this._type !== undefined) {
            throw new Error("can't modify type")
        }
        this._type = value;
        this.searchIndex.index(this);
    }

    set position(value: Vector2D) {
        this._position = value;
    }

    get position(): Vector2D {
        return this._position;
    }

    get id(): string {
        return this._id;
    }

    get type(): ObjectType {
        return this._type;
    }

    get tags(): Array<string> {
        return this._tags;
    }

    public mark(tag: string | Array<string>) {
        if (Array.isArray(tag)) {
            tag.forEach(tag => {
                if (!this._tags.includes(tag)) {
                    this._tags.push(tag)
                }
            })
        } else {
            if (!this._tags.includes(tag)) {
                this._tags.push(tag)
            }
        }
        this.searchIndex.update(this);
    }

    public addComponent(component: GameObject) {
        this._components.push(component);
    }

    public time(): number {
        return Date.now() - this._created;
    }

    public hasTags(tags: Array<string>) {
        for (var i = 0; i < tags.length; i++) {
            if (!this._tags.includes(tags[i])) {
                return false
            }
        }
        return true
    }

    public update(context) {
        this._components.forEach(component => {
            component.update(context);
        })
    }
}

export {GameObject, ObjectType};



