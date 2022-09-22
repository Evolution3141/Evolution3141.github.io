


class Vector {
  //* Static
  static random() {
    const randomAngle = Math.random() * 2 * Math.PI;

    const x = Math.cos(randomAngle);
    const y = Math.sin(randomAngle);

    return new Vector(x , y);
  }


  //* Constructor 
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(otherVector) {
    this.x += otherVector.x;
    this.y += otherVector.y;
  }

  mult(factor) {
    this.x *= factor;
    this.y *= factor;
  }

  limit(num) {
    const hyp = Math.sqrt(this.x ** 2 + this.y ** 2);

    this.x = this.x / hyp * num;
    this.y = this.y / hyp * num;
  }
}