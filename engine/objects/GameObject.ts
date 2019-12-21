import {v4 as uuid} from "uuid";
import SearchIndexImpl from "../index/SearchIndexImpl";
import Vector2D from "../math/2DVector";

enum ObjectType {
    FORCE,
    BODY,
    COMPONENT
}

class GameObject {
    private readonly tags: Array<string>;
    private readonly type: ObjectType;
    private readonly id: string;
    private readonly position: Vector2D;

    constructor(type: ObjectType, position?: Vector2D) {
        this.id = uuid();
        this.tags = new Array<string>();
        this.type = type;
        this.position = position === undefined ? Vector2D.random() : position;
    }

    public getPosition(): Vector2D {
        return this.position;
    }

    public getId(): string {
        return this.id;
    }

    public getType(): ObjectType {
        return this.type;
    }

    public mark(tag: string | Array<string>) {
        if (Array.isArray(tag)) {
            tag.forEach(tag => {
                if (!this.tags.includes(tag)) {
                    this.tags.push(tag)
                }
            })
        } else {
            if (!this.tags.includes(tag)) {
                this.tags.push(tag)
            }
        }
        SearchIndexImpl.instance().update(this);
    }

    public getTags(): Array<string> {
        return this.tags;
    }
}

export {GameObject, ObjectType};



