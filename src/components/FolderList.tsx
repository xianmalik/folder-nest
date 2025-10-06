import React, { useState, useEffect } from 'react';
import FolderListItem from './FolderListItem'
import { useFolderStore } from '../store/useFolderStore';

const FolderList = (data: any) => {
	const [toggle, setToggle] = useState(false);
	const [currentData, setCurrentData] = useState<Data[]>([]);
	const removeFolder = useFolderStore(state => state.removeFolder);
	const addFolder = useFolderStore(state => state.addFolder);
  
	useEffect(() => {
		setCurrentData(data.data)
	}, [data]);

	const handleRemove = (listItemId: string) => {
		// Use Zustand store to remove folder
		removeFolder(listItemId);
		
		// Also update local state for immediate UI update
		const newArray = [...currentData];
		const foundedIndex = currentData.findIndex(({ id }) => id === listItemId);
		newArray.splice(foundedIndex, 1);
		setCurrentData(newArray);
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		let fallback_text = 'Folder ' + (currentData.length + 1)
		let text = window.prompt('Enter folder name', fallback_text);
		text = text !== null ? text.toString() : fallback_text

		const listItem: Data = {
			id: text.replace(/\s+/g, '-').toLowerCase(),
			title: text,
			subfolders: []
		}
	
		// Add to Zustand store
		const parentId = data.id.split('-')[0] !== 'root' ? data.id.split('-')[0] : null;
		addFolder(parentId, listItem);
		
		// Also update local state for immediate UI update
		if (currentData) {
			setCurrentData([...currentData, listItem]);
		}
	};

	const toggleCollapse = () => {
		// Toggle folder expansion logic here
		setToggle(!toggle);
	}

	return (
		<div id={data.id}>
			{currentData && currentData.length > 0 ? currentData.map((listItem) => {
				const { subfolders } = listItem;
				const uid = (Math.random() * 10).toFixed(0);
				const props = {
					uid: listItem.id + uid,
					toggle: toggle,
					listItem: listItem,
					handleRemove: handleRemove,
					toggleCollapse: toggleCollapse
				}
				return <ul key={listItem.id} className='xm-folder--list'>
					<FolderListItem {...props} />
					{listItem.subfolders && <FolderList {...{ data: subfolders.length > 0 ? subfolders : [], id: listItem.id + uid }} />}
				</ul>
			}) : <ul className='xm-folder--list'><li className='xm-folder--single'><span className='xm-folder--title xm-folder--title-nodata'>- No Data</span></li></ul>}
			<button className='xm-folder--new' onClick={event => onSubmit(event)}>+ NEW</button>
		</div>
	)
}

export default FolderList