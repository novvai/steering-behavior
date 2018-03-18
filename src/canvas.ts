export abstract class Canvas {
    public element: HTMLElement | null;
    public context: CanvasRenderingContext2D | null;
    public canvas: HTMLElement | null;
    protected mouseX: number;
    protected mouseY: number;
    protected width: number;
    protected height: number;
    protected frames: number 
    = 60;
    protected anim:number;

    constructor(elId: string, width: number, height: number) {
        this.element = <HTMLElement>document.getElementById(elId);
        this.width = width;
        this.height = height;
        this.createCanvas(width, height);
        this.setAnimation();
    }

    protected setFrames(fr:number) {
        this.frames = fr;
        this.resetAnimation();
    }

    private resetAnimation() {
        clearInterval(this.anim);
        this.setAnimation();
    }


    private createCanvas(width: number, height: number): void {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width", `${width}`);
        canvas.setAttribute("height", `${height}`);
        canvas.setAttribute("style", `border:1px solid #000000`);
        let context = canvas.getContext("2d")

        this.element!.appendChild(canvas);

        this.context = context;
        this.canvas = canvas;

        // this.context!.translate(this.width / 2, this.height / 2)
        
        this.canvas!.addEventListener("mousemove", e=> {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        })
    }

    private setAnimation(): void {
        this.anim = setInterval(() => {
            this.draw();
        }, 1000/this.frames)
    }

    protected abstract draw(): void;
}
