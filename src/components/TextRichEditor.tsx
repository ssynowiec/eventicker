'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorToolbar } from '@/components/EditorToolbar';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

interface TextRichEditorProps {
	content: string;
	placeholder: string;
	onChange: (content: string) => void;
}

export const TextRichEditor = ({
	content,
	placeholder,
	onChange,
}: TextRichEditorProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Placeholder.configure({
				placeholder: placeholder,
			}),
		],
		editorProps: {
			attributes: {
				class:
					'flex flex-col min-h-[100px] w-full whitespace-pre-line rounded-md rounded-t-none border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			},
		},
		content: content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	return (
		<div className="w-full">
			<EditorToolbar editor={editor} content={content} />
			<EditorContent placeholder={placeholder} editor={editor} />
		</div>
	);
};
