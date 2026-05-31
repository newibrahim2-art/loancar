exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405 };
    const { price, dp, rates, customYears } = JSON.parse(event.body);
    const rem = Math.max(0, price - dp);
    const fmt = (num) => Math.round(num).toLocaleString('en-US');

    const calc = (r, y) => {
        const interest = rem * y * (r / 100);
        const total = rem + interest;
        return {
            fin: fmt(rem),
            int: fmt(interest),
            mInt: fmt(interest / (y * 12)),
            tot: fmt(total),
            res: fmt(total / (y * 12))
        };
    };

    const response = {
        price: fmt(price),
        dp: fmt(dp),
        remaining: fmt(rem),
        3: calc(rates[3], 3),
        5: calc(rates[5], 5),
        7: calc(rates[7], 7),
        Custom: calc(rates.Custom, customYears)
    };

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};