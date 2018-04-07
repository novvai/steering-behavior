import { Vector } from "./Vector";
import { Target } from "./Target";

export class Entity {
    public position : Vector;
    public contex : any;
    public velocity: Vector;
    public acc:Vector = new Vector();
    public speed:number;
    public force:number;

    constructor(position_:Vector, contex_:any){
        this.position = position_;
        this.contex = contex_;
        this.velocity = new Vector(1,1);
        this.speed = 4;
        this.force = 0.2;
    }

    public seek(target:Vector) {
        let desire = Vector.subtract(target, this.position);
        
        desire.setMagnitude(this.speed);
        
        let steer = Vector.subtract(desire, this.velocity);
 
        steer.limit(this.force);

        this.acc.add(steer);
    }

    /**
     * name
     */
    public hunt(targets:Array<Target>) {
        let dist = 1000000000;
        let closest:Target;
        let k:number = 0;
        
        targets.forEach((el , key)=> {
            let temp = new Vector(el.pos.x - this.position.x, el.pos.y - this.position.y).magnitude();
            if(dist > temp){
                closest = el;
                dist= temp;
                k = key;
            };
        })
        
        this.seek(closest!.pos);

        if (this.position.x > closest!.pos.x-7 && this.position.x < closest!.pos.x+7 
            && this.position.y > closest!.pos.y - 7 && this.position.y < closest!.pos.y + 7) {
                targets.splice(k, 1);
        }
    }

    public update(){
        this.velocity.add(this.acc);
        this.velocity.limit(this.speed);


        this.position.add(this.velocity);
        this.acc.multiply(0);
    }

    public draw() {
        this.contex.beginPath();
        this.contex.arc(this.position.x, this.position.y, 5,0, Math.PI * 2)
        this.contex.stroke();
    }
}