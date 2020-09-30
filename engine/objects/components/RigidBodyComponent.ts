import {GameObject} from "../GameObject";
import Vector from "../../math/Vector";
import GraphContext from "../../GraphContext";
import World from "../../physics/World";
import Vector2D from "../../math/2DVector";

const ONE_FRAME_RENDER_TIME : number = 0.016;

export default class RigidBodyComponent extends GameObject
{
  private _world: World;
  public mass: number = 1.0;
  public velocity: Vector = Vector2D.zero();
  public useGravity = true;

  set world(world: World)
  {
    this._world = world;
  }

  get world(): World
  {
    return this._world;
  }

  public applyForce(force: Vector, time?: number)
  {
    let acceleration = force.scale(1 / this.mass);
    this.velocity = this.velocity.plus(acceleration.scale(ONE_FRAME_RENDER_TIME));
  }

  update(context: GraphContext)
  {
    this._world.update(this.parent, this.parent.position.plus(this.velocity));
  }

  beforeUpdate(context: GraphContext)
  {
  }

  afterUpdate(context: GraphContext)
  {
  }

}