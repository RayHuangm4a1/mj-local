import React from 'react';
import { MemoryRouter, Route, } from 'react-router-dom';
import { mount, } from 'enzyme';
import Breadcrumb from '../components/breadcrumb';

const {
	BreadcrumbProvider,
	BreadcrumbItem,
} = Breadcrumb;

const SecondComponent = () => (
	<div>
		<BreadcrumbItem to='/first/second'>second page</BreadcrumbItem>
	</div>
);
const FirstComponent = () => (
	<div>
		<BreadcrumbItem to='/first'>first page</BreadcrumbItem>

		<Route path="/first/second" component={SecondComponent} />
	</div>
);

class BreadcrumbTestContainer extends React.Component {
	render() {
		return (
			<MemoryRouter initialEntries={[ '/', ]} initialIndex={0}>
				<BreadcrumbProvider>
					<div>
						<Breadcrumb />
						<BreadcrumbItem to='/'>index page</BreadcrumbItem>
						<Route
							exact
							path="/"
							render={({ history, }) => (
								<div>
									<button
										type='button'
										className="navigate-to-first"
										onClick={() => { history.push('/first'); }}
									/>
									<button
										type='button'
										className="navigate-to-second"
										onClick={() => { history.push('/first/second'); }}
									/>
								</div>
							)}
						/>
						<Route path="/first" component={FirstComponent} />
					</div>
				</BreadcrumbProvider>
			</MemoryRouter>
		);
	}
}


describe('Breadcrumb', () => {
	describe('Breadcrumb with router', () => {
		let wrapper;

		beforeEach(() => {
			wrapper =  mount(<BreadcrumbTestContainer />);
		});
		afterEach(() => {
			wrapper = undefined;
		});

		describe('when link to index page', () => {
			it('should find only one crumb', () => {
				expect(
					wrapper.find('.ljit-breadcrumb .ljit-breadcrumb__item')
				).toHaveLength(1);
			});

			it('should be selectable by ljit-breadcrumb__item--inactive', () => {
				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__item')
						.at(0)
						.hasClass('ljit-breadcrumb__item--inactive')
				).toEqual(true);
			});

			it('should type be span with last one crumb', () => {
				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__item.ljit-breadcrumb__item--inactive')
						.last()
						.type()
				).toEqual('span');
			});
		});

		describe('when link to first child page', () => {
			it('should first crumb with a', () => {
				wrapper.find('.navigate-to-first').simulate('click');

				expect(
					wrapper
						.find('a')
				).toHaveLength(1);
			});

			it('should first crumb link to "/"', () => {
				wrapper.find('.navigate-to-first').simulate('click');

				expect(
					wrapper
						.find('a')
						.props()
						.to
				).toEqual('/');
			});

			it('should contain one separator', () => {
				wrapper.find('.navigate-to-first').simulate('click');

				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__separator')
				).toHaveLength(1);
			});

			it('should separator contain "/" children', () => {
				wrapper.find('.navigate-to-first').simulate('click');

				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__separator')
						.at(0)
						.props()
						.children
				).toEqual('/');
			});

			it('should contain one inactive crumb', () => {
				wrapper.find('.navigate-to-first').simulate('click');

				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__item--inactive')
				).toHaveLength(1);
			});

			it('should inactive crumb contain "first page" children', () => {
				wrapper.find('.navigate-to-first').simulate('click');

				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__item--inactive')
						.at(0)
						.props()
						.children
				).toEqual('first page');
			});
		});

		describe('when link to second child page', () => {
			it('should two crumbs with a', () => {
				wrapper.find('.navigate-to-second').simulate('click');

				expect(
					wrapper
						.find('a')
				).toHaveLength(2);
			});

			it('should first crumb link to "/"', () => {
				wrapper.find('.navigate-to-second').simulate('click');

				expect(
					wrapper
						.find('a')
						.at(0)
						.props()
						.to
				).toEqual('/');
			});

			it('should second crumb link to "/first"', () => {
				wrapper.find('.navigate-to-second').simulate('click');

				expect(
					wrapper
						.find('a')
						.at(1)
						.props()
						.to
				).toEqual('/first');
			});

			it('should contain two separators', () => {
				wrapper.find('.navigate-to-second').simulate('click');

				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__separator')
				).toHaveLength(2);
			});

			it('should inactive crumb contain "second page" children', () => {
				wrapper.find('.navigate-to-second').simulate('click');

				expect(
					wrapper
						.find('.ljit-breadcrumb .ljit-breadcrumb__item--inactive')
						.at(0)
						.props()
						.children
				).toEqual('second page');
			});
		});
	});
});
