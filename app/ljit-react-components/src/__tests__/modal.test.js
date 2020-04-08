import React, { Component, } from 'react';
import { shallow, mount, render, } from 'enzyme';
import Modal from '../components/modal';

const {
	Message: MessageModal,
} = Modal;

jest.mock('antd/lib/modal', () => function mockComponent() {
	return <div />;
});

class ModalTestContainer extends Component {
	constructor() {
		super();
		this.state = {
			visible: false,
		};
		this.handleVisible = this.handleVisible.bind(this);
	}

	handleVisible() {
		this.setState({ visible: !this.state.visible, });
	}

	render() {
		return (
			<div>
				<button onClick={this.handleVisible}>open modal</button>
				<Modal
					visible={this.state.visible}
					{...this.props}
				/>
			</div>
		);
	}
}

describe('Modal', () => {
	it('handle default props', () => {
		const {
			okText,
			cancelText,
			onClickCancel,
			onClickOk,
			visible,
			modalSize,
			isCentered,
			width,
			isMaskClosable,
			okButtonClassname,
			cancelButtonClassname,
			isOkButtonDisabled,
		} = Modal.defaultProps;

		expect(okText).toBe('确 定');
		expect(cancelText).toBe('取 消');
		expect(onClickCancel).toBeDefined();
		expect(onClickCancel).toBeInstanceOf(Function);
		expect(onClickOk).toBeDefined();
		expect(onClickOk).toBeInstanceOf(Function);
		expect(visible).toEqual(false);
		expect(modalSize).toBe('');
		expect(isCentered).toEqual(false);
		expect(width).toBe('640px');
		expect(isMaskClosable).toEqual(true);
		expect(okButtonClassname).toEqual('');
		expect(cancelButtonClassname).toEqual('');
		expect(isOkButtonDisabled).toEqual(false);
	});

	it('should renders correctly', () => {
		const props = {
			wrapClassName: 'mock-class',
			okText: 'ok',
			cancelText: 'cancel',
			onClickOk: () => {},
			onClickCancel: () => {},
			visible: true,
			children: 'modal content',
			title: 'mock-title',
			modalSize: 'small',
			width: '300px',
			footer: 'mock footer',
			okButtonClassname: 'btn-ok',
			cancelButtonClassname: 'btn-cancel',
			zIndex: 1001,
			isOkButtonDisabled: false,
		};
		const wrapper = render(<Modal {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('when modalSize and width both are setting, should _getWidth() output correctly', () => {
		const props = {
			modalSize: 'small',
			width: '800px',
		};
		const wrapper = mount(<Modal {...props} />);
		const instance = wrapper.instance();

		expect(instance._getWidth()).toBe('320px');
	});

	it('should mount in a full DOM', () => {
		const props = {
			wrapClassName: 'mock-class',
			okText: 'ok',
			cancelText: 'cancel',
			onClickOk: () => {},
			onClickCancel: () => {},
			visible: true,
			children: 'modal content',
			title: 'mock-title',
			modalSize: 'small',
			footer: 'mock footer',
			isCentered: false,
			width: '300px',
			isMaskClosable: false,
			okButtonClassname: 'btn-ok',
			cancelButtonClassName: 'btn-cancel',
			zIndex: 1001,
			isOkButtonDisabled: false,
		};
		const wrapper = mount(<Modal {...props} />);

		expect(wrapper.props().wrapClassName).toBe(props.wrapClassName);
		expect(wrapper.props().okText).toBe(props.okText);
		expect(wrapper.props().cancelText).toBe(props.cancelText);
		expect(wrapper.props().onClickOk).toBe(props.onClickOk);
		expect(wrapper.props().onClickCancel).toBe(props.onClickCancel);
		expect(wrapper.props().visible).toBe(props.visible);
		expect(wrapper.props().children).toBe(props.children);
		expect(wrapper.props().title).toBe(props.title);
		expect(wrapper.props().isCentered).toEqual(props.isCentered);
		expect(wrapper.props().modalSize).toBe(props.modalSize);
		expect(wrapper.props().width).toBe(props.width);
		expect(wrapper.props().isMaskClosable).toEqual(props.isMaskClosable);
		expect(wrapper.props().okButtonClassname).toBe(props.okButtonClassname);
		expect(wrapper.props().cancelButtonClassokButtonClassname).toBe(props.cancelButtonClaokButtonClassname);
		expect(wrapper.props().zIndex).toBe(props.zIndex);
		expect(wrapper.props().isOkButtonDisabled).toEqual(props.isOkButtonDisabled);
	});

	describe('when wrap modal in a container', () => {
		it('should renders correctly', () => {
			const wrapper = shallow(<ModalTestContainer />);

			expect(wrapper.find(Modal)).toHaveLength(1);
			expect(wrapper.find(Modal).prop('visible')).toEqual(false);
		});

		it('should opens modal when button is clicked', () => {
			const wrapper = shallow(<ModalTestContainer />);

			wrapper.find('button').simulate('click');
			expect(wrapper.find(Modal).prop('visible')).toEqual(true);
		});
	});
});

describe('ModalSizeEnum ', () => {
	it('should contains small property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Modal.ModalSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains normal property', () => {
		const typeName = 'normal';
		const formatType = 'NORMAL';

		expect(Modal.ModalSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains large property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Modal.ModalSizeEnum[formatType]).toEqual(typeName);
	});
});

describe('MessageModal ', () => {
	it('handle default props', () => {
		const {
			title,
			message,
		} = MessageModal.defaultProps;

		expect(title).toEqual('提示');
		expect(message).toEqual('');
	});

	it('should have default center props', () => {
		const wrapper = shallow(<MessageModal />);

		expect(wrapper.find(Modal).props().isCentered).toEqual(true);
	});

	it('should be small size', () => {
		const wrapper = shallow(<MessageModal />);

		expect(wrapper.find(Modal).props().modalSize).toEqual('small');
	});

	it('should renders correctly', () => {
		const props = {
			className: 'mock-class',
			title: 'mock-title',
			message: 'modal-message',
		};
		const wrapper = render(<MessageModal {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			className: 'mock-class',
			title: 'mock-title',
			message: 'modal-message',
		};
		const wrapper = mount(<MessageModal {...props} />);

		expect(wrapper.props().className).toBe(props.className);
		expect(wrapper.props().title).toEqual(props.title);
		expect(wrapper.props().message).toEqual(props.message);
	});
});
