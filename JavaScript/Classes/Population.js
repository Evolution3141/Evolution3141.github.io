const p1 = document.getElementById('generations');

class Population {
  //* Private

  #init () {
    for (let i = 0;i < this.pop.length;i++) {
      this.pop[i] = new Point();
    }
  }


  //* Constructor 
  constructor (size) {
    this.pop = new Array(size);

    this.generation = 0;
    this.fitnessSum = 0;

    this.bestPoint  = null;
    this.#init();
  }


  update () {
    for (const point of this.pop) {
      point.update();
    }
  }

  render () {
    for (const point of this.pop) {
      point.render();
    }
  }

  renderBest () {
    for (const point of this.pop) {
      point.renderBest();
    }
  }

  calcFitness () {
    this.fitnessSum = 0;
    for (const point of this.pop) {
      point.calcFitness();
      this.fitnessSum += point.fitness;
    }
  }

  naturalSelection () {
    this.generation++;
    const newPop = new Array(this.pop.length);

    const top = findTopX(this.pop , 5);

    for (let i = 0;i < top.length;i++) {

      newPop[i] = top[i].clone(); 

      newPop[i].isBest = true;
    }
    
    for (let i = top.length;i < newPop.length;i++) {
      const parentA = this.pickParent().dna;
      const parentB = this.pickParent().dna;

      const childDNA = parentA.crossover(parentB);

      childDNA.mutate();

      newPop[i] = new Point(childDNA);  
    }

    p1.innerHTML = `Generation # : ${this.generation + 1}`;
    this.pop = newPop;
  }

  pickParent () {
    const randomFitness = Math.random() * this.fitnessSum;
    let runningSum = 0;

    for (let i = 0;i < this.pop.length;i++) {

      runningSum += this.pop[i].fitness;

      if (randomFitness - runningSum <= 0) {
        return this.pop[i];
      }
    }

    //never happens
    return null;
  }

  allAreDead () {
    for (const point of this.pop) {
      if (!point.dead && !point.goalReached) return false;
    }

    return true;
  }
}