import { Canvas } from "./canvas";

import { Entity } from "./Entity";
import { Vector } from "./Vector";
import { Target } from "./Target";

export class Environment extends Canvas{
    public entity:Entity;
    public targets: Array<Target> = [];
    public mouseV: Vector;

    constructor(container:string, width:number, height:number) {
        super(container, width, height);
        this.setFrames(15);
        /** From here on is the canvas setup */

       this.generateFood(30)
        this.mouseV = new Vector()
        this.entity = new Entity(new Vector(10,10), this.context);
    }

    public generateFood(num:number){
        for (let index = 0; index < num; index++) {
            this.targets.push(new Target(Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height), this.context))

        }
    }
    /**
     * Display
     */
    protected draw() {
        if (Math.random() < 0.01) {
            this.generateFood(2);
        }
        if (this.mouseX && this.mouseY) {
            this.mouseV.x = this.mouseX;
            this.mouseV.y = this.mouseY;  
            console.log(this.mouseV);
        }
        
        this.context!.clearRect(0, 0, this.width, this.height)
        this.targets.forEach(el => {
            el.display();
        })
        // // this.targets.splice(1,30);
        this.entity.hunt(this.targets);
        // this.entity.seek(this.mouseV);
        this.entity.update();
        this.entity.draw();
    }
}