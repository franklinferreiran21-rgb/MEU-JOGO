class Joystick {
    constructor() {
        this.base = document.getElementById('joystick-base');
        this.stick = document.getElementById('joystick-stick');
        this.active = false;
        this.vector = { x: 0, y: 0 };
        this.maxRadius = 35; 
        this.origin = { x: 0, y: 0 };
        this.pointerId = null; 

        this.init();
    }

    init() {
        this.base.addEventListener('pointerdown', this.handleStart.bind(this));
        document.addEventListener('pointermove', this.handleMove.bind(this));
        document.addEventListener('pointerup', this.handleEnd.bind(this));
        document.addEventListener('pointercancel', this.handleEnd.bind(this));
    }

    handleStart(e) {
        if (this.active) return; 

        this.active = true;
        this.pointerId = e.pointerId; 

        const rect = this.base.getBoundingClientRect();
        this.origin.x = rect.left + rect.width / 2;
        this.origin.y = rect.top + rect.height / 2;
        this.stick.style.transition = 'none'; 
        this.handleMove(e);
    }

    handleMove(e) {
        if (!this.active || e.pointerId !== this.pointerId) return;

        let dx = e.clientX - this.origin.x;
        let dy = e.clientY - this.origin.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.maxRadius) {
            dx = (dx / distance) * this.maxRadius;
            dy = (dy / distance) * this.maxRadius;
        }

        this.stick.style.transform = `translate(${dx}px, ${dy}px)`;
        
        this.vector.x = dx / this.maxRadius;
        this.vector.y = dy / this.maxRadius;
    }

    handleEnd(e) {
        if (e.pointerId !== this.pointerId) return;

        this.active = false;
        this.pointerId = null;
        this.vector = { x: 0, y: 0 };
        this.stick.style.transition = 'transform 0.2s ease-out';
        this.stick.style.transform = `translate(0px, 0px)`; 
    }

    getVector() {
        return this.vector;
    }
}
