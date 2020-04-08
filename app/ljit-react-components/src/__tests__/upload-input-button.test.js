import React from 'react';
import { shallow, mount, } from 'enzyme';
import {
	PREFIX_CLASS,
	FILE_LIMIT,
	getLastFileName,
} from '../components/upload-input-button';

describe('Upload Input Button', () => {
	let UploadInputButton;

	beforeEach(() => {
		jest.doMock('antd/lib/upload');
		UploadInputButton = require('../components/upload-input-button').default;
	});
	afterEach(() => {
		jest.unmock('antd/lib/upload');
		UploadInputButton = undefined;
	});

	it('should PREFIX_CLASS to equal ljit-upload-input-button', () => {
		expect(PREFIX_CLASS).toEqual('ljit-upload-input-button');
	});

	it('should FILE_LIMIT to equal 1', () => {
		expect(FILE_LIMIT).toEqual(1);
	});

	it('handle default props', () => {
		const {
			text,
			onChange,
		} = UploadInputButton.defaultProps;

		expect(text).toEqual('上传档案');
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const wrapper = shallow(<UploadInputButton />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const acceptExtentions = ['txt'];
		const text = 'mock-text';
		const remindText = 'mock-remindtext';
		const onChange = () => {};
		const className = 'mock-calss';
		const fileList = [];
		const wrapper = mount(
			<UploadInputButton
				acceptExtentions={acceptExtentions}
				text={text}
				remindText={remindText}
				onChange={onChange}
				className={className}
				fileList={fileList}
			/>
		);

		expect(wrapper.props().acceptExtentions).toEqual(acceptExtentions);
		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().remindText).toEqual(remindText);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().fileList).toEqual(fileList);
	});

	describe('getLastFileName', () => {
		it('should equal file1, when pass [{ name: \'file1\' }]', () => {
			const fileList = [{ name: 'file1', },];
			const actual = 'file1';

			expect(getLastFileName(fileList)).toEqual(actual);
		});

		it('should equal file2, when pass [{ name: \'file1\' }, { name: \'file2\' }]', () => {
			const fileList = [
				{ name: 'file1', },
				{ name: 'file2', },
			];
			const actual = 'file2';

			expect(getLastFileName(fileList)).toEqual(actual);
		});

		it('should equal \'\', when pass [{}]', () => {
			const fileList = [{}];
			const actual = '';

			expect(getLastFileName(fileList)).toEqual(actual);
		});

		it('should equal \'\', when pass []', () => {
			const fileList = [];
			const actual = '';

			expect(getLastFileName(fileList)).toEqual(actual);
		});
	});
});
