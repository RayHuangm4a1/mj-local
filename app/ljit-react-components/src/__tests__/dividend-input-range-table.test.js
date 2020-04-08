import React from 'react';
import { shallow, mount, } from 'enzyme';
import DividendInputRangeTable, { getDefaultData, } from '../components/dividend-input-range-table';

jest.mock('uuid');

describe('DividendInputRangeTable', () => {
	it('handle default props', () => {
		const {
			tableData,
			className,
			onChange,
			maxRow,
			maxAmount,
			rowKey,
		} = DividendInputRangeTable.defaultProps;

		expect(tableData).toEqual(getDefaultData('id'));
		expect(className).toEqual('');
		expect(maxRow).toEqual(15);
		expect(maxAmount).toEqual(10000);
		expect(rowKey).toEqual('id');
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			tableData: [
				{ amount: 1, ratio: 1, key: '1', },
				{ amount: 2, ratio: 2, key: '2', },
				{ amount: 100, ratio: 3, key: '3', },
			],
			className: 'mock-class',
			onChange: () => {},
			maxRow: 15,
			maxAmount: 10000,
			rowKey: 'key',
		};
		const wrapper = shallow(<DividendInputRangeTable {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selected by className ljit-dividend-table-form', () => {
		const wrapper = shallow(<DividendInputRangeTable />);

		expect(wrapper.hasClass('ljit-dividend-table-form')).toEqual(true);
	});

	it('should be selected by custom className', () => {
		const className = 'mock-class';
		const wrapper = shallow(<DividendInputRangeTable className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const tableData =  [
			{ amount: 1, ratio: 1, key: '1', },
			{ amount: 2, ratio: 2, key: '2', },
			{ amount: 100, ratio: 3, key: '3', },
		];
		const className = 'mock-class';
		const onChange = () => {};
		const maxRow = 20;
		const maxAmount = 2000;
		const wrapper = mount(
			<DividendInputRangeTable
				rowKey='key'
				tableData={tableData}
				className={className}
				onChange={onChange}
				maxRow={maxRow}
				maxAmount={maxAmount}
			/>
		);

		expect(wrapper.props().tableData).toEqual(tableData);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().maxRow).toEqual(maxRow);
		expect(wrapper.props().maxAmount).toEqual(maxAmount);
	});
});
