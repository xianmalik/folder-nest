import * as React from "react";

import FolderData from '../data/folderdata.json'

export const StateContext = React.createContext<ContextType | null>(null);

const StateProvdier: React.FC<React.ReactNode> = ({ children }) => {
	const [data, setData] = React.useState<Data[]>( FolderData );
	
	const addData = (data: Data[]) => {
		const newData: Data = {
			"id": "folder-dummy",
			"title": "Folder Dummy",
			"subfolders": []
		};
		setData([...data, newData]);
	};
	
	const updateData = (id: number) => {
		data.filter( (data: Data) => {
			// if (data.id === id) {
			// 	data.status = true;
			// 	setData( [...data] );
			// }
		} );
	};

	return <StateContext.Provider value={{ data, addData, updateData }}>{ children }</StateContext.Provider>
}

export default StateProvdier