export const numberFormatter = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const letter_ascii = 117;
export const get_letter = (id) => String.fromCharCode(id + letter_ascii);

export const roundNumber = (x, decimal_didgits = 3) => {
  const exponent = Math.pow(10, decimal_didgits);
  return Math.round(x * exponent) / exponent;
}


export const getMinMax2DArr = (arr) => {
  const n = arr.length;
  const minVal = n === 0 ? 0 : Math.floor(Math.min(...arr[0], ...arr[1]));
  const maxVal = n === 0 ? 1 : Math.ceil(Math.max(...arr[0], ...arr[1]));
  return { minVal, maxVal }
}

// get min and max of array based on the column index
// a=[[1,2],[3,5],[0,1]]
export const get_max = (arr, index) => {
  if (arr === undefined || arr.length === 0) {
    return 0
  }
  return arr.reduce((max, arr) => {
    return max >= arr[index] ? max : arr[index];
  }, -Infinity);
}

export const get_min = (arr, index) => {
  if (arr === undefined || arr.length === 0) {
    return 0
  }
  return arr.reduce((min, arr) => {
    return min <= arr[index] ? min : arr[index];
  }, Infinity);
}