import React from 'react';
import PropTypes from 'prop-types';
import {
	Page,
	Toolbar,
	ToolbarButton,
	BackButton,
	Icon,
} from 'react-onsenui';

/*
	PageObject = {
		// Require
		title,
		component,

		// Optional
		isToolbarHidden: true / false,

		toolbarButtons: {
			leftButtons: [
				{
					id: 'wallet',
					icon: 'fa-wallet', (Onsen UI 提供的 icon：FontAwesome Ionicons MaterialDesignIconicFont)
					component: (自己定義要 render 的 component)
				}
			],

			rightButtons: [

			],
		},
	}
*/
export default function withPage(PageObject) {
	let onNavigatorEvent = () => {};

	const propTypes = {
		navigationType: PropTypes.string,
		navigationTitle: PropTypes.string,
		onNavigate: PropTypes.func,
		onBack: PropTypes.func,
	};

	const defaultProps = {
		navigationType: '',
		navigationTitle: '',
		onNavigate: () => {},
		onBack: () => {},
	};

	function WithPageComponent(props) {
		const {
			onNavigate,
			onBack,
			navigationType,
			navigationTitle,
		} = props;

		const {
			title,
			component: PageComponent,
			isToolbarHidden,
			toolbarButtons = {},
		} = PageObject;

		function renderToolbar() {
			return (
				<Toolbar>
					{_renderBackButton(navigationType)}

					<div className="center">
						{navigationTitle || title}
					</div>

					{_renderRightButtons(toolbarButtons.rightButtons)}
				</Toolbar>
			);
		}
		
		function _renderBackButton() {
			if (navigationType === 'push') {
				return (
					<div className='left'>
						<BackButton onClick={onBack}/>
					</div>
				);

			} else if (navigationType === 'showModal') {
				return (
					<div className='left'>
						<ToolbarButton onClick={onBack}>
							关闭
						</ToolbarButton>
					</div>
				);
			}
		}

		function _renderRightButtons(rightButtons) {
			if (rightButtons && rightButtons.length > 0) {
				return (
					<div className="right">
						{
							rightButtons.map((button, index) => {
								return (
									<ToolbarButton
										key={button.id + index}
										onClick={() => {
											_handleNavigatorEvent(button.id);
										}}
									>
										{_renderButtonContent(button)}
									</ToolbarButton>
								);
							})
						}
					</div>
				);
			}
		}

		function _renderButtonContent(button) {
			return button.component ?
				button.component : <Icon icon={button.icon} />;
		}

		function _handleNavigatorEvent(event) {
			if (!onNavigatorEvent) {
				return;
			}

			onNavigatorEvent(event);
		}

		return (
			<Page
				renderToolbar={isToolbarHidden ? () => {} : renderToolbar}
				onInit={() => _handleNavigatorEvent('on-init')}
				onShow={() => _handleNavigatorEvent('on-show')}
				onHide={() => _handleNavigatorEvent('on-hide')}
			>
				<PageComponent
					setOnNavigatorEvent={(func) => {
						if (typeof func !== 'function') {
							return;
						}

						onNavigatorEvent = func;
					}}
					{...props}
				/>
			</Page>
		);
	}

	WithPageComponent.propTypes = propTypes;
	WithPageComponent.defaultProps = defaultProps;

	return WithPageComponent;
}
