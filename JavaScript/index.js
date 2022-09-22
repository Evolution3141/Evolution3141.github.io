

const pop = new Population(600);

function run() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw endpoint
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(endPoint.x , endPoint.y , 3 , 0, 2 * Math.PI);
  ctx.fill();

  //draw obsticles
  for (const obsticle of obsticles) {

    ctx.fillStyle = '#181818';
    ctx.fillRect(obsticle.pos.x, obsticle.pos.y ,
                obsticle.size.x, obsticle.size.y);
  }

  if (pop.allAreDead()) {
    //Generic Algorithm
    pop.calcFitness();
    pop.naturalSelection();
  }else {
    //update and render population
    pop.update(); 
    pop.render();
    pop.renderBest();
  }

  window.requestAnimationFrame(run);
}

window.requestAnimationFrame(run);

