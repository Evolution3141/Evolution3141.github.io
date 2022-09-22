const radius = 3;

class Point {
  
  //* Constructor 
  constructor (dna) {
    //Physics
    this.pos = new Vector(250 , 40);
    this.vel = new Vector();
    this.acc = new Vector();

    //Genetic
    if (dna) {
      this.dna = dna;
    }else {
      this.dna = new DNA();
    }
    this.fitness = 0;

    //Other
    this.dead = false;
    this.goalReached = false;
    this.isBest = false;
  }


  applyForce (force) {
    this.acc.add(force);
  }


  update () {
    if (this.dead || this.goalReached) return;

    //apply force

   if (this.dna.validStap()) {
    this.applyForce(this.dna.getStep());
   }else {
     this.dead = true;
     //this.applyForce(this.dna.genes[this.dna.genes.length - 1]);
   }


    //check collision with canvas 
    if (this.pos.x + radius > canvas.width ||
        this.pos.x - radius < 0 ||
        this.pos.y + radius > canvas.height ||
        this.pos.y - radius < 0) {

      this.dead = true;
    }
    
    //Ceck collison with end point
    const distance = Math.sqrt((this.pos.x - endPoint.x) ** 2 + (this.pos.y - endPoint.y) ** 2);

    if (distance < radius + endPoint.radius) {
      this.goalReached = true;
    } 

    //Check collision with obsticles
    for (const obsticle of obsticles) {
      if (this.pos.x + radius > obsticle.pos.x &&
          this.pos.x - radius <  obsticle.pos.x + obsticle.size.x &&
          this.pos.y + radius > obsticle.pos.y && 
          this.pos.y - radius < obsticle.pos.y + obsticle.size.y) {
      
        this.dead = true;
      }
    }

    //Update physics
    this.vel.add(this.acc);
    this.vel.limit(3.5);
    this.pos.add(this.vel);

    this.acc.mult(0);
  }

  calcFitness () {
    const distance = Math.sqrt((this.pos.x - endPoint.x) ** 2 + (this.pos.y - endPoint.y) ** 2);

    if (this.goalReached) {
      this.fitness = 100000 / this.dna.step ** 2;
    }else {
      this.fitness = 100 / distance ** 2;
    }
  }

  render () {
    if (this.dead || this.isBest) return;
    let color = '#8758FF';

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.pos.x , this.pos.y , radius , 0, 2 * Math.PI);
    ctx.fill();
  }

  renderBest () {
    if (this.dead || !this.isBest) return;
    let color = '#FFDE00';

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.pos.x , this.pos.y , radius , 0, 2 * Math.PI);
    ctx.fill();
  }
  
  clone () {
    const newDNA = new DNA(this.dna.genes);

    const newPoint = new Point(newDNA);

    return newPoint;
  }
}