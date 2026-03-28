import React from 'react';

const FolderListItem = ({
	uid,
	toggle,
	listItem,
	handleRemove,
	handleAdd,
	toggleCollapse
}: any ) => {
	const { id, title } = listItem;
	return <li className='xm-folder--single' data-target={ '#' + uid } data-toggle={ toggle } onClick={ toggleCollapse }>
		<span className='xm-folder--title'>{ title }</span>
		<span className='xm-folder--actions'>
			<button className='xm-folder--add' onClick={ (e) => { e.stopPropagation(); handleAdd(); } }>+</button>
			<button className='xm-folder--close' onClick={ (e) => { e.stopPropagation(); handleRemove(id); } }>✕</button>
		</span>
	</li>;
};

export default FolderListItem;
