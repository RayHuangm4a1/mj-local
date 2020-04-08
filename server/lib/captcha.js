const svgCaptcha = require('svg-captcha');

const CAPTCHA_CHARACTERS = "0123456789";
const CAPTCHA_LENGTH = 6;

function createCaptcha() {
	const { text, data: image } = svgCaptcha.create({
		charPreset: CAPTCHA_CHARACTERS,
		size: CAPTCHA_LENGTH,
	});

	return {
		text,
		image,
	};
}

module.exports = {
	createCaptcha,
};
