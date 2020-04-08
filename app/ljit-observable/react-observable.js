import React from "react";

let _ljitObservable = { notify: () => {}, subscribe: () => {} };
const LjitObservableContext = React.createContext(_ljitObservable);

function _Provider ({
	observable,
	children
}) {
	_ljitObservable = observable;

	return (
		<LjitObservableContext.Provider value={_ljitObservable}>
			{children}
		</LjitObservableContext.Provider>
	);
}

function _mapXToProps () {
	return {};
}
function _ConnectObservable (
	mapNotifyToProps = _mapXToProps,
	mapSubscribeToProps = _mapXToProps,
) {
	if (typeof mapNotifyToProps !== "function") { mapNotifyToProps = _mapXToProps; }
	if (typeof mapSubscribeToProps !== "function") { mapSubscribeToProps = _mapXToProps; }

	return function (WrappedComponent) {
		return function LjitReactObservableConsumer(props) {
			return (
				<LjitObservableContext.Consumer>
					{(ljitObservable) => {
						const notifyProps = mapNotifyToProps(ljitObservable.notify);
						const subscribeProps = mapSubscribeToProps(ljitObservable.subscribe);

						return (
							<WrappedComponent
								{...props}
								{...notifyProps}
								{...subscribeProps}
							/>
						);
					}}
				</LjitObservableContext.Consumer>
			);
		};
	};
}

export const Provider = _Provider;
export const connectObservable = _ConnectObservable;
export const getNotifyInstance = function () {
	return {
		notify: (event, object) => {
			_ljitObservable.notify(event, object);
		}
	};
};
