import React from 'react';
import { mount, render, } from 'enzyme';
import FormItem, { ColumnTypeEnums, ColumnEnums, } from '../components/form-item';

jest.mock('../components/form', () => ({
	connectForm: function (Component) {
		return Component;
	},
}));

describe('Form Item', () => {
	const className = 'mock-class';
	const label = 'mock-label';
	const columnType = 'large';
	const labelColon = true;
	const labelRequired = true;
	const groupItemNames = ['test-item1', 'test-item2',];
	const groupItemConfigs = {
		'test-item1': {},
		'test-item2': {},
	};
	const form = {
		getFieldDecorator: (name, config) => (Component) => {
			return Component;
		},
	};

	afterEach(() => {
		jest.resetModules();
	});

	it('should renders correctly', () => {
		const wrapper = render(<FormItem
			className={className}
			label={label}
			form={form}
			itemName="test-item"
			columnType={columnType}
			labelColon={labelColon}
			labelRequired={labelRequired}
			noMargin
			groupItemNames={groupItemNames}
			groupItemConfigs={groupItemConfigs}
			isInputGroup={false}
			extraMessage="remind text"
		>
			mock-item
		</FormItem>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-form-label', () => {
		const wrapper = mount(<FormItem
			form={form}>
			mock-item
		</FormItem>);
		const wrapperFormItem = wrapper.find('.ljit-form-label').at(0);

		expect(wrapperFormItem.hasClass('ljit-form-label')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = mount(<FormItem
			className={className}
			form={form}>
			mock-item
		</FormItem>);
		const wrapperFormItem = wrapper.find(`.${className}`).at(0);

		expect(wrapperFormItem.hasClass(className)).toEqual(true);
	});

	it('should ljit-form-label--no-margin be selectable when pass noMargin', () => {
		const wrapper = mount(<FormItem
			form={form}
			noMargin>
			mock-item
		</FormItem>);
		const wrapperFormItem = wrapper.find('.ljit-form-label--no-margin').at(0);

		expect(wrapperFormItem.hasClass('ljit-form-label--no-margin')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const label = 'mock-label';
		const itemName = 'test-item';
		const columnType = 'large';
		const labelColon = true;
		const labelRequired = true;
		const groupItemNames = ['test-item1', 'test-item2',];
		const groupItemConfigs = {
			'test-item1': {},
			'test-item2': {},
		};
		const isInputGroup = false;
		const extraMessage = 'remind text';
		const wrapper = mount(<FormItem
			className={className}
			label={label}
			form={form}
			itemName={itemName}
			columnType={columnType}
			labelColon={labelColon}
			labelRequired={labelRequired}
			groupItemNames={groupItemNames}
			groupItemConfigs={groupItemConfigs}
			isInputGroup={isInputGroup}
			noMargin
			extraMessage={extraMessage}
		>
			mock-item
		</FormItem>);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().label).toBe(label);
		expect(wrapper.props().itemName).toBe(itemName);
		expect(wrapper.props().form).toBe(form);
		expect(wrapper.props().columnType).toBe(columnType);
		expect(wrapper.props().labelColon).toBe(labelColon);
		expect(wrapper.props().labelRequired).toBe(labelRequired);
		expect(wrapper.props().groupItemNames).toBe(groupItemNames);
		expect(wrapper.props().groupItemConfigs).toBe(groupItemConfigs);
		expect(wrapper.props().isInputGroup).toBe(isInputGroup);
		expect(wrapper.props().extraMessage).toEqual(extraMessage);
	});

	describe('Column Type Enums', () => {
		it('should contains large property', () => {
			const typeName = 'large';
			const columnType = 'LARGE';

			expect(ColumnTypeEnums[columnType]).toEqual(typeName);
		});

		it('should contains medium property', () => {
			const typeName = 'medium';
			const columnType = 'MEDIUM';

			expect(ColumnTypeEnums[columnType]).toEqual(typeName);
		});

		it('should contains small property', () => {
			const typeName = 'small';
			const columnType = 'SMALL';

			expect(ColumnTypeEnums[columnType]).toEqual(typeName);
		});
	});

	describe('Column Enums', () => {
		describe('Large', () => {
			let typeName;
			let columnEnum;

			beforeEach(() => {
				typeName = ColumnTypeEnums.LARGE;
				columnEnum = ColumnEnums[typeName];
			});
			afterEach(() => {
				typeName = undefined;
				columnEnum = undefined;
			});

			it('should be defined', () => {
				expect(columnEnum).toBeDefined();
			});

			it('should labelCol have full width in xs window size', () => {
				const result = 24;

				expect(columnEnum.labelCol).toBeDefined();
				expect(columnEnum.labelCol.xs.span).toBe(result);
			});

			it('should labelCol have 9 col in sm window size', () => {
				const result = 9;

				expect(columnEnum.labelCol).toBeDefined();
				expect(columnEnum.labelCol.sm.span).toBe(result);
			});

			it('should wrapperCol have full width in xs window size', () => {
				const result = 24;

				expect(columnEnum.wrapperCol).toBeDefined();
				expect(columnEnum.wrapperCol.xs.span).toBe(result);
			});

			it('should wrapperCol have 15 col in sm window size', () => {
				const result = 15;

				expect(columnEnum.wrapperCol).toBeDefined();
				expect(columnEnum.wrapperCol.sm.span).toBe(result);
			});
		});

		describe('Medium', () => {
			let typeName;
			let columnEnum;

			beforeEach(() => {
				typeName = ColumnTypeEnums.MEDIUM;
				columnEnum = ColumnEnums[typeName];
			});
			afterEach(() => {
				typeName = undefined;
				columnEnum = undefined;
			});

			it('should be defined', () => {
				expect(columnEnum).toBeDefined();
			});

			it('should labelCol have full width in xs window size', () => {
				const result = 24;

				expect(columnEnum.labelCol).toBeDefined();
				expect(columnEnum.labelCol.xs.span).toBe(result);
			});

			it('should labelCol have 6 col in sm window size', () => {
				const result = 6;

				expect(columnEnum.labelCol).toBeDefined();
				expect(columnEnum.labelCol.sm.span).toBe(result);
			});

			it('should wrapperCol have full width in xs window size', () => {
				const result = 24;

				expect(columnEnum.wrapperCol).toBeDefined();
				expect(columnEnum.wrapperCol.xs.span).toBe(result);
			});

			it('should wrapperCol have 18 col in sm window size', () => {
				const result = 18;

				expect(columnEnum.wrapperCol).toBeDefined();
				expect(columnEnum.wrapperCol.sm.span).toBe(result);
			});
		});

		describe('Small', () => {
			let typeName;
			let columnEnum;

			beforeEach(() => {
				typeName = ColumnTypeEnums.SMALL;
				columnEnum = ColumnEnums[typeName];
			});
			afterEach(() => {
				typeName = undefined;
				columnEnum = undefined;
			});

			it('should be defined', () => {
				expect(columnEnum).toBeDefined();
			});

			it('should labelCol have full width in xs window size', () => {
				const result = 24;

				expect(columnEnum.labelCol).toBeDefined();
				expect(columnEnum.labelCol.xs.span).toBe(result);
			});

			it('should labelCol have 4 col in sm window size', () => {
				const result = 4;

				expect(columnEnum.labelCol).toBeDefined();
				expect(columnEnum.labelCol.sm.span).toBe(result);
			});

			it('should wrapperCol have full width in xs window size', () => {
				const result = 24;

				expect(columnEnum.wrapperCol).toBeDefined();
				expect(columnEnum.wrapperCol.xs.span).toBe(result);
			});

			it('should wrapperCol have 20 col in sm window size', () => {
				const result = 20;

				expect(columnEnum.wrapperCol).toBeDefined();
				expect(columnEnum.wrapperCol.sm.span).toBe(result);
			});
		});
	});
});
