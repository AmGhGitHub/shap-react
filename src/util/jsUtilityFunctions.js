export const numberFormatter = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const letter_ascii = 117;
export const get_letter = (id) => String.fromCharCode(id + letter_ascii);
