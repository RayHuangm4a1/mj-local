import React from 'react';
import { shallow, mount, } from 'enzyme';
import Statistic, { PREFIX_CLASS, } from '../components/statistic';

describe('Statistic', () => {
	it('should PREFIX_CLASS to equal ljit-statistic', () => {
		expect(PREFIX_CLASS).toEqual('ljit-statistic');
	});

	it('should handle default props', () => {
		const {
			title,
			value,
			prefix,
			suffix,
			className,
			precision,
			sizeType,
		} = Statistic.defaultProps;

		expect(title).toEqual('');
		expect(value).toEqual('');
		expect(prefix).toEqual('');
		expect(suffix).toEqual('');
		expect(className).toEqual('');
		expect(precision).toEqual(0);
		expect(sizeType).toEqual('medium');
	});

	it('should render correctly', () => {
		const props = {
			title: 'mock-title',
			value: 'mock-value',
			prefix: 'mock-prefix',
			suffix: 'mock-suffix',
			className: 'mock-class',
			precision: 0,
			sizeType: 'medium',
		};

		const wrapper = shallow(<Statistic {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-statistic', () => {
		const wrapper = shallow(<Statistic/>);

		expect(wrapper.hasClass('ljit-statistic')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Statistic className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const props = {
			title: 'mock-title',
			value: 'mock-value',
			prefix: 'mock-prefix',
			suffix: 'mock-suffix',
			className: 'mock-class',
			precision: 0,
		};
		const wrapper = mount(<Statistic {...props}/>);

		expect(wrapper.props().title).toEqual(props.title);
		expect(wrapper.props().value).toEqual(props.value);
		expect(wrapper.props().prefix).toEqual(props.prefix);
		expect(wrapper.props().suffix).toEqual(props.suffix);
		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().precision).toEqual(props.precision);
	});

	describe('when sizeType has changed', () => {
		it('should ljit-statistic--size-medium be selectable by medium prop', () => {
			const wrapper = shallow(<Statistic sizeType="medium" />);

			expect(wrapper.hasClass('ljit-statistic--size-medium')).toEqual(true);
		});

		it('should ljit-statistic--size-large be selectable by large prop', () => {
			const wrapper = shallow(<Statistic sizeType="large" />);

			expect(wrapper.hasClass('ljit-statistic--size-large')).toEqual(true);
		});
	});

	describe('SizeTypeEnums', () => {
		it('should contain medium property.', () => {
			expect(Statistic.SizeTypeEnums).toHaveProperty('MEDIUM', 'medium');
		});

		it('should contain large property.', () => {
			expect(Statistic.SizeTypeEnums).toHaveProperty('LARGE', 'large');
		});
	});
});
