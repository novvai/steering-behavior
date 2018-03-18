import { Vector } from "./Vector";
export class Target {

    public pos : Vector;
    public context : any;

    constructor (x:number, y:number, context:any){
        this.pos = new Vector(x,y);
        this.context = context;
    }

    /**
     * name
     */
    public display() {
        this.context.beginPath();
        this.context.styleColor = 'green';
        this.context.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2);
        this.context.fillStyle = "red";
        this.context.fill();
    }
}