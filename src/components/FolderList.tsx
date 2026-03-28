import React, { useState } from 'react';
import FolderListItem from './FolderListItem'
import { useFolderStore } from '../store/useFolderStore';

const FolderList = ({ data, id }: { data: Data[], id: string }) => {
	const [toggle, setToggle] = useState(false);
	const removeFolder = useFolderStore(state => state.removeFolder);
	const addFolder = useFolderStore(state => state.addFolder);

	const handleRemove = (listItemId: string) => {
		removeFolder(listItemId);
	};

	const handleAdd = (parentId: string | null, siblingCount: number) => {
		const fallback_text = 'Folder ' + (siblingCount + 1);
		let text = window.prompt('Enter folder name', fallback_text);
		text = text !== null ? text.toString() : fallback_text;

		const listItem: Data = {
			id: text.replace(/\s+/g, '-').toLowerCase(),
			title: text,
			subfolders: []
		};

		addFolder(parentId, listItem);
	};

	const toggleCollapse = () => {
		setToggle(!toggle);
	};

	return (
		<div id={id}>
			{data && data.length > 0 ? data.map((listItem) => {
				const { subfolders } = listItem;
				const props = {
					uid: listItem.id,
					toggle: toggle,
					listItem: listItem,
					handleRemove: handleRemove,
					handleAdd: () => handleAdd(listItem.id, subfolders.length),
					toggleCollapse: toggleCollapse
				};
				return <ul key={listItem.id} className='xm-folder--list'>
					<FolderListItem {...props} />
					{subfolders && <FolderList data={subfolders} id={listItem.id} />}
				</ul>
			}) : <ul className='xm-folder--list'><li className='xm-folder--single'><span className='xm-folder--title xm-folder--title-nodata'>- No Data</span></li></ul>}
		</div>
	);
}

export default FolderList
