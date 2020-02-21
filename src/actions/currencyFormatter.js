export const currencyFormatter = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  const amount = Number.parseFloat(value)

  return formatter.format(amount)
}
