import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Wallets from '../../features/wallets';
import { Icon } from 'ljit-react-components';
import './style.styl';

const PREFIX_CLASS = 'third-party';
const LAYOUT_PREFIX_CLASS = 'third-party-layout';
const LAYOUT_COLUMN_PREFIX_CLASS = `${LAYOUT_PREFIX_CLASS}__column`;

const propTypes = {
	renderedRoutes: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
};

class ThirdPartyPage extends Component {
	constructor(props) {
		super(props);

		this._renderLayout = this._renderLayout.bind(this);
	}

	_renderLayout() {
		const {
			renderedRoutes,
		} = this.props;

		return (
			<div className={LAYOUT_PREFIX_CLASS}>
				<div className={`${LAYOUT_COLUMN_PREFIX_CLASS} ${LAYOUT_COLUMN_PREFIX_CLASS}--fixed-small`}>
					{/* empty block */}
				</div>
				<div className={LAYOUT_COLUMN_PREFIX_CLASS}>
					{renderedRoutes}
				</div>
				<div className={`${LAYOUT_COLUMN_PREFIX_CLASS} ${LAYOUT_COLUMN_PREFIX_CLASS}--fixed`}>
					<div className={`${PREFIX_CLASS}__wallet`}>
						<div className={`${PREFIX_CLASS}__wallet-title`}>
							<Icon
								type={Icon.IconTypeEnums.ELECTRONIC_YELLOW}
								size={Icon.SizeEnums.X_LARGE}
							/>
							<span>钱包</span>
						</div>
						<Wallets
							isHiddenSupervisionWallet
						/>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className={PREFIX_CLASS}>
				{/* TODO use lottery-sider-menu */}
				{this._renderLayout()}
			</div>
		);
	}
	// TODO 如果有其他 component 耶需要在導頁的時候將捲軸拉到最上面，就把這個寫成 HOC
	componentDidMount() {
		window.scrollTo(0,0);
	}
}

ThirdPartyPage.propTypes = propTypes;

export default ThirdPartyPage;
