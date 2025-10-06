import React from 'react';

const FolderListItem = ({
	uid,
	toggle,
	listItem,
	handleRemove,
	toggleCollapse
}: any ) => {
	const { id, title, subfolders } = listItem;
	return <li className='xm-folder--single' data-target={ '#' + uid } data-toggle={ toggle } onClick={ toggleCollapse }>
		<span className='xm-folder--title'>{ title }</span>
		<span className='xm-folder--close' onClick={ () => handleRemove(id) }>x</span>
	</li>;
};

export default FolderListItem;
