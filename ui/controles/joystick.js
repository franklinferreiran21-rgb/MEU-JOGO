let joystick = {
x: 0,
y: 0
};

export function getJoystick() {
return joystick;
}

export function moverJoystick(x, y) {
joystick.x = x;
joystick.y = y;
}