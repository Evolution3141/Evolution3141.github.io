


class DNA {

  #init () {
    for (let i = 0;i < this.genes.length;i++) {
      this.genes[i] = Vector.random();
    }
  }

  //* Constructor 
  constructor (genes) {
    if (genes) {
      this.genes = genes;
    }else {
      this.genes = new Array(800);
      this.#init();
    }

    this.step = 0;
  }

  getStep () {
    const nextGene = this.genes[this.step];

    this.step++;

    return nextGene;
  }

  validStap () {
    return (this.step  < this.genes.length);
  }

  crossover (parent) {
    const half = Math.floor(this.genes.length / 2);
    const newGenes = new Array(this.genes.length);


    for (let i = 0;i < this.genes.length;i++) {
      if (i < half) {
        newGenes[i] = this.genes[i];
      }else {
        newGenes[i] = parent.genes[i];
      }
    }

    return new DNA(newGenes);
  }

  mutate () {
    const mutateRate = 0.01;

    for (let i = 0;i < this.genes.length;i++) {
      const rand = Math.random();

      if (rand < mutateRate) {
        this.genes[i] = Vector.random();
      } 
    }
  }

}

