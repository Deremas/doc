import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { type Editor } from '@tiptap/react';
interface EditorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    setEditor: (editor) => set({editor})
}))