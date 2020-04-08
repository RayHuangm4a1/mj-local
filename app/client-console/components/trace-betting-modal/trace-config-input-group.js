import React, { PureComponent, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Divider,
	Row,
	Col,
	LabelContent,
	CheckBox,
} from 'ljit-react-components';

const propTypes = {
	className: PropTypes.string,
	isTerminatedIfWin: PropTypes.bool.isRequired,
	onChangePassword: PropTypes.func,
	onChangeIsTerminatedIfWin: PropTypes.func,
};

const defaultProps = {
	className: '',
	onChangePassword: () => {},
	onChangeIsTerminatedIfWin: () => {},
};

const PREFIX_CLASS = 'trace-config-input-group';

class TraceConfigInputGroup extends PureComponent {
	constructor() {
		super();
	}

	render() {
		const {
			className,
			isTerminatedIfWin,
			onChangeIsTerminatedIfWin,
		} = this.props;

		return (
			<div className={cx(PREFIX_CLASS, className)}>
				<Divider className={`${PREFIX_CLASS}__divider`}/>
				<Row
					className={`${PREFIX_CLASS}__row`}
					type={Row.TypeEnums.FLEX}
					flexLayout={Row.FlexJustifyEnums.START}
				>
					<Col className={`${PREFIX_CLASS}__col`}>
						<LabelContent
							className={`${PREFIX_CLASS}__item`}
						>
							<CheckBox
								className={`${PREFIX_CLASS}__checkbox`}
								value={isTerminatedIfWin}
								onChange={event => onChangeIsTerminatedIfWin(event.target.checked)}
							>
								中奖后停止追号
							</CheckBox>
						</LabelContent>
					</Col>
				</Row>
			</div>
		);
	}
}

TraceConfigInputGroup.propTypes = propTypes;
TraceConfigInputGroup.defaultProps = defaultProps;

export default TraceConfigInputGroup;
