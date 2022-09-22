

const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);

canvas.width = 600;
canvas.height = 800;

const endPoint = {
  x : 500,
  y : 500,
  radius : 1
}

const obsticles = [
  new Obsticle(300 , 400 , 200 , 20),
  new Obsticle(100 , 200 , 200 , 20),
  new Obsticle(400 , 250 , 20 , 100),
  new Obsticle(400 , 250 , 200 , 20),
  new Obsticle(300 , 400 , 20 , 200),
  new Obsticle(300 , 750 , 20 , 200),
];  

