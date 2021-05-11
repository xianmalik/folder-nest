interface Data {
	id: string
	title: string
	subfolders: Data[]
}

type ContextType = {
	data: Data[]
	addData: (todo: Data[]) => void
	updateData: (id: number) => void
}