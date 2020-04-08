import React from 'react';
import { shallow, mount, } from 'enzyme';
import {
	PREFIX_CLASS,
	getAcceptExtentionStrings,
} from '../components/manual-upload';

describe('Manual Upload', () => {
	let ManualUpload;

	beforeEach(() => {
		jest.doMock('antd/lib/upload');
		ManualUpload = require('../components/manual-upload').default;
	});
	afterEach(() => {
		jest.unmock('antd/lib/upload');
		ManualUpload = undefined;
	});

	it('should PREFIX_CLASS to equal ljit-upload', () => {
		expect(PREFIX_CLASS).toEqual('ljit-upload');
	});

	it('handle default props', () => {
		const {
			fileLimit,
			acceptExtentions,
			listType,
			isUploadListVisible,
			onChange,
			beforeUpload,
			onRemove,
		} = ManualUpload.defaultProps;

		expect(fileLimit).toEqual(1);
		expect(acceptExtentions).toEqual([]);
		expect(listType).toEqual('text');
		expect(isUploadListVisible).toEqual(true);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(beforeUpload).toBeDefined();
		expect(beforeUpload).toBeInstanceOf(Function);
		expect(onRemove).toBeDefined();
		expect(onRemove).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const wrapper = shallow(<ManualUpload />);

		expect(wrapper).toMatchSnapshot();
	});

	describe('Limit files on change', () => {
		it('should have been called with 1 file, when pass empty fileLimit', () => {
			const info = {
				fileList: [
					{ name: 'file1', },
					{ name: 'file2', },
				],
			};
			const actualInfo = {
				fileList: [
					{ name: 'file2', },
				],
			};
			const fakeChange = jest.fn();
			const wrapper = shallow(<ManualUpload onChange={fakeChange} />);

			wrapper.simulate('change', info);

			expect(fakeChange).toHaveBeenCalledWith(actualInfo);
		});

		it('should have been called with 2 file, when pass 2 fileLimit', () => {
			const info = {
				fileList: [
					{ name: 'file1', },
					{ name: 'file2', },
					{ name: 'file3', },
				],
			};
			const actualInfo = {
				fileList: [
					{ name: 'file2', },
					{ name: 'file3', },
				],
			};
			const fakeChange = jest.fn();
			const wrapper = shallow(<ManualUpload fileLimit={2} onChange={fakeChange} />);

			wrapper.simulate('change', info);

			expect(fakeChange).toHaveBeenCalledWith(actualInfo);
		});
	});

	it('should mount in a full DOM', () => {
		const acceptExtentions = ['gif', 'jpg'];
		const remindText = 'mock-remindtext';
		const onChange = () => {};
		const beforeUpload = () => {};
		const onRemove = () => {};
		const className = 'mock-calss';
		const fileList = [];
		const fileLimit = 1;
		const children = 'children';
		const listType = 'picture';
		const isUploadListVisible = true;
		const wrapper = mount(
			<ManualUpload
				acceptExtentions={acceptExtentions}
				remindText={remindText}
				onChange={onChange}
				beforeUpload={beforeUpload}
				onRemove={onRemove}
				className={className}
				fileList={fileList}
				fileLimit={fileLimit}
				listType={listType}
				isUploadListVisible={isUploadListVisible}
			>
				{children}
			</ManualUpload>
		);

		expect(wrapper.props().acceptExtentions).toEqual(acceptExtentions);
		expect(wrapper.props().remindText).toEqual(remindText);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().beforeUpload).toEqual(beforeUpload);
		expect(wrapper.props().onRemove).toEqual(onRemove);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().fileList).toEqual(fileList);
		expect(wrapper.props().fileLimit).toEqual(fileLimit);
		expect(wrapper.props().children).toEqual(children);
		expect(wrapper.props().listType).toEqual(listType);
		expect(wrapper.props().isUploadListVisible).toEqual(isUploadListVisible);
	});

	describe('remindText', () => {
		it('should find remind text class, when pass remindText', () => {
			const remindText = 'remind';
			const wrapper = shallow(<ManualUpload remindText={remindText} />);

			expect(wrapper.find('.ljit-upload__remindtext')).toHaveLength(1);
		});

		it('should find no remind text class, when pass empty remindText', () => {
			const wrapper = shallow(<ManualUpload />);

			expect(wrapper.find('.ljit-upload__remindtext')).toHaveLength(0);
		});
	});

	describe('ListTypeEnums', () => {
		it('should contain text property.', () => {
			expect(ManualUpload.ListTypeEnums).toHaveProperty('TEXT', 'text');
		});

		it('should contain picture property.', () => {
			expect(ManualUpload.ListTypeEnums).toHaveProperty('PICTURE', 'picture');
		});

		it('should contain picture-card property.', () => {
			expect(ManualUpload.ListTypeEnums).toHaveProperty('PICTURE_CARD', 'picture-card');
		});
	});

	describe('getAcceptExtentionStrings', () => {
		it('should equal .gif,.jpg, when pass [\'gif\', \'jpg\']', () => {
			const acceptExtentions = ['gif', 'jpg'];
			const actual = '.gif,.jpg';

			expect(getAcceptExtentionStrings(acceptExtentions)).toEqual(actual);
		});

		it('should equal .gif,.jpg, when pass [\'.gif\', \'.jpg\']', () => {
			const acceptExtentions = ['.gif', '.jpg'];
			const actual = '.gif,.jpg';

			expect(getAcceptExtentionStrings(acceptExtentions)).toEqual(actual);
		});

		it('should equal .txt, when pass [\'txt\']', () => {
			const acceptExtentions = ['txt'];
			const actual = '.txt';

			expect(getAcceptExtentionStrings(acceptExtentions)).toEqual(actual);
		});
	});
});
