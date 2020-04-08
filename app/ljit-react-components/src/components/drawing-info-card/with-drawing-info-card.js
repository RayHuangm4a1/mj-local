import React, { Component, } from 'react';
import { drawingInfoCardPropTypes, } from './utils';

function withDrawingInfoCard(
	WrappedComponent
) {
	class DrawingInfoCardWrapper extends Component {
		render() {
			const {
				opencode,
				...rest
			} = this.props;

			const splitOpencodes = opencode.split(',');

			return (
				<WrappedComponent
					opencode={opencode}
					splitOpencodes={splitOpencodes}
					{...rest}
				/>
			);
		}
	}

	DrawingInfoCardWrapper.displayName = `withDrawingInfoCard(${getDisplayName(WrappedComponent)})`;
	DrawingInfoCardWrapper.propTypes = drawingInfoCardPropTypes;

	return DrawingInfoCardWrapper;
}

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withDrawingInfoCard;
