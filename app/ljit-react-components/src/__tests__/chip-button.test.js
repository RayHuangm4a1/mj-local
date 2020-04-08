import React from 'react';
import { shallow, mount, } from 'enzyme';
import ChipButton, { PREFIX_CLASS, } from '../components/Chip-button';

describe('ChipButton', () => {
	it('should PREFIX_CLASS to equal ljit-chip-button', () => {
		expect(PREFIX_CLASS).toEqual('ljit-chip-button');
	});

	it('should handle default props', () => {
		const {
			type,
			onClick,
		} = ChipButton.defaultProps;

		expect(type).toEqual(ChipButton.TypeEnums.VALUE_1);
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should render correctly' ,() => {
		const props = {
			type: ChipButton.TypeEnums.VALUE_1,
			onClick: () => {},
		};

		const wrapper = shallow(<ChipButton {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-chip-button',() => {
		const wrapper = shallow(<ChipButton />);

		expect(wrapper.hasClass('ljit-chip-button')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const props = {
			type: ChipButton.TypeEnums.VALUE_1,
			onClick: () => {},
		};
		const wrapper = mount(<ChipButton {...props}/>);

		expect(wrapper.props().type).toEqual(props.type);
		expect(wrapper.props().onClick).toEqual(props.onClick);
	});
	it('should handle onclick event', () => {
		const onClick = jest.fn();
		const wrapper = shallow(<ChipButton onClick={onClick} />);

		wrapper.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});
});
describe('ChipButton TypeEnums', () => {
	it('should contains 1 propety',() => {
		const typeValue = '1';
		const typeEnums = 'VALUE_1';

		expect(ChipButton.TypeEnums[typeEnums]).toEqual(typeValue);
	});
	it('should contains 2 propety',() => {
		const typeValue = '2';
		const typeEnums = 'VALUE_2';

		expect(ChipButton.TypeEnums[typeEnums]).toEqual(typeValue);
	});
	it('should contains 5 propety',() => {
		const typeValue = '5';
		const typeEnums = 'VALUE_5';

		expect(ChipButton.TypeEnums[typeEnums]).toEqual(typeValue);
	});
	it('should contains 10 propety',() => {
		const typeValue = '10';
		const typeEnums = 'VALUE_10';

		expect(ChipButton.TypeEnums[typeEnums]).toEqual(typeValue);
	});
	it('should contains 20 propety',() => {
		const typeValue = '20';
		const typeEnums = 'VALUE_20';

		expect(ChipButton.TypeEnums[typeEnums]).toEqual(typeValue);
	});
	it('should contains 50 propety',() => {
		const typeValue = '50';
		const typeEnums = 'VALUE_50';

		expect(ChipButton.TypeEnums[typeEnums]).toEqual(typeValue);
	});
});
