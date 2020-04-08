export const PK10_TEXT_INPUT_PLACEHOLDER = `说明：1.支持常见的各种单式格式，间隔符如:空格、回车、逗号、分号。
	   2.上传文件必须是.txt或是.csv格式
	   3.文件较大时会导致上传时间较长，请耐心等候
	   格式范例: 01 02 03 04 05,02 03 04 05 06,03 04 05 06 07`;

export function generatePk10FilterData(data) {
	const isLastSpace = /\s/.test(data.charAt(data.length - 1));
	const lastCharacter = isLastSpace ? ' ' : '';
	const dataArray1 = data.split(/[,\n;]/);
	const dataArray2 = dataArray1.map(function (data) {
		const _data = data.trim().split(/[\s]/).filter((item) => !!item);

		return [...new Set(_data),].join(' ');
	});

	const dataSet = new Set(dataArray2);

	return [...dataSet,].join(',') + lastCharacter;
}
