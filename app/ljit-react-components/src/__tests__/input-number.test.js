import React from 'react';
import { shallow, mount, } from 'enzyme';
import InputNumber from '../components/input-number';

jest.mock('antd/lib/input-number');

describe('Input Number', () => {
	it('handle default props', () => {
		const {
			disabled,
			readOnly,
			onChange,
		} = InputNumber.defaultProps;

		expect(disabled).toEqual(false);
		expect(readOnly).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const value = 1;
		const min = 0;
		const max = 50;
		const step = 2;
		const wrapper = shallow(
			<InputNumber
				min={min}
				max={max}
				step={step}
				value={value}
				placeholder="mock-placeholder"
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-input-number', () => {
		const wrapper = shallow(<InputNumber />);

		expect(wrapper.hasClass('ljit-input-number')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<InputNumber className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const value = 1;
		const onChange = jest.fn();
		const wrapper = shallow(<InputNumber value={value} onChange={onChange} />);

		wrapper.simulate('change', value);
		expect(onChange).toBeCalledWith(value);
	});

	it('should mount in a full DOM', () => {
		const disabled = false;
		const id = 'mock-id';
		const defaultValue = 1;
		const value = 2;
		const placeholder = 'mock-placeholder';
		const className = 'mock-class';
		const readOnly = false;
		const formatType = 'percentage';
		const max = 0;
		const min = 10;
		const step = 1;
		const style = { color: '#F00', };
		const onChange = () => {};
		const onFocus = () => {};
		const onBlur = () => {};

		const wrapper = mount(
			<InputNumber
				disabled={disabled}
				id={id}
				defaultValue={defaultValue}
				value={value}
				placeholder={placeholder}
				className={className}
				readOnly={readOnly}
				formatType={formatType}
				max={max}
				min={min}
				step={step}
				style={style}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		);

		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().id).toBe(id);
		expect(wrapper.props().defaultValue).toBe(defaultValue);
		expect(wrapper.props().value).toBe(value);
		expect(wrapper.props().placeholder).toBe(placeholder);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().formatType).toBe(formatType);
		expect(wrapper.props().max).toBe(max);
		expect(wrapper.props().min).toBe(min);
		expect(wrapper.props().step).toBe(step);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().onFocus).toEqual(onFocus);
		expect(wrapper.props().onBlur).toEqual(onBlur);
	});

	describe('Format Type Enums', () => {
		it('should contains percentage property', () => {
			const typeName = 'percentage';
			const formatType = 'PERCENTAGE';

			expect(InputNumber.FormatTypeEnums[formatType]).toEqual(typeName);
		});

		it('should contains currency property', () => {
			const typeName = 'currency';
			const formatType = 'CURRENCY';

			expect(InputNumber.FormatTypeEnums[formatType]).toEqual(typeName);
		});

		it('should contains yuan property', () => {
			const typeName = 'yuan';
			const formatType = 'YUAN';

			expect(InputNumber.FormatTypeEnums[formatType]).toEqual(typeName);
		});

		it('should contains multiple property', () => {
			const typeName = 'multiple';
			const formatType = 'MULTIPLE';

			expect(InputNumber.FormatTypeEnums[formatType]).toEqual(typeName);
		});
	});

	describe('Format Enums', () => {
		describe('Percentage', () => {
			let typeName;
			let formatEnum;

			beforeEach(() => {
				typeName = InputNumber.FormatTypeEnums.PERCENTAGE;
				formatEnum = InputNumber.FormatEnums[typeName];
			});
			afterEach(() => {
				typeName = undefined;
				formatEnum = undefined;
			});

			it('should be defined', () => {
				expect(formatEnum).toBeDefined();
			});

			it('should format 90 to 90%', () => {
				const value = 90;

				expect(formatEnum.formatter).toBeDefined();
				expect(formatEnum.formatter).toBeInstanceOf(Function);
				expect(formatEnum.formatter(value)).toBe('90%');
			});

			it('should parser 80% to 80', () => {
				const value = '80%';

				expect(formatEnum.parser).toBeDefined();
				expect(formatEnum.parser).toBeInstanceOf(Function);
				expect(formatEnum.parser(value)).toBe('80');
			});
		});

		describe('Currency', () => {
			let typeName;
			let formatEnum;

			beforeEach(() => {
				typeName = InputNumber.FormatTypeEnums.CURRENCY;
				formatEnum = InputNumber.FormatEnums[typeName];
			});
			afterEach(() => {
				typeName = undefined;
				formatEnum = undefined;
			});

			it('should be defined', () => {
				expect(formatEnum).toBeDefined();
			});

			it('should format 1000000 to $ 1,000,000', () => {
				const value = 1000000;

				expect(formatEnum.formatter).toBeDefined();
				expect(formatEnum.formatter).toBeInstanceOf(Function);
				expect(formatEnum.formatter(value)).toBe('$ 1,000,000');
			});

			it('should format 100 to $ 100', () => {
				const value = 100;

				expect(formatEnum.formatter).toBeDefined();
				expect(formatEnum.formatter).toBeInstanceOf(Function);
				expect(formatEnum.formatter(value)).toBe('$ 100');
			});

			it('should parser $ 1,000,000 to 1000000', () => {
				const value = '$ 1,000,000';

				expect(formatEnum.parser).toBeDefined();
				expect(formatEnum.parser).toBeInstanceOf(Function);
				expect(formatEnum.parser(value)).toBe('1000000');
			});

			it('should parser $ 100 to 100', () => {
				const value = '$ 100';

				expect(formatEnum.parser).toBeDefined();
				expect(formatEnum.parser).toBeInstanceOf(Function);
				expect(formatEnum.parser(value)).toBe('100');
			});
		});

		describe('Yuan', () => {
			let typeName;
			let formatEnum;

			beforeEach(() => {
				typeName = InputNumber.FormatTypeEnums.YUAN;
				formatEnum = InputNumber.FormatEnums[typeName];
			});
			afterEach(() => {
				typeName = undefined;
				formatEnum = undefined;
			});

			it('should be defined', () => {
				expect(formatEnum).toBeDefined();
			});

			it('should format 90 to 90元', () => {
				const value = 90;

				expect(formatEnum.formatter).toBeDefined();
				expect(formatEnum.formatter).toBeInstanceOf(Function);
				expect(formatEnum.formatter(value)).toBe('90元');
			});

			it('should parser 90元 to 90', () => {
				const value = '90元';

				expect(formatEnum.parser).toBeDefined();
				expect(formatEnum.parser).toBeInstanceOf(Function);
				expect(formatEnum.parser(value)).toBe('90');
			});
		});

		describe('Multiple', () => {
			let typeName;
			let formatEnum;

			beforeEach(() => {
				typeName = InputNumber.FormatTypeEnums.MULTIPLE;
				formatEnum = InputNumber.FormatEnums[typeName];
			});
			afterEach(() => {
				typeName = undefined;
				formatEnum = undefined;
			});

			it('should be defined', () => {
				expect(formatEnum).toBeDefined();
			});

			it('should format 80 to 80倍', () => {
				const value = 80;

				expect(formatEnum.formatter).toBeDefined();
				expect(formatEnum.formatter).toBeInstanceOf(Function);
				expect(formatEnum.formatter(value)).toBe('80倍');
			});

			it('should parser 80倍 to 80', () => {
				const value = '80倍';

				expect(formatEnum.parser).toBeDefined();
				expect(formatEnum.parser).toBeInstanceOf(Function);
				expect(formatEnum.parser(value)).toBe('80');
			});
		});
	});
});
