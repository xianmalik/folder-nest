import React from 'react'
import FolderList from './components/FolderList'
import { useFolderStore } from './store/useFolderStore'

import './App.css'

function App() {
	const { folders } = useFolderStore()

	const props_data = {
		data: folders,
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
