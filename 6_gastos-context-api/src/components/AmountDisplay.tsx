import { formatCurrency } from '../helpers/index';
type AmountDisplayProps = {
    label?: string,
    amount: number    
}

export default function AmountDisplay({label,amount}: AmountDisplayProps) {
  return (
    <p
    className="text-2xl font-bold text-blue-600"
    >
{label?`${label}: `:''}
 <span className="text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
