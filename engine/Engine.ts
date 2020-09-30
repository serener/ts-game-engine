import SearchIndex from "./index/SearchIndex";
import {GameObject, ObjectType} from "./objects/GameObject";
import GraphContext from "./GraphContext";
import DotComponent from "./objects/components/DotComponent";
import ImageComponent from "./objects/components/ImageComponent";
import TextComponent from "./objects/components/TextComponent";
import SpriteComponent from "./objects/components/SpriteComponent";
import ImageAsset from "./assets/ImageAsset";
import {ImageResizer} from "./assets/ImageResizer";
import RigidBodyComponent from "./objects/components/RigidBodyComponent";
import World from "./physics/World";

export default class Engine
{
  private _context: GraphContext;
  private _index: SearchIndex;
  private resizer: ImageResizer;
  private _world: World;

  constructor()
  {
    this._index = new SearchIndex();
    this.update = this.update.bind(this);
    this._world = new World();
  }

  setCanvas(canvas: HTMLCanvasElement)
  {
    this._context = new GraphContext(canvas);
    this.resizer = new ImageResizer();
    window.requestAnimationFrame(this.update);
  }

  get context(): GraphContext
  {
    return this._context;
  }

  get index(): SearchIndex
  {
    return this._index;
  }

  loadImageAsset(url: string, width ?: number, height ?: number): ImageAsset
  {
    let image;
    if (width !== undefined && height !== undefined) {
      image = new ImageAsset(url, this.resizer, width, height);
    } else {
      image = new ImageAsset(url, this.resizer);
    }
    return image;
  }

  createObject(type: ObjectType): GameObject
  {
    switch (type) {
      case ObjectType.RIGID_BODY: {
        let object = new RigidBodyComponent(this._index);
        object.type = type;
        this._world.register(object)
        return object;
      }
      case ObjectType.DOT_COMPONENT: {
        let object = new DotComponent(this._index);
        object.type = type;
        return object;
      }
      case ObjectType.IMAGE_COMPONENT: {
        let object = new ImageComponent(this._index);
        object.type = type;
        return object;
      }
      case ObjectType.SPRITE_COMPONENT: {
        let object = new SpriteComponent(this._index);
        object.type = type;
        return object;
      }
      case ObjectType.TEXT_COMPONENT: {
        let object = new TextComponent(this._index);
        object.type = type;
        return object;
      }
      default:
      case ObjectType.OBJECT: {
        let object = new GameObject(this._index);
        object.type = type;
        return object;
      }
    }
  }

  private update()
  {
    this._context.clear();

    for (let i = 0; i < this._index.getMaxLayers(); i++) {
      this._index.getLayer(i).objects.forEach(
        object => {
          if (object.visible) {
            object.beforeUpdate(this._context)
            object.update(this._context)
            object.afterUpdate(this._context)
          }
        });
    }
    this._world.applyModifications();
    window.requestAnimationFrame(this.update);
  }
}

