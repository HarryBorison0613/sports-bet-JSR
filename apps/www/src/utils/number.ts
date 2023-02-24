export const percentage = (total: number, quantity: number) => {
  const value = +((quantity / total) * 100).toPrecision(2)

  return value > 100 ? 100 : value ?? 0
}
