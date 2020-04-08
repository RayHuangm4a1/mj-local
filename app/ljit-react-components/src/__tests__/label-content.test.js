import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import LableContent from '../components/label-content';

jest.mock('antd/lib/form/FormItem');

describe('Lable Content', () => {
	it('handle default props', () => {
		const {
			columnType,
			noMargin,
			hasFeedback,
		} = LableContent.defaultProps;

		expect(columnType).toBe('');
		expect(noMargin).toBe(false);
		expect(hasFeedback).toBe(false);
	});

	it('should renders correctly', () => {
		const wrapper = render(<LableContent label="label">mock text</LableContent>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-label', () => {
		const wrapper = shallow(<LableContent label="label">mock text</LableContent>);

		expect(wrapper.hasClass('ljit-label')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<LableContent className={className} label="label">mock text</LableContent>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should ljit-label--no-margin be selectable when pass noMargin', () => {
		const className = 'ljit-label--no-margin';
		const wrapper = shallow(<LableContent noMargin label="label">mock text</LableContent>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const children = 'mock-children';
		const label = 'mock-label';
		const columnType = 'large';
		const labelColon = true;
		const labelRequired = true;
		const extraMessage = 'remind text';
		const validateStatus = LableContent.ValidateStatusEnums.SUCCESS;
		const hasFeedback = true;
		const helpMessage = 'helper text';
		const wrapper = mount(
			<LableContent
				className={className}
				label={label}
				columnType={columnType}
				labelColon={labelColon}
				labelRequired={labelRequired}
				extraMessage={extraMessage}
				validateStatus={validateStatus}
				hasFeedback={hasFeedback}
				helpMessage={helpMessage}
			>
				{children}
			</LableContent>
		);

		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().label).toBe(label);
		expect(wrapper.props().columnType).toBe(columnType);
		expect(wrapper.props().labelColon).toBe(labelColon);
		expect(wrapper.props().labelRequired).toBe(labelRequired);
		expect(wrapper.props().extraMessage).toEqual(extraMessage);
		expect(wrapper.props().validateStatus).toEqual(validateStatus);
		expect(wrapper.props().hasFeedback).toBeDefined();
		expect(wrapper.props().hasFeedback).toEqual(hasFeedback);
		expect(wrapper.props().helpMessage).toBeDefined();
		expect(wrapper.props().helpMessage).toEqual(helpMessage);
	});

	describe('Column Type Enums', () => {
		it('should contains large property', () => {
			const typeName = 'large';
			const columnType = 'LARGE';

			expect(LableContent.ColumnTypeEnums[columnType]).toEqual(typeName);
		});

		it('should contains medium property', () => {
			const typeName = 'medium';
			const columnType = 'MEDIUM';

			expect(LableContent.ColumnTypeEnums[columnType]).toEqual(typeName);
		});

		it('should contains small property', () => {
			const typeName = 'small';
			const columnType = 'SMALL';

			expect(LableContent.ColumnTypeEnums[columnType]).toEqual(typeName);
		});
	});

	describe('Column Enums', () => {
		describe('Large', () => {
			let typeName;
			let columnEnum;

			beforeEach(() => {
				typeName = LableContent.ColumnTypeEnums.LARGE;
				columnEnum = LableContent.ColumnEnums[typeName];
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
				typeName = LableContent.ColumnTypeEnums.MEDIUM;
				columnEnum = LableContent.ColumnEnums[typeName];
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
				typeName = LableContent.ColumnTypeEnums.SMALL;
				columnEnum = LableContent.ColumnEnums[typeName];
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

	describe('ValidateStatus Enums', () => {
		it('should contains SUCCESS property', () => {
			const statusName = 'success';
			const statusType = 'SUCCESS';

			expect(LableContent.ValidateStatusEnums[statusType]).toEqual(statusName);
		});

		it('should contains WARNING property', () => {
			const statusName = 'warning';
			const statusType = 'WARNING';

			expect(LableContent.ValidateStatusEnums[statusType]).toEqual(statusName);
		});

		it('should contains ERROR property', () => {
			const statusName = 'error';
			const statusType = 'ERROR';

			expect(LableContent.ValidateStatusEnums[statusType]).toEqual(statusName);
		});

		it('should contains VALIDATING property', () => {
			const statusName = 'validating';
			const statusType = 'VALIDATING';

			expect(LableContent.ValidateStatusEnums[statusType]).toEqual(statusName);
		});
	});

	describe('Handle passing validateStatus enums', () => {
		describe('SUCCESS', () => {
			let validateStatusEnumType;

			beforeEach(() => {
				validateStatusEnumType = LableContent.ValidateStatusEnums.SUCCESS;
			});
			afterEach(() => {
				validateStatusEnumType = undefined;
			});

			it('should be defined', () => {
				expect(validateStatusEnumType).toBeDefined();
			});
		});

		describe('WARNING', () => {
			let validateStatusEnumType;

			beforeEach(() => {
				validateStatusEnumType = LableContent.ValidateStatusEnums.WARNING;
			});
			afterEach(() => {
				validateStatusEnumType = undefined;
			});

			it('should be defined', () => {
				expect(validateStatusEnumType).toBeDefined();
			});
		});

		describe('ERROR', () => {
			let validateStatusEnumType;

			beforeEach(() => {
				validateStatusEnumType = LableContent.ValidateStatusEnums.ERROR;
			});
			afterEach(() => {
				validateStatusEnumType = undefined;
			});

			it('should be defined', () => {
				expect(validateStatusEnumType).toBeDefined();
			});
		});

		describe('VALIDATING', () => {
			let validateStatusEnumType;

			beforeEach(() => {
				validateStatusEnumType = LableContent.ValidateStatusEnums.VALIDATING;
			});
			afterEach(() => {
				validateStatusEnumType = undefined;
			});

			it('should be defined', () => {
				expect(validateStatusEnumType).toBeDefined();
			});
		});
	});
});
