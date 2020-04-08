import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import LabelText from '../components/label-text';

describe('Lable Content', () => {
	it('handle default props', () => {
		const {
			label,
			text,
			labelColType,
			fontSize,
			isFixedWidth,
			isSpaceBetween,
			labelColor,
			textColor,
		} = LabelText.defaultProps;

		expect(label).toBe('');
		expect(text).toBe('');
		expect(labelColType).toBe(LabelText.SizeEnums.MEDIUM);
		expect(fontSize).toBe(LabelText.SizeEnums.MEDIUM);
		expect(isFixedWidth).toBe(true);
		expect(isSpaceBetween).toBe(false);
		expect(labelColor).toBe(LabelText.ColorEnums.GREY);
		expect(textColor).toBe(LabelText.ColorEnums.BLACK);
	});

	it('should renders correctly', () => {
		const wrapper = render(
			<LabelText
				label="label"
				text="text"
				labelColType={LabelText.SizeEnums.LARGE}
				fontSize={LabelText.SizeEnums.LARGE}
				className="mock-classname"
				labelColor={LabelText.ColorEnums.LIGHT_BLACK}
				textColor={LabelText.ColorEnums.LIGHT_BLACK}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-label-text', () => {
		const wrapper = shallow(
			<LabelText
				label="label"
				text="text"
			/>
		);

		expect(wrapper.hasClass('ljit-label-text')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<LabelText
				label="label"
				text="text"
				className={className}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by ljit-label-text--col-auto', () => {
		const className = 'ljit-label-text--col-auto';
		const wrapper = shallow(
			<LabelText
				label="label"
				text="text"
				isFixedWidth={false}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by ljit-label-text--space-between', () => {
		const className = 'ljit-label-text--space-between';
		const wrapper = shallow(
			<LabelText
				label="label"
				text="text"
				isSpaceBetween={true}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const label = 'mock-label';
		const text = 'mock-text';
		const labelColType = LabelText.SizeEnums.LARGE;
		const fontSize = LabelText.SizeEnums.LARGE;
		const labelColor = LabelText.ColorEnums.LIGHT_BLACK;
		const textColor = LabelText.ColorEnums.LIGHT_BLACK
		const wrapper = mount(
			<LabelText
				className={className}
				label={label}
				text={text}
				labelColType={labelColType}
				fontSize={fontSize}
				labelColor={labelColor}
				textColor={textColor}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().label).toBe(label);
		expect(wrapper.props().text).toBe(text);
		expect(wrapper.props().labelColType).toBe(labelColType);
		expect(wrapper.props().fontSize).toBe(fontSize);
		expect(wrapper.props().labelColor).toBe(labelColor);
		expect(wrapper.props().textColor).toBe(textColor);

	});

	describe('Size Enums', () => {
		it('should contains large property', () => {
			const typeName = 'large';
			const sizeType = 'LARGE';

			expect(LabelText.SizeEnums[sizeType]).toEqual(typeName);
		});

		it('should contains medium property', () => {
			const typeName = 'medium';
			const sizeType = 'MEDIUM';

			expect(LabelText.SizeEnums[sizeType]).toEqual(typeName);
		});

		it('should contains small property', () => {
			const typeName = 'small';
			const sizeType = 'SMALL';

			expect(LabelText.SizeEnums[sizeType]).toEqual(typeName);
		});
	});
	describe('Color Enums', () => {
		it('should contains grey property', () => {
			const typeName = 'grey';
			const colorType = 'GREY';

			expect(LabelText.ColorEnums[colorType]).toEqual(typeName);
		});
		it('should contains black property', () => {
			const typeName = 'black';
			const colorType = 'BLACK';

			expect(LabelText.ColorEnums[colorType]).toEqual(typeName);
		});
		it('should contains light-black property', () => {
			const typeName = 'light-black';
			const colorType = 'LIGHT_BLACK';

			expect(LabelText.ColorEnums[colorType]).toEqual(typeName);
		});
	});
});
