import React from 'react';
import { shallow, mount, } from 'enzyme';
import DecimalNumber, { PREFIX_CLASS, } from '../components/decimal-number';

describe('DecimalNumber', () => {
	it('should PREFIX_CLASS to equal ljit-decimal-number', () => {
		expect(PREFIX_CLASS).toEqual('ljit-decimal-number');
	});

	it('should handle default props', () => {
		const {
			isTolerance,
			isCurrency,
			isPercent,
			hasSeparator,
			className,
			decimalPlaces,
		} = DecimalNumber.defaultProps;

		expect(isTolerance).toEqual(false);
		expect(isCurrency).toEqual(false);
		expect(isPercent).toEqual(false);
		expect(hasSeparator).toEqual(false);
		expect(className).toEqual('');
		expect(decimalPlaces).toEqual(4);
	});

	it('should renders correctly', () => {
		const data = 5000;
		const isCurrency = true;
		const hasSeparator = true;
		const wrapper = shallow(
			<DecimalNumber
				data={data}
				isCurrency={isCurrency}
				hasSeparator={hasSeparator}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should wrapped by span', () => {
		const data = 50;
		const wrapper = shallow(
			<DecimalNumber
				data={data}
			/>
		);

		expect(wrapper.type()).toEqual('span');
	});

	it('should be selectable by class ljit-decimal-number', () => {
		const className = 'ljit-decimal-number';
		const wrapper = shallow(<DecimalNumber />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<DecimalNumber className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	describe('isTolerance', () => {
		const positiveClass = 'ljit-decimal-number--positive';
		const negativeClass = 'ljit-decimal-number--negative';

		describe('when isTolerance is true', () => {
			let isTolerance;

			beforeEach(() => {
				isTolerance = true;
			});
			afterEach(() => {
				isTolerance = undefined;
			});

			it('should ljit-decimal-number--positive be selected by 41984131285', () => {
				const data = 41984131285;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(positiveClass)).toEqual(true);
			});

			it('should ljit-decimal-number--positive be selected by 4168.165165', () => {
				const data = 4168.165165;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(positiveClass)).toEqual(true);
			});

			it('should ljit-decimal-number--positive be selected by 10', () => {
				const data = 10;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(positiveClass)).toEqual(true);
			});

			it('should not be selectable by 0', () => {
				const data = 0;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(positiveClass)).toEqual(false);
				expect(wrapper.hasClass(negativeClass)).toEqual(false);
			});

			it('should ljit-decimal-number--negative be selected by -10', () => {
				const data = -10;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(negativeClass)).toEqual(true);
			});

			it('should ljit-decimal-number--negative be selected by -6415.416465', () => {
				const data = -6415.416465;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(negativeClass)).toEqual(true);
			});

			it('should ljit-decimal-number--negative be selected by -4658465654', () => {
				const data = -4658465654;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(negativeClass)).toEqual(true);
			});
		});

		describe('when isTolerance is false', () => {
			let isTolerance;

			beforeEach(() => {
				isTolerance = false;
			});
			afterEach(() => {
				isTolerance = undefined;
			});

			it('should ljit-decimal-number--positive not be selected by 41984131285', () => {
				const data = 41984131285;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(positiveClass)).toEqual(false);
			});

			it('should ljit-decimal-number--positive not be selected by 4168.165165', () => {
				const data = 4168.165165;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(positiveClass)).toEqual(false);
			});

			it('should ljit-decimal-number--negative not be selected by -6415.416465', () => {
				const data = -6415.416465;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(negativeClass)).toEqual(false);
			});

			it('should ljit-decimal-number--negative not be selected by -4658465654', () => {
				const data = -4658465654;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						isTolerance={isTolerance}
					/>
				);

				expect(wrapper.hasClass(negativeClass)).toEqual(false);
			});
		});
	});

	describe('isCurrency', () => {
		let isCurrency;

		beforeEach(() => {
			isCurrency = true;
		});
		afterEach(() => {
			isCurrency = undefined;
		});

		it('should 50 to be \'$ 50\'', () => {
			const data = 50;
			const wrapper = shallow(
				<DecimalNumber
					data={data}
					isCurrency={isCurrency}
				/>
			);
			const expected = '$ 50';

			expect(wrapper.text()).toEqual(expected);
		});

		it('should 156.158 to be \'$ 156.158\'', () => {
			const data = 156.158;
			const wrapper = shallow(
				<DecimalNumber
					data={data}
					isCurrency={isCurrency}
				/>
			);
			const expected = '$ 156.158';

			expect(wrapper.text()).toEqual(expected);
		});
	});

	describe('isPercent', () => {
		let isPercent;

		beforeEach(() => {
			isPercent = true;
		});
		afterEach(() => {
			isPercent = undefined;
		});

		it('should 50 to be \'50%\'', () => {
			const data = 50;
			const wrapper = shallow(
				<DecimalNumber
					data={data}
					isPercent={isPercent}
				/>
			);
			const expected = '50%';

			expect(wrapper.text()).toEqual(expected);
		});

		it('should 156.158 to be \'156.158%\'', () => {
			const data = 156.158;
			const wrapper = shallow(
				<DecimalNumber
					data={data}
					isPercent={isPercent}
				/>
			);
			const expected = '156.158%';

			expect(wrapper.text()).toEqual(expected);
		});
	});

	describe('hasSeparator', () => {
		let hasSeparator;

		beforeEach(() => {
			hasSeparator = true;
		});
		afterEach(() => {
			hasSeparator = undefined;
		});

		it('should 5000 to be \'5,000\'', () => {
			const data = 5000;
			const wrapper = shallow(
				<DecimalNumber
					data={data}
					hasSeparator={hasSeparator}
				/>
			);
			const expected = '5,000';

			expect(wrapper.text()).toEqual(expected);
		});

		it('should 1000000 to be \'1,000,000\'', () => {
			const data = 1000000;
			const wrapper = shallow(
				<DecimalNumber
					data={data}
					hasSeparator={hasSeparator}
				/>
			);
			const expected = '1,000,000';

			expect(wrapper.text()).toEqual(expected);
		});

		describe('decimalPlaces', () => {
			it('should 1000.56987 to be \'1,000\', when decimalPlaces is 0', () => {
				const data = 1000.56987;
				const decimalPlaces = 0;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '1,000';

				expect(wrapper.text()).toEqual(expected);
			});

			it('should 1000.41321 to be \'1,000\', when decimalPlaces is 0', () => {
				const data = 1000.41321;
				const decimalPlaces = 0;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '1,000';

				expect(wrapper.text()).toEqual(expected);
			});

			it('should 1000.56987 to be \'1,000.5\', when decimalPlaces is 1', () => {
				const data = 1000.56987;
				const decimalPlaces = 1;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '1,000.5';

				expect(wrapper.text()).toEqual(expected);
			});

			it('should 1000.42567 to be \'1,000.42\', when decimalPlaces is 2', () => {
				const data = 1000.42567;
				const decimalPlaces = 2;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '1,000.42';

				expect(wrapper.text()).toEqual(expected);
			});
			it('should 1000.42200 to be \'1,000.422\', when decimalPlaces is 4', () => {
				const data = 1000.42200;
				const decimalPlaces = 4;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '1,000.422';

				expect(wrapper.text()).toEqual(expected);
			});
			it('should 0.42200 to be \'0.422\', when decimalPlaces is 4', () => {
				const data = 0.42200;
				const decimalPlaces = 4;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '0.422';

				expect(wrapper.text()).toEqual(expected);
			});
			it('should 0.0024500 to be \'0.0024\', when decimalPlaces is 4', () => {
				const data = 0.0024500;
				const decimalPlaces = 4;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '0.0024';

				expect(wrapper.text()).toEqual(expected);
			});
			it('should -0.42200 to be \'-0.422\', when decimalPlaces is 4', () => {
				const data = -0.42200;
				const decimalPlaces = 4;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '-0.422';

				expect(wrapper.text()).toEqual(expected);
			});
			it('should -0.0024500 to be \'-0.0024\', when decimalPlaces is 4', () => {
				const data = -0.0024500;
				const decimalPlaces = 4;
				const wrapper = shallow(
					<DecimalNumber
						data={data}
						decimalPlaces={decimalPlaces}
						hasSeparator={hasSeparator}
					/>
				);
				const expected = '-0.0024';

				expect(wrapper.text()).toEqual(expected);
			});
		});
	});

	it('should mount in a full DOM', () => {
		const data = 5000;
		const isTolerance = false;
		const isCurrency = true;
		const isPercent = false;
		const hasSeparator = true;
		const className = 'mock-class';
		const decimalPlaces = 2;
		const wrapper = mount(
			<DecimalNumber
				data={data}
				isTolerance={isTolerance}
				isCurrency={isCurrency}
				isPercent={isPercent}
				hasSeparator={hasSeparator}
				className={className}
				decimalPlaces={decimalPlaces}
			/>
		);

		expect(wrapper.props().data).toEqual(data);
		expect(wrapper.props().isTolerance).toEqual(isTolerance);
		expect(wrapper.props().isCurrency).toEqual(isCurrency);
		expect(wrapper.props().isPercent).toEqual(isPercent);
		expect(wrapper.props().hasSeparator).toEqual(hasSeparator);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().decimalPlaces).toEqual(decimalPlaces);
	});
});
