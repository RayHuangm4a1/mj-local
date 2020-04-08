import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import StatusTag from '../components/status-tag';

describe('Status Tag', () => {
	it('handle default props', () => {
		const {
			tagType,
			textColor,
			backgroundColor,
		} = StatusTag.defaultProps;

		expect(tagType).toBe(StatusTag.TagTypeEnums.DEFAULT);
		expect(textColor).toEqual('');
		expect(backgroundColor).toEqual('');
	});

	it('should renders correctly', () => {
		const component = render(<StatusTag status={StatusTag.StatusEnums.SUCCESS} text="Success" />);

		expect(component).toMatchSnapshot();
	});

	it('should render without throwing an error', () => {
		const component = mount(<StatusTag status={StatusTag.StatusEnums.SUCCESS} text="Success" />);

		expect(component.contains((
			<span className="ljit-tag__text">Success</span>
		))).toEqual(true);
	});

	it('should be selectable by class "jit-status-tag"', () => {
		const component = shallow(<StatusTag status={StatusTag.StatusEnums.SUCCESS} text="Success" />);

		expect(component.is('.ljit-status-tag')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const success = mount(<StatusTag status={StatusTag.StatusEnums.SUCCESS} text="Success" className="mock-class" />);
		const error = mount(<StatusTag status={StatusTag.StatusEnums.ERROR} text="Error" className="mock-class" />);
		const warning = mount(<StatusTag status={StatusTag.StatusEnums.WARNING} text="Warning" className="mock-class" />);
		const win = mount(<StatusTag status={StatusTag.StatusEnums.WIN} text="Win" className="mock-class" />);
		const lose = mount(<StatusTag status={StatusTag.StatusEnums.LOSE} text="Lose" className="mock-class" />);
		const draw = mount(<StatusTag status={StatusTag.StatusEnums.DRAW} text="Draw" className="mock-class" />);
		const remove = mount(<StatusTag status={StatusTag.StatusEnums.REMOVE} text="Remove" className="mock-class" />);
		const pending = mount(<StatusTag status={StatusTag.StatusEnums.PENDING} text="Pending" className="mock-class" />);
		const betWin = mount(<StatusTag status={StatusTag.StatusEnums.BET_WIN} text="bet win" className="mock-class" />);
		const betLose = mount(<StatusTag status={StatusTag.StatusEnums.BET_LOSE} text="bet lose" className="mock-class" />);
		const betCanceled = mount(<StatusTag status={StatusTag.StatusEnums.BET_CANCELED} text="bet canceled" className="mock-class" />);
		const betUnOpened = mount(<StatusTag status={StatusTag.StatusEnums.BET_UNOPENED} text="bet un opened" className="mock-class" />);
		const betOpening = mount(<StatusTag status={StatusTag.StatusEnums.BET_OPENING} text="bet opening" className="mock-class" />);
		const betUnOpenedCustomized = mount(<StatusTag status={StatusTag.StatusEnums.BET_UNOPENED} text="customized" className="mock-class" textColor="yellow" backgroundColor="blue" />);
		const drawOpening = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_OPENING} text="draw opening" className="mock-class" />);
		const drawNew = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_NEW} text="draw new" className="mock-class" />);
		const drawRewarded = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_REWARDED} text="draw rewarded" className="mock-class" />);
		const drawRewarding = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_REWARDING} text="draw rewarding" className="mock-class" />);
		const drawCanceled = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_CANCELED} text="draw canceled" className="mock-class" />);
		const drawModified = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_MODIFIED} text="draw modified" className="mock-class" />);
		const drawStopped = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_STOPPED} text="draw stop" className="mock-class" />);
		const drawCanceling = mount(<StatusTag status={StatusTag.StatusEnums.DRAW_CANCELING} text="draw canceling" className="mock-class" />);
		const traceComplete = mount(<StatusTag status={StatusTag.StatusEnums.TRACE_COMPLETE} text="trace complete" className="mock-class" />);
		const traceIncomplete = mount(<StatusTag status={StatusTag.StatusEnums.TRACE_INCOMPLETE} text="trace incomplete" className="mock-class" />);

		expect(success.find('Tag').at(0).hasClass('ljit-status-tag--success')).toEqual(true);
		expect(success.find('Tag').at(0)).toHaveLength(1);
		expect(success.props().text).toBe('Success');
		expect(success.props().status).toBe(StatusTag.StatusEnums.SUCCESS);
		expect(success.props().className).toBe('mock-class');
		expect(error.find('Tag').at(0).hasClass('ljit-status-tag--error')).toEqual(true);
		expect(error.find('Tag').at(0)).toHaveLength(1);
		expect(error.props().text).toBe('Error');
		expect(error.props().status).toBe(StatusTag.StatusEnums.ERROR);
		expect(error.props().className).toBe('mock-class');
		expect(warning.find('Tag').at(0).hasClass('ljit-status-tag--warning')).toEqual(true);
		expect(warning.find('Tag').at(0)).toHaveLength(1);
		expect(warning.props().text).toBe('Warning');
		expect(warning.props().status).toBe(StatusTag.StatusEnums.WARNING);
		expect(warning.props().className).toBe('mock-class');
		expect(win.find('Tag').at(0).hasClass('ljit-status-tag--win')).toEqual(true);
		expect(win.find('Tag').at(0)).toHaveLength(1);
		expect(win.props().text).toBe('Win');
		expect(win.props().status).toBe(StatusTag.StatusEnums.WIN);
		expect(win.props().className).toBe('mock-class');
		expect(lose.find('Tag').at(0).hasClass('ljit-status-tag--lose')).toEqual(true);
		expect(lose.find('Tag').at(0)).toHaveLength(1);
		expect(lose.props().text).toBe('Lose');
		expect(lose.props().status).toBe(StatusTag.StatusEnums.LOSE);
		expect(lose.props().className).toBe('mock-class');
		expect(draw.find('Tag').at(0).hasClass('ljit-status-tag--draw')).toEqual(true);
		expect(draw.find('Tag').at(0)).toHaveLength(1);
		expect(draw.props().text).toBe('Draw');
		expect(draw.props().status).toBe(StatusTag.StatusEnums.DRAW);
		expect(draw.props().className).toBe('mock-class');
		expect(remove.find('Tag').at(0).hasClass('ljit-status-tag--remove')).toEqual(true);
		expect(remove.find('Tag').at(0)).toHaveLength(1);
		expect(remove.props().text).toBe('Remove');
		expect(remove.props().status).toBe(StatusTag.StatusEnums.REMOVE);
		expect(remove.props().className).toBe('mock-class');
		expect(pending.find('Tag').at(0).hasClass('ljit-status-tag--pending')).toEqual(true);
		expect(pending.find('Tag').at(0)).toHaveLength(1);
		expect(pending.props().text).toBe('Pending');
		expect(pending.props().status).toBe(StatusTag.StatusEnums.PENDING);
		expect(pending.props().className).toBe('mock-class');
		expect(betWin.find('Tag').at(0).hasClass('ljit-status-tag--betWin')).toEqual(true);
		expect(betWin.find('Tag').at(0)).toHaveLength(1);
		expect(betWin.props().text).toBe('bet win');
		expect(betWin.props().status).toBe(StatusTag.StatusEnums.BET_WIN);
		expect(betWin.props().className).toBe('mock-class');
		expect(betLose.find('Tag').at(0).hasClass('ljit-status-tag--betLose')).toEqual(true);
		expect(betLose.find('Tag').at(0)).toHaveLength(1);
		expect(betLose.props().text).toBe('bet lose');
		expect(betLose.props().status).toBe(StatusTag.StatusEnums.BET_LOSE);
		expect(betLose.props().className).toBe('mock-class');
		expect(betUnOpened.find('Tag').at(0).hasClass('ljit-status-tag--betUnOpened')).toEqual(true);
		expect(betUnOpened.find('Tag').at(0)).toHaveLength(1);
		expect(betUnOpened.props().text).toBe('bet un opened');
		expect(betUnOpened.props().status).toBe(StatusTag.StatusEnums.BET_UNOPENED);
		expect(betUnOpened.props().className).toBe('mock-class');
		expect(betOpening.find('Tag').at(0).hasClass('ljit-status-tag--betOpening')).toEqual(true);
		expect(betOpening.find('Tag').at(0)).toHaveLength(1);
		expect(betOpening.props().text).toBe('bet opening');
		expect(betOpening.props().status).toBe(StatusTag.StatusEnums.BET_OPENING);
		expect(betOpening.props().className).toBe('mock-class');
		expect(betCanceled.find('Tag').at(0).hasClass('ljit-status-tag--betCanceled')).toEqual(true);
		expect(betCanceled.find('Tag').at(0)).toHaveLength(1);
		expect(betCanceled.props().text).toBe('bet canceled');
		expect(betCanceled.props().status).toBe(StatusTag.StatusEnums.BET_CANCELED);
		expect(betCanceled.props().className).toBe('mock-class');
		expect(betUnOpenedCustomized.find('Tag').at(0).hasClass('ljit-status-tag--betUnOpened')).toEqual(true);
		expect(betUnOpenedCustomized.find('Tag').at(0)).toHaveLength(1);
		expect(betUnOpenedCustomized.props().text).toBe('customized');
		expect(betUnOpenedCustomized.props().status).toBe(StatusTag.StatusEnums.BET_UNOPENED);
		expect(betUnOpenedCustomized.props().className).toBe('mock-class');
		expect(betUnOpenedCustomized.props().textColor).toBe('yellow');
		expect(betUnOpenedCustomized.props().backgroundColor).toBe('blue');
		expect(drawOpening.find('Tag').at(0).hasClass('ljit-status-tag--drawOpening')).toEqual(true);
		expect(drawOpening.find('Tag').at(0)).toHaveLength(1);
		expect(drawOpening.props().text).toBe('draw opening');
		expect(drawOpening.props().status).toBe(StatusTag.StatusEnums.DRAW_OPENING);
		expect(drawOpening.props().className).toBe('mock-class');
		expect(drawNew.find('Tag').at(0).hasClass('ljit-status-tag--drawNew')).toEqual(true);
		expect(drawNew.find('Tag').at(0)).toHaveLength(1);
		expect(drawNew.props().text).toBe('draw new');
		expect(drawNew.props().status).toBe(StatusTag.StatusEnums.DRAW_NEW);
		expect(drawNew.props().className).toBe('mock-class');
		expect(drawRewarded.find('Tag').at(0).hasClass('ljit-status-tag--drawRewarded')).toEqual(true);
		expect(drawRewarded.find('Tag').at(0)).toHaveLength(1);
		expect(drawRewarded.props().text).toBe('draw rewarded');
		expect(drawRewarded.props().status).toBe(StatusTag.StatusEnums.DRAW_REWARDED);
		expect(drawRewarded.props().className).toBe('mock-class');
		expect(drawRewarding.find('Tag').at(0).hasClass('ljit-status-tag--drawRewarding')).toEqual(true);
		expect(drawRewarding.find('Tag').at(0)).toHaveLength(1);
		expect(drawRewarding.props().text).toBe('draw rewarding');
		expect(drawRewarding.props().status).toBe(StatusTag.StatusEnums.DRAW_REWARDING);
		expect(drawRewarding.props().className).toBe('mock-class');
		expect(drawCanceled.find('Tag').at(0).hasClass('ljit-status-tag--drawCanceled')).toEqual(true);
		expect(drawCanceled.find('Tag').at(0)).toHaveLength(1);
		expect(drawCanceled.props().text).toBe('draw canceled');
		expect(drawCanceled.props().status).toBe(StatusTag.StatusEnums.DRAW_CANCELED);
		expect(drawCanceled.props().className).toBe('mock-class');
		expect(drawModified.find('Tag').at(0).hasClass('ljit-status-tag--drawModified')).toEqual(true);
		expect(drawModified.find('Tag').at(0)).toHaveLength(1);
		expect(drawModified.props().text).toBe('draw modified');
		expect(drawModified.props().status).toBe(StatusTag.StatusEnums.DRAW_MODIFIED);
		expect(drawModified.props().className).toBe('mock-class');
		expect(drawStopped.find('Tag').at(0).hasClass('ljit-status-tag--drawStopped')).toEqual(true);
		expect(drawStopped.find('Tag').at(0)).toHaveLength(1);
		expect(drawStopped.props().text).toBe('draw stop');
		expect(drawStopped.props().status).toBe(StatusTag.StatusEnums.DRAW_STOPPED);
		expect(drawStopped.props().className).toBe('mock-class');
		expect(drawCanceling.find('Tag').at(0).hasClass('ljit-status-tag--drawCanceling')).toEqual(true);
		expect(drawCanceling.find('Tag').at(0)).toHaveLength(1);
		expect(drawCanceling.props().text).toBe('draw canceling');
		expect(drawCanceling.props().status).toBe(StatusTag.StatusEnums.DRAW_CANCELING);
		expect(drawCanceling.props().className).toBe('mock-class');
		expect(traceComplete.find('Tag').at(0).hasClass('ljit-status-tag--traceComplete')).toEqual(true);
		expect(traceComplete.find('Tag').at(0)).toHaveLength(1);
		expect(traceComplete.props().text).toBe('trace complete');
		expect(traceComplete.props().status).toBe(StatusTag.StatusEnums.TRACE_COMPLETE);
		expect(traceComplete.props().className).toBe('mock-class');
		expect(traceIncomplete.find('Tag').at(0).hasClass('ljit-status-tag--traceIncomplete')).toEqual(true);
		expect(traceIncomplete.find('Tag').at(0)).toHaveLength(1);
		expect(traceIncomplete.props().text).toBe('trace incomplete');
		expect(traceIncomplete.props().status).toBe(StatusTag.StatusEnums.TRACE_INCOMPLETE);
		expect(traceIncomplete.props().className).toBe('mock-class');
	});

	it('should render to static HTML', () => {
		expect(render(<StatusTag status={StatusTag.StatusEnums.SUCCESS} text="Success" />).text()).toEqual('Success');
	});

	describe('when status has changed', () => {
		it('should be selectable by class "jit-status-tag--success"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.SUCCESS} text="Success" />);

			expect(component.is('.ljit-status-tag--success')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--error"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.ERROR} text="Error" />);

			expect(component.is('.ljit-status-tag--error')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--warning"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.WARNING} text="Warning" />);

			expect(component.is('.ljit-status-tag--warning')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--win"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.WIN} text="Win" />);

			expect(component.is('.ljit-status-tag--win')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--lose"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.LOSE} text="Lose" />);

			expect(component.is('.ljit-status-tag--lose')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--draw"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW} text="Draw" />);

			expect(component.is('.ljit-status-tag--draw')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--remove"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.REMOVE} text="Remove" />);

			expect(component.is('.ljit-status-tag--remove')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--pending"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.PENDING} text="Pending" />);

			expect(component.is('.ljit-status-tag--pending')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--betWin"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.BET_WIN} text="bet win" />);

			expect(component.is('.ljit-status-tag--betWin')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--betLose"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.BET_LOSE} text="bet lose" />);

			expect(component.is('.ljit-status-tag--betLose')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--betUnOpened"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.BET_UNOPENED} text="bet un opened" />);

			expect(component.is('.ljit-status-tag--betUnOpened')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--betOpening"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.BET_OPENING} text="bet opening" />);

			expect(component.is('.ljit-status-tag--betOpening')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--betCanceled"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.BET_CANCELED} text="bet canceled" />);

			expect(component.is('.ljit-status-tag--betCanceled')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--drawOpening"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_OPENING} text="draw opening" />);

			expect(component.is('.ljit-status-tag--drawOpening')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--drawNew"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_NEW} text="draw new" />);

			expect(component.is('.ljit-status-tag--drawNew')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--drawRewarded"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_REWARDED} text="draw rewarded" />);

			expect(component.is('.ljit-status-tag--drawRewarded')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--drawRewarding"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_REWARDING} text="draw rewarding" />);

			expect(component.is('.ljit-status-tag--drawRewarding')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--drawCanceled', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_CANCELED} text="draw canceled" />);

			expect(component.is('.ljit-status-tag--drawCanceled')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--drawModified"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_MODIFIED} text="draw modified" />);

			expect(component.is('.ljit-status-tag--drawModified')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--drawStopped"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_STOPPED} text="draw stop" />);

			expect(component.is('.ljit-status-tag--drawStopped')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--drawCanceling', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.DRAW_CANCELING} text="draw canceling" />);

			expect(component.is('.ljit-status-tag--drawCanceling')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--traceComplete"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.TRACE_COMPLETE} text="trace complete" />);

			expect(component.is('.ljit-status-tag--traceComplete')).toEqual(true);
		});
		it('should be selectable by class "jit-status-tag--traceIncomplete"', () => {
			const component = shallow(<StatusTag status={StatusTag.StatusEnums.TRACE_INCOMPLETE} text="trace incomplete" />);

			expect(component.is('.ljit-status-tag--traceIncomplete')).toEqual(true);
		});
	});

	describe('when tagType has changed', () => {
		it('should be selectable by class "jit-status-tag--default"', () => {
			const component = shallow(
				<StatusTag
					status={StatusTag.StatusEnums.SUCCESS}
					tagType={StatusTag.TagTypeEnums.DEFAULT}
					text="Success"
				/>
			);

			expect(component.is('.ljit-status-tag--default')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--outline"', () => {
			const component = shallow(
				<StatusTag
					status={StatusTag.StatusEnums.ERROR}
					tagType={StatusTag.TagTypeEnums.OUTLINE}
					text="Error"
				/>
			);

			expect(component.is('.ljit-status-tag--outline')).toEqual(true);
		});

		it('should be selectable by class "jit-status-tag--hollow"', () => {
			const component = shallow(
				<StatusTag
					status={StatusTag.StatusEnums.ERROR}
					tagType={StatusTag.TagTypeEnums.HOLLOW}
					text="Error"
				/>
			);

			expect(component.is('.ljit-status-tag--hollow')).toEqual(true);
		});
	});

	describe('Status Enums', () => {
		it('should contain all properties.', () => {
			expect(StatusTag.StatusEnums).toHaveProperty('SUCCESS', 'success');
			expect(StatusTag.StatusEnums).toHaveProperty('ERROR', 'error');
			expect(StatusTag.StatusEnums).toHaveProperty('WARNING', 'warning');
			expect(StatusTag.StatusEnums).toHaveProperty('WIN', 'win');
			expect(StatusTag.StatusEnums).toHaveProperty('LOSE', 'lose');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW', 'draw');
			expect(StatusTag.StatusEnums).toHaveProperty('REMOVE', 'remove');
			expect(StatusTag.StatusEnums).toHaveProperty('PENDING', 'pending');
			expect(StatusTag.StatusEnums).toHaveProperty('BET_WIN', 'betWin');
			expect(StatusTag.StatusEnums).toHaveProperty('BET_LOSE', 'betLose');
			expect(StatusTag.StatusEnums).toHaveProperty('BET_UNOPENED', 'betUnOpened');
			expect(StatusTag.StatusEnums).toHaveProperty('BET_OPENING', 'betOpening');
			expect(StatusTag.StatusEnums).toHaveProperty('BET_CANCELED', 'betCanceled');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_OPENING', 'drawOpening');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_NEW', 'drawNew');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_REWARDING', 'drawRewarding');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_REWARDED', 'drawRewarded');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_CANCELED', 'drawCanceled');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_MODIFIED', 'drawModified');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_STOPPED', 'drawStopped');
			expect(StatusTag.StatusEnums).toHaveProperty('DRAW_CANCELING', 'drawCanceling');
			expect(StatusTag.StatusEnums).toHaveProperty('TRACE_COMPLETE', 'traceComplete');
			expect(StatusTag.StatusEnums).toHaveProperty('TRACE_INCOMPLETE', 'traceIncomplete');
		});
	});

	describe('TagTypeEnums', () => {
		it('should contain default property.', () => {
			expect(StatusTag.TagTypeEnums).toHaveProperty('DEFAULT', 'default');
		});

		it('should contain outline property.', () => {
			expect(StatusTag.TagTypeEnums).toHaveProperty('OUTLINE', 'outline');
		});

		it('should contain hollow property.', () => {
			expect(StatusTag.TagTypeEnums).toHaveProperty('HOLLOW', 'hollow');
		});
	});
});
