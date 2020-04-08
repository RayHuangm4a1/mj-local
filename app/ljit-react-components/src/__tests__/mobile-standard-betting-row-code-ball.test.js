import React from 'react';
import { shallow, mount, } from 'enzyme';
import MobileCodeBall from '../components/standard-betting-row/mobile-code-ball';

describe('MobileCodeBall', () => {
	it('should be selectable by class ljit-betting-block', () => {
		const wrapper = shallow(<MobileCodeBall/>);

		expect(wrapper.hasClass('ljit-mobile-betting-block')).toEqual(true);
	});
	it('should handle default props', () => {
		const {
			title,
			codes,
			quickOptions,
			onPressCodeBall,
			onPressQuickOption,
		} = MobileCodeBall.defaultProps;

		expect(title).toEqual('');
		expect(codes).toBeInstanceOf(Array);
		expect(quickOptions).toBeInstanceOf(Array);
		expect(onPressCodeBall).toBeInstanceOf(Function);
		expect(onPressCodeBall).toBeDefined();
		expect(onPressQuickOption).toBeInstanceOf(Function);
		expect(onPressQuickOption).toBeDefined();

	});

	it('should renders correctly', () => {
		const title = 'mock-title';
		const codes = [];
		const quickOptions = [];
		const onPressCodeBall = () => {};
		const onPressQuickOption = () => {};
		const wrapper = shallow(
			<MobileCodeBall 
				title={title}
				codes={codes}
				quickOptions={quickOptions}
				onPressCodeBall={onPressCodeBall}
				onPressQuickOption={onPressQuickOption}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});
	it('should mount in a full DOM', () => {
		const title = 'mock-title';
		const codes = [];
		const quickOptions = [];
		const onPressCodeBall = () => {};
		const onPressQuickOption = () => {};

		const wrapper = mount(
			<MobileCodeBall 
				title={title}
				codes={codes}
				quickOptions={quickOptions}
				onPressCodeBall={onPressCodeBall}
				onPressQuickOption={onPressQuickOption}
			/>
		);

		expect(wrapper.props().title).toBe(title);
		expect(wrapper.props().codes).toMatchObject(codes);
		expect(wrapper.props().quickOptions).toMatchObject(quickOptions);
		expect(wrapper.props().onPressCodeBall).toEqual(onPressCodeBall);
		expect(wrapper.props().onPressQuickOption).toEqual(onPressQuickOption);
	});
	describe('handle click ball', () => {
		let codes = [];

		let callback = () => {};

		let component = null;

		beforeEach(() => {
			codes = [
				{
					name: '0',
					bonus: '',
					isSelected: false,
				},
				{
					name: '1',
					bonus: '',
					isSelected: false,
				},
				{
					name: '2',
					bonus: '',
					isSelected: false,
				},
				{
					name: '3',
					bonus: '',
					isSelected: false,
				},
				{
					name: '4',
					bonus: '',
					isSelected: false,
				},
				{
					name: '5',
					bonus: '',
					isSelected: true,
				},
				{
					name: '6',
					bonus: '',
					isSelected: true,
				},
				{
					name: '7',
					bonus: '',
					isSelected: true,
				},
				{
					name: '8',
					bonus: '',
					isSelected: true,
				},
				{
					name: '9',
					bonus: '',
					isSelected: true,
				},
			];
			callback = jest.fn();

			component = <MobileCodeBall codes={codes} onPressCodeBall={callback}/>;
		});
		afterEach(() => {
			codes = undefined;
			callback = undefined;
			component = undefined;
		});

		it('should handle click ball 0', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(0).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(0);
		});
		it('should handle click ball 1', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(1).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(1);
		});
		it('should handle click ball 2', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(2).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(2);
		});
		it('should handle click ball 3', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(3).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(3);
		});
		it('should handle click ball 4', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(4).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(4);
		});
		it('should handle click ball 5', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(5).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(5);
		});
		it('should handle click ball 6', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(6).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(6);
		});
		it('should handle click ball 7', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(7).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(7);
		});
		it('should handle click ball 8', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(8).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(8);
		});
		it('should handle click ball 9', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-ball__ball').at(9).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith(9);
		});

	});
	describe('handle click option', () => {
		let quickOptions = [];

		let callback = () => {};

		let component = null;

		let title = '';

		beforeEach(() => {
			quickOptions = ['大', '小', '單', '雙', '全','清',];
			callback = jest.fn();
			title = '万位';
			component = <MobileCodeBall title={title} quickOptions={quickOptions} onPressQuickOption={callback} />;
		});
		afterEach(() => {
			quickOptions = undefined;
		});
		it('should handle click 大', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-block__select-block-options').at(0).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith('大', title);
		});
		it('should handle click 小', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-block__select-block-options').at(1).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith('小', title);
		});
		it('should handle click 單', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-block__select-block-options').at(2).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith('單', title);
		});
		it('should handle click 雙', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-block__select-block-options').at(3).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith('雙', title);
		});
		it('should handle click 全', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-block__select-block-options').at(4).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith('全', title);
		});
		it('should handle click 清', () => {
			const wrapper = mount(component);

			wrapper.find('.ljit-mobile-betting-block__select-block-options').at(5).simulate('click');
			expect(callback).toHaveBeenCalled();
			expect(callback).toHaveBeenCalledWith('清', title);
		});
	});
});
