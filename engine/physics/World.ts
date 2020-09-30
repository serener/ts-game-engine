import {GameObject} from "../objects/GameObject";
import Vector from "../math/Vector";
import RigidBodyComponent from "../objects/components/RigidBodyComponent";
import Vector2D from "../math/2DVector";

export default class World
{
  private updates: { object: GameObject, position: Vector }[] = [];
  private lastUpdate: number = 0;
  private bodies = new Map<String, RigidBodyComponent>()

  constructor() {}

  register(body: RigidBodyComponent)
  {
    body.world = this;
    this.bodies.set(body.id, body);
  }

  get deltaTime()
  {
    if (this.lastUpdate == 0) {
      return 0;
    }
    return (Date.now() - this.lastUpdate) / 1000;
  }

  update(object: GameObject, position: Vector)
  {
    this.updates.push({object: object, position: position})
  }

  applyModifications()
  {
    this.bodies.forEach(body => {
      if (body.useGravity) {
        body.applyForce(new Vector2D(0, 9.8));
      }
    })

    this.updates.forEach(modification => {
      modification.object.position = modification.position;
    })

    this.lastUpdate = Date.now();
  }

}