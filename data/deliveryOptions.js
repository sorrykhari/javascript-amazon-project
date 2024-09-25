import  dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [{
	id: '1',
	deliveryDays: 7,
	priceCents: 0
},
{
	id: '2',
	deliveryDays: 3,
	priceCents: 499
},
{
	id: '3',
	deliveryDays: 1,
	priceCents: 999
}
];

function isWeekend(date) {
	const dayOfWeek = date.format('dddd');
	if (dayOfWeek === 'Saturday') {
		return dayOfWeek;
	}
	else if (dayOfWeek === 'Sunday') {
		return dayOfWeek
	}
	else {
		return null;
	}
}

export function getDeliveryOption(deliveryOptionId) {
	let deliveryOption;

	deliveryOptions.forEach((option) => {
		if (deliveryOptionId === option.id) {
			deliveryOption = option;
		}
});

	return deliveryOption	|| deliveryOptions[0];
}

export function caluclateDeliveryDate(deliveryOption) {
	let date = dayjs() // Date is today
	let deliveryDays = deliveryOption.deliveryDays; // The 1, 3 or 7 option picked

	// make a while loop while numberLoop =/= 0
	while (deliveryDays != 0) {
		if (isWeekend(date)){
			date = date.add(1, 'day');
		}
		else {
			date = date.add(1, 'day');
			deliveryDays--;
		}
	}

	if (isWeekend(date) === 'Saturday'){
		date = date.add(2, 'day');
	}
	else if (isWeekend(date) === 'Sunday') {
		date = date.add(1, 'day');
	}
	
	const dateString = date.format('dddd, MMMM D');
	return dateString;
}