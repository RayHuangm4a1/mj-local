import React from 'react';
import { shallow, mount, } from 'enzyme';
import Form from '../components/form';

describe('Form', () => {
	it('should renders correctly', () => {
		const props = {
			submitText: 'snapshot-submitText',
			cancelText: 'snapshot-cancelText',
			submitButtonDisabled: false,
			cancelButtonDisabled: false,
			isSubmitDisabled: false,
			isCancelDisabled: false,
			footer: 'snapshot-footer',
			onSubmit: () => {},
			onCancel: () => {},
		};

		const wrapper = shallow(<Form {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			expand: true,
			submitText: 'mount-submitText',
			cancelText: 'mount-cancelText',
			submitButtonDisabled: false,
			cancelButtonDisabled: false,
			isSubmitDisabled: false,
			isCancelDisabled: false,
			footer: 'mount-footer',
			onSubmit: () => {},
			onCancel: () => {},
		};
		const wrapper = mount(<Form {...props} />);

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
	});

	it('should handle sumbit event', () => {
		const mockSubmit = jest.fn();
		const props = {
			expand: true,
			onSubmit: mockSubmit,
		};
		const wrapper = mount(<Form {...props} />);
		const searchButton = wrapper.find('.ljit-form-search-btn').at(0);

		searchButton.simulate('click');
		expect(mockSubmit).toHaveBeenCalled();
	});

	it('should handle cancel event', () => {
		const mockCancel = jest.fn();
		const props = {
			expand: true,
			onCancel: mockCancel,
		};
		const wrapper = mount(<Form {...props} />);
		const cancelButton = wrapper.find('.ljit-form-reset-btn').at(0);

		cancelButton.simulate('click');
		expect(mockCancel).toHaveBeenCalled();
	});
});
