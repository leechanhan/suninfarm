// 배너 날짜 파싱
export const handleParseDate = (date) => {
	const year = date.substring(0, 4);
	const month = date.substring(4, 6);
	const day = date.substring(6, 8);
	let hour = parseInt(date.substring(8, 10), 10);
	const minute = date.substring(10, 12);
	const ampm = hour >= 12 ? 'PM' : 'AM';

	hour = hour % 12;
	hour = hour ? hour : 12;

	return `${month}월${day}일 ${ampm} ${hour.toString().padStart(2, '0')}:${minute}`;
};

// 라이브 세일날짜 파싱
export const handleParseDateForMonthDateDay = (yyyymmdd) => {
	const year = yyyymmdd.substring(0, 4);
	const month = yyyymmdd.substring(4, 6);
	const day = yyyymmdd.substring(6, 8);

	const date = new Date(year, month - 1, day);

	const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

	return `${month}월 ${day}일(${weekdays[date.getDay()]})`;
};
