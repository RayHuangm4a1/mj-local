export const DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER = `说明：1.支持常见的各种单式格式，间隔符如：空格、回车、逗号、分号。
	    2.上传文件必须是.txt或.csv格式
	    3.文件较大时会导致上传时间较长，请耐心等候
	      格式范例：01 02 03,02 03 04,11 08 07`;

export function getDanTouNextData(stars, index1, index2, data) {
	if (data[index1].codes[index2].isSelected) {
		data[index1].codes[index2].isSelected = false;
	} else {
		data[index1].codes[index2].isSelected = true;
		if (index1 === 0) {
			let count = 0;
			const pivot1 = stars - 2;
			const pivot2 = stars - 1;

			data[0].codes = data[0].codes.map(function (code, index) {
				if (code.isSelected && count < pivot1) {
					count++;
				} else if (code.isSelected && count < pivot2) {
					if (index2 > index) {
						code.isSelected = false;
					} else {
						code.isSelected = true;
						count++;
					}
				} else {
					code.isSelected = false;
				}
				return code;
			});
			data[1].codes = data[1].codes.map(function (code, index) {
				if (index2 === index) {
					code.isSelected = false;
				}
				return code;
			});
		} else if (index1 === 1) {
			data[0].codes = data[0].codes.map(function (code, index) {
				if (index2 === index) {
					code.isSelected = false;
				}
				return code;
			});
			data[1].codes[index2].isSelected = true;
		}
	}
	return data;
}

export function generate11x5FilterData(data) {
	const isLastSpace = /\s/.test(data.charAt(data.length - 1));
	const lastCharacter = isLastSpace ? ' ' : '';
	const dataArray1 = data.split(/[,\n;]/);
	const dataArray2 = dataArray1.map(function (data) {
		const _data = data.trim().split(/[\s]/).filter((item) => !!item);

		return [...new Set(_data), ].join(' ');
	});

	const dataSet = new Set(dataArray2);

	return [...dataSet, ].join(',') + lastCharacter;
}
