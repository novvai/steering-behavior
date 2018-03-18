import { Vector } from "./Vector";
import { Target } from "./Target";

export class Entity {
    public position : Vector;
    public contex : any;
    public velocity: Vector;
    public acc:Vector = new Vector(0,0);
    public speed:number;
    public force:number;

    constructor(position_:Vector, contex_:any){
        this.position = position_;
        this.contex = contex_;
        this.velocity = new Vector(0,0);
        this.speed = 1;
        this.force = 0.1;
    }

    public seek(target:Vector) {
        
        let desire = new Vector(target.x - this.position.x, target.y - this.position.y);
        console.log(target);
        desire.setMagnitude(this.speed);

        let steer = new Vector(desire.x - this.velocity.x, desire.y - this.velocity.y);
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
        console.log(closest!);
        this.seek(closest!.pos);
        if (this.position.x > closest!.pos.x-7 && this.position.x < closest!.pos.x+7 
            && this.position.y > closest!.pos.y - 7 && this.position.y < closest!.pos.y + 7) {
                targets.splice(k, 1);
        }
    }

    public update(){
        this.velocity.add(this.acc);
        this.position.add(this.velocity);
        this.acc.multiply(0);
        this.velocity.limit(0.9);
    }

    public draw() {
        this.contex.beginPath();
        this.contex.arc(this.position.x, this.position.y, 5,0, Math.PI * 2)
        this.contex.stroke();
    }
}