import React from 'react'
import FolderList from './components/FolderList'

import FolderData from './data/folderdata.json'

import './App.css'

function App() {
	const [ data, setData ] = React.useState( FolderData )

	const props_data = {
		data: data,
		id: 'root-folder'
	}
	
	return (
		<div className='App'>
			<h2>Folder Structure</h2>
			<ul className='xm-folder--list'>
				<li className='xm-folder--single' data-target={ '#' + props_data.id } data-toggle={ true }>
					<span className='xm-folder--title'>root</span>
				</li>
				{ <FolderList { ...props_data } /> }
			</ul>
		</div>
	)
}

export default App
