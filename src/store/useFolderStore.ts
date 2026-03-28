import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import FolderData from '../data/folderdata.json'

interface FolderState {
  folders: Data[]
  setFolders: (folders: Data[]) => void
  addFolder: (parentId: string | null, folder: Data) => void
  removeFolder: (id: string) => void
  updateFolder: (id: string, updates: Partial<Data>) => void
}

export const useFolderStore = create<FolderState>()(persist((set) => ({
  folders: FolderData,
  
  setFolders: (folders) => set({ folders }),
  
  addFolder: (parentId, folder) => set((state) => {
    // If no parent ID, add to root level
    if (!parentId) {
      return { folders: [...state.folders, folder] }
    }
    
    // Helper function to recursively find and update the parent folder
    const addToParent = (folders: Data[]): Data[] => {
      return folders.map(f => {
        if (f.id === parentId) {
          return {
            ...f,
            subfolders: [...f.subfolders, folder]
          }
        }
        
        if (f.subfolders.length > 0) {
          return {
            ...f,
            subfolders: addToParent(f.subfolders)
          }
        }
        
        return f
      })
    }
    
    return { folders: addToParent(state.folders) }
  }),
  
  removeFolder: (id) => set((state) => {
    // Helper function to recursively filter out the folder with the given ID
    const removeFromFolders = (folders: Data[]): Data[] => {
      return folders
        .filter(f => f.id !== id)
        .map(f => ({
          ...f,
          subfolders: removeFromFolders(f.subfolders)
        }))
    }
    
    return { folders: removeFromFolders(state.folders) }
  }),
  
  updateFolder: (id, updates) => set((state) => {
    // Helper function to recursively find and update the folder
    const updateInFolders = (folders: Data[]): Data[] => {
      return folders.map(f => {
        if (f.id === id) {
          return { ...f, ...updates }
        }
        
        if (f.subfolders.length > 0) {
          return {
            ...f,
            subfolders: updateInFolders(f.subfolders)
          }
        }
        
        return f
      })
    }
    
    return { folders: updateInFolders(state.folders) }
  })
}), { name: 'folder-nest' }))