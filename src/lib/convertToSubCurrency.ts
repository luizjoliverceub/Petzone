function convertToSubCurrency (amount:number, factor = 100){
    return Math.round(amount * 100)
}

export default convertToSubCurrency