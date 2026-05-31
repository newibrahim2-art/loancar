exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405 };
    const { price, dp, rates, customYears } = JSON.parse(event.body);
    const rem = Math.max(0, price - dp);
    const fmt = (num) => Math.round(num).toLocaleString('en-US');

    const calc = (r, y) => {
        const interest = rem * y * (r / 100);
        const total = rem + interest;
        const months = y * 12;
        return {
            fin: fmt(rem),
            int: fmt(interest),
            mInt: months > 0 ? fmt(interest / months) : 0,
            tot: fmt(total),
            res: months > 0 ? fmt(total / months) : 0
        };
    };

    return {
        statusCode: 200,
        body: JSON.stringify({
            price: fmt(price),
            dp: fmt(dp),
            remaining: fmt(rem),
            3: calc(rates[3], 3),
            5: calc(rates[5], 5),
            7: calc(rates[7], 7),
            Custom: calc(rates.Custom, customYears)
        })
    };
};
