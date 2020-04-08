import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import {
	Button,
} from 'ljit-react-components';

const propTypes = {
	className: PropTypes.string,
	isGenerateButtonDisabled: PropTypes.bool,
	children: PropTypes.node,
	onClickGenerateButton: PropTypes.func,
};

const defaultProps = {
	className: '',
	isGenerateButtonDisabled: false,
	onClickGenerateButton: () => {},
};

const PREFIX_CLASS = 'trace-plan-input-group';

class TracePlanInputGroup extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			className,
			isGenerateButtonDisabled,
			children,
			onClickGenerateButton,
		} = this.props;

		return (
			<div className={className}>
				{children}
				<div className={cx(PREFIX_CLASS, className)}>
					<Button
						className={`${PREFIX_CLASS}__generate-button`}
						outline={Button.OutlineEnums.SOLID}
						onClick={onClickGenerateButton}
						disabled={isGenerateButtonDisabled}
					>
						生成追号计划
					</Button>
				</div>
			</div>
		);
	}

	shouldComponentUpdate(nextProps) {
		if (!isEqual(this.props, nextProps)) {
			return true;
		}
		return false;
	}
}

TracePlanInputGroup.propTypes = propTypes;
TracePlanInputGroup.defaultProps = defaultProps;

export default TracePlanInputGroup;
