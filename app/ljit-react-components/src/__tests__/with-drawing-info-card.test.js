import React from 'react';
import { shallow, } from 'enzyme';
import withDrawingInfoCard  from '../components/drawing-info-card/with-drawing-info-card';

describe('DrawingInfoCardCodeBallCircle', () => {
	let mockComponent;
	let WithDrawingInfoCardWrappedComponent;

	beforeEach(() => {
		mockComponent = 'mock-component';
		WithDrawingInfoCardWrappedComponent = withDrawingInfoCard(mockComponent);
	});

	afterEach(() => {
		mockComponent = undefined;
		WithDrawingInfoCardWrappedComponent = undefined;
	});

	it('should renders correctly', () => {
		const props = {
			opencode: '1,2,3,4,5',
		};
		const wrapper = shallow(<WithDrawingInfoCardWrappedComponent {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			opencode: '1,2,3,4,5',
		};
		const wrapper = shallow(<WithDrawingInfoCardWrappedComponent {...props} />);

		expect(wrapper.props().opencode).toBe(props.opencode);
	});
});
