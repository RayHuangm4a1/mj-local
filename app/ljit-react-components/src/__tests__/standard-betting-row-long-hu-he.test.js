import React from 'react';
import { shallow, mount, } from 'enzyme';
import LongHuhe from '../components/standard-betting-row/long-hu-he';

describe('LongHuhe', () => {
	it('should handle default props', () => {
		const {
			codes,
			quickOptions,
			onPressCodeBall,
			onPressQuickOption,
		} = LongHuhe.defaultProps;

		expect(codes).toEqual([]);
		expect(quickOptions).toEqual([]);
		expect(onPressCodeBall).toBeInstanceOf(Function);
		expect(onPressQuickOption).toBeInstanceOf(Function);
	});

	it('should be selectable by class ljit-long-hu-he', () => {
		const wrapper = shallow(<LongHuhe/>);

		expect(wrapper.hasClass('ljit-long-hu-he')).toEqual(true);
	});

	it('should renders correctly', () => {
		const props = {
			title: 'mock-title',
			codes: [],
			quickOptions: [],
			onPressCodeBall: () => {},
			onPressQuickOption: () => {},
		};

		const wrapper = shallow(<LongHuhe {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			title: 'mock-title',
			codes: [],
			quickOptions: [],
			onPressCodeBall: () => {},
			onPressQuickOption: () => {},
		};

		const wrapper = mount(<LongHuhe {...props} />);

		expect(wrapper.props().title).toBe(props.title);
		expect(wrapper.props().codes).toBe(props.codes);
		expect(wrapper.props().quickOptions).toBe(props.quickOptions);
		expect(wrapper.props().onPressCodeBall).toBe(props.onPressCodeBall);
		expect(wrapper.props().onPressQuickOption).toBe(props.onPressQuickOption);

	});
	it('should handle isSelected', () => {
		const wrapper = mount(
			<LongHuhe 
				codes={[ { name: '龙', bonus: '', isSelected: true, }, ]}
			/>
		);
		
		expect(wrapper.find('.ljit-long-hu-he__ball-style').hasClass('ljit-long-hu-he--selected')).toEqual(true);
	});
	it('should handle callback', () => {
		const callback = jest.fn();
		const wrapper = mount(
			<LongHuhe 
				onPressCodeBall={callback}
				codes={[ { name: '龙', bonus: '', isSelected: true, }, ]}
			/>
		);

		wrapper.find('.ljit-long-hu-he__ball-style').simulate('click');
		expect(callback).toHaveBeenCalled();
	});
});
