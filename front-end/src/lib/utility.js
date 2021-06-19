export const parseCookieObject = (obj) => {
	if (!obj) return '';
	let parsed = '';

	for (const cookie in obj) {
		if (obj.hasOwnProperty(cookie)) {
			parsed += `${cookie}=${obj[cookie]}; `;
		}
	}
	return parsed;
};
