import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const shippingOptions = [{
    id: '1',
    shippingDays: 7,
    priceCents: 0
}, {
    id: '2',
    shippingDays: 3,
    priceCents: 499
},{
    id: '3',
    shippingDays: 1,
    priceCents: 999
}]

export function getShippingOption(shippingOptionId) {
    let shippingOption;

    shippingOptions.forEach((option) => {
        if (option.id === shippingOptionId) {
            shippingOption = option;
        }
    });

    return shippingOption || shippingOptions[0];
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateShippingDate(shippingOption) {
    let remainingDays = shippingOption.shippingDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');

        if (!isWeekend(deliveryDate)) {
            remainingDays --;
        }
    }

    const dateString = deliveryDate.format(
        'ddd MMM D'
    );

    return dateString;
}