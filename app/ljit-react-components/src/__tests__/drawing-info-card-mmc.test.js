import React from 'react';
import { shallow, mount, } from 'enzyme';
import DrawingInfoCardMMC from '../components/drawing-info-card/elements/drawing-info-card-mmc';

jest.mock('../components/code-ball', () => {
	const MockComponent = () => <span />;

	MockComponent.ColorEnums = {
		GRADIENT_ORANGE: 'GRADIENT_ORANGE',
		LIGHTGREY: 'LIGHTGREY',
	};

	return {
		Round: MockComponent,
	};
});

describe('DrawingInfoCardMMC', () => {
	it('should handle default props', () => {
		const {
			className,
			buttonText,
			isButtonDisabled,
		} = DrawingInfoCardMMC.defaultProps;

		expect(className).toEqual('');
		expect(buttonText).toEqual('投注');
		expect(isButtonDisabled).toEqual(false);
	});

	it('should renders correctly', () => {
		const props = {
			opencode: '1,3,5,7,9',
			onClickButton: () => {},
		};
		const wrapper = shallow(<DrawingInfoCardMMC {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class "drawing-info-card-mmc"', () => {
		const props = {
			opencode: '1,3,5,7,9',
			onClickButton: () => {},
		};
		const wrapper = shallow(<DrawingInfoCardMMC {...props} />);

		expect(wrapper.hasClass('drawing-info-card-mmc')).toEqual(true);
	});

	it('should disabled button when isButtonDisabled is true', () => {
		const props = {
			opencode: '1,3,5,7,9',
			onClickButton: () => {},
			isButtonDisabled: true,
		};
		const wrapper = shallow(<DrawingInfoCardMMC {...props} />);
		const button = wrapper.find('.drawing-info-card-mmc__bet');

		expect(button.props().disabled).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const props = {
			className: 'mock-class',
			opencode: '1,3,5,7,9',
			buttonText: 'mock-text',
			isButtonDisabled: false,
			onClickButton: () => {},
		};
		const wrapper = mount(<DrawingInfoCardMMC {...props} />);

		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().opencode).toEqual(props.opencode);
		expect(wrapper.props().buttonText).toEqual(props.buttonText);
		expect(wrapper.props().isButtonDisabled).toEqual(props.isButtonDisabled);
		expect(wrapper.props().onClickButton).toEqual(props.onClickButton);
	});

	describe('when click button', () => {
		it('should onClickButton have been called', () => {
			const opencode = '1,3,5,7,9';
			const onClickButton = jest.fn();
			const wrapper = shallow(<DrawingInfoCardMMC opencode={opencode} onClickButton={onClickButton} />);
			const event = {
				preventDefault: () => {},
				target: { tagName: 'BUTTON', },
			};
			const button = wrapper.find('.drawing-info-card-mmc__bet');

			button.at(0).simulate('click', event);

			expect(onClickButton).toHaveBeenCalled();
			expect(onClickButton).toBeCalledWith(event);
		});

		it('should stop with disabled', () => {
			const opencode = '1,3,5,7,9';
			const isButtonDisabled = true;
			const onClickButton = jest.fn();
			const wrapper = mount(
				<DrawingInfoCardMMC
					opencode={opencode}
					onClickButton={onClickButton}
					isButtonDisabled={isButtonDisabled}
				/>
			);
			const button = wrapper.find('.drawing-info-card-mmc__bet');

			button.at(0).simulate('click');

			expect(onClickButton).toHaveBeenCalledTimes(0);
		});
	});
});
