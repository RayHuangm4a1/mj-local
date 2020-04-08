import React from 'react';
import { shallow, mount, } from 'enzyme';
import CollapsableForm from '../components/collapsable-form';

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;

describe('Collapsable Form', () => {
	it('handle default props', () => {
		const {
			submitText,
			cancelText,
			submitButtonDisabled,
			cancelButtonDisabled,
			columnSize,
			collapseType,
			onSubmit,
			onCancel,
			isButtonDisabled,
		} = CollapsableForm.defaultProps;

		expect(submitText).toEqual('确认');
		expect(cancelText).toEqual('取消');
		expect(submitButtonDisabled).toEqual(false);
		expect(cancelButtonDisabled).toEqual(false);
		expect(columnSize).toEqual(ColumnSizeEnums.SMALL);
		expect(collapseType).toEqual(CollapseTypeEnum.DEFAULT);
		expect(onSubmit).toBeDefined();
		expect(onSubmit).toBeInstanceOf(Function);
		expect(onCancel).toBeDefined();
		expect(onCancel).toBeInstanceOf(Function);
		expect(isButtonDisabled).toEqual(false);
	});

	it('should renders correctly', () => {
		const props = {
			expand: true,
			submitText: 'snapshot-submitText',
			cancelText: 'snapshot-cancelText',
			submitButtonDisabled: false,
			cancelButtonDisabled: false,
			footer: 'snapshot-footer',
			columnSize: ColumnSizeEnums.SMALL,
			collapseType: CollapseTypeEnum.DEFAULT,
			onSubmit: () => {},
			onCancel: () => {},
			isButtonDisabled: true,
		};

		const wrapper = shallow(<CollapsableForm {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			expand: true,
			submitText: 'mount-submitText',
			cancelText: 'mount-cancelText',
			submitButtonDisabled: false,
			cancelButtonDisabled: false,
			footer: 'mount-footer',
			columnSize: ColumnSizeEnums.SMALL,
			collapseType: CollapseTypeEnum.DEFAULT,
			onSubmit: () => {},
			onCancel: () => {},
			isButtonDisabled: true,
		};
		const wrapper = mount(<CollapsableForm {...props} />);

		expect(wrapper.props().expand).toBe(props.expand);
		expect(wrapper.props().submitText).toBe(props.submitText);
		expect(wrapper.props().cancelText).toBe(props.cancelText);
		expect(wrapper.props().submitButtonDisabled).toBe(props.submitButtonDisabled);
		expect(wrapper.props().cancelButtonDisabled).toBe(props.cancelButtonDisabled);
		expect(wrapper.props().footer).toBe(props.footer);
		expect(wrapper.props().columnSize).toBe(props.columnSize);
		expect(wrapper.props().collapseType).toBe(props.collapseType);
		expect(wrapper.props().onSubmit).toBe(props.onSubmit);
		expect(wrapper.props().onCancel).toBe(props.onCancel);
		expect(wrapper.props().isButtonDisabled).toBe(props.isButtonDisabled);
	});

	it('should handle sumbit event', () => {
		const mockSubmit = jest.fn();
		const props = {
			expand: true,
			onSubmit: mockSubmit,
		};
		const wrapper = mount(<CollapsableForm {...props} />);
		const searchButton = wrapper.find('.ljit-collapsable-form-search-btn').at(0);

		searchButton.simulate('click');
		expect(mockSubmit).toHaveBeenCalled();
	});

	it('should handle cancel event', () => {
		const mockCancel = jest.fn();
		const props = {
			expand: true,
			onCancel: mockCancel,
		};
		const wrapper = mount(<CollapsableForm {...props} />);
		const cancelButton = wrapper.find('.ljit-collapsable-form-reset-btn').at(0);

		cancelButton.simulate('click');
		expect(mockCancel).toHaveBeenCalled();
	});
});

describe('ColumnSizeEnums ', () => {
	it('should contains small property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(ColumnSizeEnums[formatType]).toEqual(typeName);
	});

	it('should contains MEDIUM property', () => {
		const typeName = 'medium';
		const formatType = 'MEDIUM';

		expect(ColumnSizeEnums[formatType]).toEqual(typeName);
	});

	it('should contains large property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(ColumnSizeEnums[formatType]).toEqual(typeName);
	});
});

describe('CollapseTypeEnum ', () => {
	it('should contains insertRow property', () => {
		const typeName = 'insertRow';
		const formatType = 'INSERTROW';

		expect(CollapseTypeEnum[formatType]).toEqual(typeName);
	});

	it('should contains default property', () => {
		const typeName = 'default';
		const formatType = 'DEFAULT';

		expect(CollapseTypeEnum[formatType]).toEqual(typeName);
	});
});
