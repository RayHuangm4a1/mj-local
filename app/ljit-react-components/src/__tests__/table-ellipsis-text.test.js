import React from 'react';
import { mount, shallow, } from 'enzyme';
import TableEllipsisText from '../components/table-ellipsis-text';

describe('table-ellipsis-text', () => {

	it('handle default props', () => {
		const {
			tooltipWidth,
			tooltipPosition,
		} = TableEllipsisText.defaultProps;

		expect(tooltipWidth).toEqual(350);
		expect(tooltipPosition).toEqual(TableEllipsisText.TooltipPositionEnums.BOTTOM);
	});
	it('should renders correctly', () => {
		const wrapper = shallow(
			<TableEllipsisText
				text="mock-text"
				className="mock-classname"
				tooltipWidth={200}
				positionToRight={10}
				positionToTop={10}
				tooltipPosition={TableEllipsisText.TooltipPositionEnums.RIGHT}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const text = 'mock-text';
		const className = 'mock-classname';
		const positionToRight = 10;
		const positionToTop = 20;
		const tooltipWidth = 300;
		const tooltipPosition = TableEllipsisText.TooltipPositionEnums.RIGHT;
		const wrapper = mount(
			<TableEllipsisText
				text={text}
				className={className}
				tooltipWidth={tooltipWidth}
				positionToRight={positionToRight}
				positionToTop={positionToTop}
				tooltipPosition={tooltipPosition}
			/>
		);

		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().positionToRight).toEqual(positionToRight);
		expect(wrapper.props().positionToTop).toEqual(positionToTop);
		expect(wrapper.props().tooltipWidth).toEqual(tooltipWidth);
		expect(wrapper.props().tooltipPosition).toEqual(tooltipPosition);

	});

	it('should be selectable by class ljit-table-ellipsis-text', () => {
		const wrapper = shallow(<TableEllipsisText />);

		expect(wrapper.hasClass('ljit-table-ellipsis-text')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<TableEllipsisText className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	describe('Tooltip Position Enums', () => {
		it('should contain left property.', () => {
			expect(TableEllipsisText.TooltipPositionEnums).toHaveProperty('LEFT', 'left');
		});


		it('should contain right property.', () => {
			expect(TableEllipsisText.TooltipPositionEnums).toHaveProperty('RIGHT', 'right');
		});

		it('should contain top property.', () => {
			expect(TableEllipsisText.TooltipPositionEnums).toHaveProperty('TOP', 'top');
		});

		it('should contain bottom property.', () => {
			expect(TableEllipsisText.TooltipPositionEnums).toHaveProperty('BOTTOM', 'bottom');
		});
	});
});

