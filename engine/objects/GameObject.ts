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
    private _rotationCenter: Vector2D = Vector2D.zero();
    private _drawRotationCenter: boolean = false;
    private _scale: number;
    private _components: Array<GameObject>;
    private _visible: boolean = true;
    private _name: string;

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

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get drawRotationCenter(): boolean {
        return this._drawRotationCenter;
    }

    set drawRotationCenter(value: boolean) {
        this._drawRotationCenter = value;
    }

    get visible(): boolean {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
    }

    get rotationCenter(): Vector2D {
        return this._rotationCenter;
    }

    set rotationCenter(value: Vector2D) {
        this._rotationCenter = value;
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
            if (component.visible) {
                component.beforeUpdate(context);
                component.update(context);
                component.afterUpdate(context);
            }
        })
    }

    public beforeUpdate(context: GraphContext) {
        context.translate(this._position);
        context.scale(this._scale);

        //rotate around rotation center
        context.translate(this._rotationCenter);
        context.rotate(this._rotationAngle);
        context.translate(this._rotationCenter.scale(-1));
    }

    private showRotationCenter(context: GraphContext) {
        if (this.drawRotationCenter) {
            let oldColor = context.color;
            context.color = "orange"
            context.arc(1, 0, Math.PI * 2)
            context.color = oldColor;
        }
    }

    public afterUpdate(context: GraphContext) {

        //rotate back around rotation center
        context.translate(this._rotationCenter);
        this.showRotationCenter(context);
        context.rotate(-this.rotationAngle)

        context.translate(this._rotationCenter.scale(-1));

        context.scale(1 / this._scale);
        context.translate(this.position.scale(-1))
    }
}


export {GameObject, ObjectType};



