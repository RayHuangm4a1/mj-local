/* eslint-env jest */
// https://github.com/atlassian/react-beautiful-dnd/issues/623
import React from 'react';
import {
	DragDropContext,
	Draggable,
	Droppable,
} from 'react-beautiful-dnd';

export function withDndContext(element) {
	return <DragDropContext>{element}</DragDropContext>;
}

function makeDroppableInfo(droppable) {
	const { droppableId } = droppable.props();

	return {
		droppableId,
		draggables: {},
		draggableIds: [],
	};
}

function makeDraggableInfo(draggable) {
	const { draggableId, index, type } = draggable.props();
	const droppable = draggable.closest(Droppable);

	if (droppable.length === 0) {
		throw new Error(`No Droppable found for draggable: ${draggableId}`);
	}

	const { droppableId } = droppable.props();
	const draggableInfo = {
		droppableId,
		draggableId,
		index,
		type,
	};

	return draggableInfo;
}

export function buildRegistry(page) {
	const registry = {
		droppables: {},
		droppableIds: [],
	};

	page.find(Droppable).forEach((droppable) => {
		const droppableInfo = makeDroppableInfo(droppable);

		registry.droppableIds.push(droppableInfo.droppableId);
		registry.droppables[droppableInfo.droppableId] = droppableInfo;
	});

	page.find(Draggable).forEach(draggable => {
		const draggableInfo = makeDraggableInfo(draggable);
		const { droppableId } = draggableInfo;

		registry.droppables[droppableId].draggables[draggableInfo.draggableId] = draggableInfo;
		registry.droppables[droppableId].draggableIds.push(
			draggableInfo.draggableId
		);
	});

	return registry;
}

export function simulateDragAndDrop(
	page,
	fromDroppableId,
	draggableIndex,
	toDroppableId,
	toIndex
) {
	const reg = buildRegistry(page);

	if (
		reg.droppableIds.indexOf(fromDroppableId) == -1
		|| reg.droppableIds.indexOf(toDroppableId) == -1
	) {
		throw new Error(
			`One of the droppableIds missing in page. Only found these ids: ${reg.droppableIds.join(
				', '
			)}`
		);
	}

	if (!reg.droppables[fromDroppableId].draggableIds[draggableIndex]) {
		throw new Error(`No element found in index ${draggableIndex}`);
	}

	const draggableId = reg.droppables[fromDroppableId].draggableIds[draggableIndex];
	const draggable = reg.droppables[fromDroppableId].draggables[draggableId];

	if (!draggable) {
		throw new Error(
			`No draggable fond for ${draggableId} in fromDroppablas which contain ids : ${Object.keys(
				reg.droppables[fromDroppableId].draggables
			).join(', ')}`
		);
	}

	if (typeof draggableId === 'undefined') {
		throw new Error(
			`No draggable found on fromIndex nr ${draggableIndex} index contents:[${reg.droppables[
				fromDroppableId
			].draggableIds.join(', ')}] `
		);
	}

	const dropResult = {
		draggableId,
		type: draggable.type,
		source: { index: draggableIndex, droppableId: fromDroppableId },
		destination: { droppableId: toDroppableId, index: toIndex },
		reason: 'DROP',
	};

	page
		.find(DragDropContext)
		.props()
		.onDragEnd(dropResult);
}
