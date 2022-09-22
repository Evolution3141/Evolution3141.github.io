const shiftArray = (arr, place , value) => {
  for (let i = arr.length - 1;i > place;i--) {
    arr[i] = arr[i - 1]; 
  }

  arr[place] = value;
}

const findTopX = (arr , num) => {

  if (num === 0) return [];

  num = Math.min(arr.length, num);

  const best = new Array(num).fill(0);

  for (let i = 0;i < arr.length;i++) {
    let j = 0 , found = false;    

    while (j < num && !found) {

      if (arr[i].fitness > (best[j].fitness || best[j])) {
        found = true;
        shiftArray(best , j , arr[i]);
      }

      j++;
    }
  } 

  return best;
};

