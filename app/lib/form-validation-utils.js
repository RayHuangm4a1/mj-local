const regexOneNumberAndOneAlphabet = /^(?=.*[A-Za-z])(?=.*\d)(?=.)[A-Za-z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\d]*$/;
const regexSpace = /\s/g;
const regexAtLeastOneAlphabetAndOnlyAlphabetAndNumber = /^(?=^[a-zA-Z0-9_]*$)(?=.*\D)/;

// TODO 確認帳號密碼的驗證規則
export function validatePassword(text) {
	return function(rule, value, callback) {
		if (rule.required) {
			if (value.length < 6) {
				callback(`${text}最少6码`);
			} else if (value.length > 20) {
				callback(`${text}最多20码`);
			} else if (regexSpace.test(value)) {
				callback(`${text}不能有空白`);
			} else if (!regexOneNumberAndOneAlphabet.test(value)) {
				callback(`${text}应至少包含1个英文和1个数字`);
			}
		}
		callback();
	};
}

export function validateUsername(text) {
	return function(rule, value, callback) {
		if (rule.required) {
			if (value.length < 5) {
				callback(`${text}最少5码`);
			} else if (value.length > 15) {
				callback(`${text}最多15码`);
			} else if (regexSpace.test(value)) {
				callback(`${text}不能有空白`);
			} else if (!regexAtLeastOneAlphabetAndOnlyAlphabetAndNumber.test(value)) {
				callback(`${text}应至少包含1个英文且不能有英文跟数字之外的字元`);
			}
		}
		callback();
	};
}
