import React, { useState, useEffect, useRef } from 'react';
import FolderListItem from '../FolderListItem'

const FolderList = ( data: any ) => {
	const [toggle, setToggle] = useState(false);
	const [currentData, setCurrentData] = useState<Data[]>([]);
  
	useEffect( () => {
		setCurrentData( data.data )
	}, [data]);

	const handleRemove = (listItemId: any) => {
		const newArray = [...currentData];
		const foundedIndex = currentData.findIndex(({ id }) => id === listItemId);
	
		newArray.splice(foundedIndex, 1);
	
		setCurrentData(newArray);
	};

	const onSubmit = ( event: any ) => {
		event.preventDefault();

		let fallback_text = 'Folder ' + ( currentData.length + 1 )

		let text = window.prompt('DODODODO', fallback_text);

		text = text !== null ? text.toString() : fallback_text

		const listItem = {
			id: text,
			title: text,
			subfolders: []
		}
	
		if ( currentData ) {
			setCurrentData( [ ...currentData, listItem ] );
		}
	};

	const toggleCollapse = () => {

	}

	return <div id={ data.id }>
		{ currentData && currentData.length > 0 ? currentData.map( (listItem, index) => {
			const { subfolders } = listItem;
			const uid = ( Math.random() * 10 ).toFixed(0);
			const props = {
				uid: listItem.id + uid,
				toggle: toggle,
				listItem: listItem,
				handleRemove: handleRemove,
				toggleCollapse: toggleCollapse
			}
			return <ul key={listItem.id} className='xm-folder--list'>
				<FolderListItem { ...props } />
				{ listItem.subfolders && <FolderList { ...{ data: subfolders.length > 0 ? subfolders : [], id: listItem.id + uid } } /> }
			</ul>
		} ) : <ul className='xm-folder--list'><li className='xm-folder--single'><span className='xm-folder--title xm-folder--title-nodata'>- No Data</span></li></ul> }
		<button className='xm-folder--new' onClick={event => onSubmit(event)}>+ NEW</button>
	</div>
}

export default FolderList