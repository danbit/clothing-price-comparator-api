const matchPrice = (str = '0.0') => {
  return str.replace(',', '.').match(/\d{1,4}[,\\.]?(\d{1,2})/g)
}

export { matchPrice }
