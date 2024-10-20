export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(amount)
}

export function formatDate(date: string) {
    return new Intl.DateTimeFormat('es-MX',
        {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    ).format(new Date(date));
}