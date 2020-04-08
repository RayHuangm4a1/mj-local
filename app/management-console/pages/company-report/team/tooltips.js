const COLON_RULE = /:\s{1}/;
const TOOLTIP_GUTTER = 30;

function getBodyLines(bodyItem = {}) {
	const lines = bodyItem.lines || [];

	return lines.map((line) => {
		const chips = line.split(COLON_RULE);
		// get label data
		return chips[0];
	});
}
function renderTooltip(prefixClass = '', tooltip = {}) {
	const {
		dataPoints = [],
		labelColors = [],
		title = [],
		body = [],
	} = tooltip;
	const titleLines = title || [];
	const bodyLines = body.map(getBodyLines);

	return `
		<div class="${prefixClass}__wrapper">
			<div class="${prefixClass}__title">
				${titleLines.map((title) => title).join('')}
			</div>
			<table class="${prefixClass}__content">
				<tbody>
					${bodyLines.map((body, index) => {
						const dataPoint = dataPoints[index];
						const labelColor = labelColors[index];
						const style = `
							background: ${labelColor.backgroundColor};
						`;
						const dot = `
							<span
								class="${prefixClass}__key"
								style="${style}"
							>
							</span>
						`;
						return `
							<tr>
								<td>
									${dot}
									${body}
								</td>
								<td>
									${dataPoint.value}
								</td>
							</tr>
						`;
					}).join('')}
				</tbody>
			</table>
		</div>
	`;
}

function checkTooltipOverHalfChart(canvas = {}, tooltip = {}) {
	const {
		offsetWidth: canvasWidth,
	} = canvas;
	const tooltipOffsetRight = tooltip.caretX + tooltip.width;

	return tooltipOffsetRight > canvasWidth / 2;
}

function tooltips(tooltip) {
	const {
		canvas,
		id: chartId,
	} = this._chart;
	const tooltipId = `chartjs-${chartId}`;
	const prefixClass = 'chartjs-tooltip';
	const canvasRectangle =  canvas.getBoundingClientRect();
	let tooltipEl = document.getElementById(tooltipId);

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.id = tooltipId;
		tooltipEl.classList.add(prefixClass);
		canvas.parentNode.appendChild(tooltipEl);
	}

	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = 0;
		return;
	}

	if (tooltip.body) {
		tooltipEl.innerHTML = renderTooltip(prefixClass, tooltip);
	}

	let positionX = canvasRectangle.left;
	let positionY = canvasRectangle.top;
	let offsetX = positionX + TOOLTIP_GUTTER + tooltip.caretX;
	let offsetY = positionY + tooltip.caretY;

	if (checkTooltipOverHalfChart(canvas, tooltip)) {
		offsetX = positionX + tooltip.caretX - TOOLTIP_GUTTER - tooltipEl.offsetWidth;
	}
	tooltipEl.style.opacity = 1;
	tooltipEl.style.left = `${offsetX}px`;
	tooltipEl.style.top = `${offsetY}px`;
};

export default tooltips;
