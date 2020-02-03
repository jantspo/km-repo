export default function (value) {
    if(!value) return 'N/A' 
    return new Intl.NumberFormat('en-US', 
    { style: 'currency', currency: 'USD' }
    ).format(value);
}