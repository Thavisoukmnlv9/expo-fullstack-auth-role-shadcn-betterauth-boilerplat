export const formatMoney = (amount: number, currency: string): string => {
  switch (currency) {
    case 'USD':
      return `$${amount.toFixed(2)}`
    case 'THB':
      return `THB ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    case 'LAK':
      return `LAK ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    default:
      return `${currency} ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  }
}
