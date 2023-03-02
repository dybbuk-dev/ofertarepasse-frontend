const formatMoney = (price: number) => {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

export default formatMoney
