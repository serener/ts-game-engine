import {v4 as uuid} from "uuid";
import SearchIndex from "../index/SearchIndex";
import Vector2D from "../math/2DVector";
import {autoInjectable, inject} from "tsyringe";
import GraphContext from "../GraphContext";

enum ObjectType {
    FORCE,
    OBJECT,
    BODY,
    COMPONENT,
    DOT_COMPONENT,
    IMAGE_COMPONENT,
    SPRITE_COMPONENT,
    TEXT_COMPONENT
}

@autoInjectable()
class GameObject {
    private _parent: GameObject;
    private _tags: Array<string>;
    private _type: ObjectType;
    private _position: Vector2D;
    private _rotationAngle: number;
    private _scale: number;
    private _components: Array<GameObject>;
    private readonly _id: string;
    private readonly _created: number;

    protected readonly searchIndex: SearchIndex;

    constructor(@inject(SearchIndex) private index?: SearchIndex) {
        this._id = uuid();
        this._tags = new Array<string>();
        this._position = Vector2D.zero()
        this._rotationAngle = 0;
        this._scale = 1;
        this.searchIndex = index;
        this._created = Date.now();
        this._components = new Array<GameObject>();
    }

    get created(): number {
        return this._created;
    }

    get scale(): number {
        return this._scale;
    }

    set scale(value: number) {
        this._scale = value;
    }

    set type(value: ObjectType) {
        if (this._type !== undefined) {
            throw new Error("can't modify type")
        }
        this._type = value;
        this.searchIndex.index(this);
    }

    get rotationAngle(): number {
        return this._rotationAngle;
    }

    set rotationAngle(value: number) {
        this._rotationAngle = value;
    }

    set position(value: Vector2D) {
        this._position = value;
    }

    get parent(): GameObject {
        return this._parent;
    }

    set parent(value: GameObject) {
        this._parent = value;
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
        component.parent = this;
        this._components.push(component);
    }

    public get time(): number {
        if (this.parent !== undefined) {
            return this.parent.time;
        }
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

    public update(context: GraphContext) {
        this._components.forEach(component => {
            component.beforeUpdate(context);
            component.update(context);
            component.afterUpdate(context);
        })
    }

    public beforeUpdate(context: GraphContext) {
        context.translate(this._position);
        context.rotate(this._rotationAngle);
        context.scale(this._scale);
    }

    public afterUpdate(context: GraphContext) {
        context.scale(1 / this._scale);
        context.rotate(-this.rotationAngle)
        context.translate(this.position.scale(-1))
    }
}


export {GameObject, ObjectType};



