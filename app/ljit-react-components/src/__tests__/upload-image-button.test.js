import React from 'react';
import { shallow, mount, } from 'enzyme';
import { AcceptExtentions, } from '../components/upload-image-button';

describe('Upload Image Button', () => {
	let UploadImageButton;

	beforeEach(() => {
		jest.doMock('antd/lib/upload');
		UploadImageButton = require('../components/upload-image-button').default;
	});
	afterEach(() => {
		jest.unmock('antd/lib/upload');
		UploadImageButton = undefined;
	});

	it('handle default accept', () => {
		expect(AcceptExtentions).toMatchObject(['gif', 'jpg', 'jpeg', 'png', 'bmp',]);
	});

	it('handle default props', () => {
		const {
			text,
			remindText,
			fileLimit,
		} = UploadImageButton.defaultProps;

		expect(text).toBe('选择档案');
		expect(remindText).toBe('允许的副档名：gif、jpg、jpeg、png、bmp。');
		expect(fileLimit).toBe(1);
	});

	it('should renders correctly', () => {
		const wrapper = shallow(<UploadImageButton onChange={() => {}} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const text = 'mock-text';
		const remindText = 'mock-remindtext';
		const onChange = () => {};
		const className = 'mock-calss';
		const fileList = [];
		const fileLimit = 1;
		const wrapper = mount(
			<UploadImageButton
				text={text}
				remindText={remindText}
				onChange={onChange}
				className={className}
				fileList={fileList}
				fileLimit={fileLimit}
			/>
		);

		expect(wrapper.props().text).toBe(text);
		expect(wrapper.props().remindText).toBe(remindText);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().fileList).toEqual(fileList);
		expect(wrapper.props().fileLimit).toBe(fileLimit);
	});
});
