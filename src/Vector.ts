export class Vector {
    public x: number;
    public y: number;

    constructor(x?: number, y?: number) {
        this.setX(x);
        this.setY(y);
    }

    private setX(x = 0) {
        this.x = x;
    }
    private setY(y = 0) {
        this.y = y;
    }

    /**
     * Retrieves the magnitude/lenght of the magnitude;
     */
    public magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * Normilizes the vector by dividing it by its magnitude
     */
    public normilize() {
        let magnitude = this.magnitude();
        
        if (magnitude != 0 && magnitude != 1) {
            this.x = this.x / magnitude;
            this.y = this.y / magnitude;
        }

        return this;
    }

    /**
     * Retrieves radian representation of an angle
     */
    public heading() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Adds two vectors together
     */
    public add(vec: Vector | any, y?: number) {
        if (y !== undefined) {
            this.x += vec;
            this.y += y;
        } else {
            this.x += vec.x;
            this.y += vec.y
        }

        return this;
    }


    /**
     * Subtract two Vectors
     */
    public subtract(vec: Vector | any, y?: number) {
        if (y !== undefined) {
            this.x -= vec;
            this.y -= y;
        } else {
            this.x -= vec.x;
            this.y -= vec.y
        }

        return this;
    }

    /**
     * Sets the lenght of Vector
     */
    public setMagnitude(magnitude: number) {
        this.normilize();
        this.multiply(magnitude);

        return this;
    }

    /**
     * Multiplies the Vector by given values
     * 
     * @param num : number 
     */
    public multiply(num: number) {
        this.x *= num;
        this.y *= num;

        return this;
    }

    public magnitudeNorm() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    public limit(lim: number) {
        if (this.magnitudeNorm() > lim * lim) {
            this.normilize()
            this.multiply(lim);
        }
        
        return this;
    }

    /**
     * creates new Vector from two other as they are subtracted from each other
     * 
     * @param base {Vector}
     * @param sub {Vector}
     */
    public static subtract(base: Vector, sub: Vector) {
        return new Vector(base.x - sub.x, base.y - sub.y);
    }

    /**
     * creates new Vector from two other as they are added to each other
     * 
     * @param base {Vector}
     * @param sub {Vector}
     */
    public static add(base: Vector, add: Vector) {
        return new Vector(base.x + add.x, base.y + add.y);
    }
}