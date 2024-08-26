import type { Editor } from '@tiptap/react';
import {
	Bold,
	Code,
	Italic,
	List,
	ListOrdered,
	Quote,
	Redo,
	Strikethrough,
	Underline,
	Undo,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeadingEditorFormat } from '@/components/HeadingEditorFormat';

interface EditorToolbarProps {
	editor: Editor | null;
	content: string;
}

export const EditorToolbar = ({ editor, content }: EditorToolbarProps) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="rounded-t-md border-l border-r border-t border-input bg-secondary p-1">
			<div className="flex gap-1">
				<Button
					variant={editor.isActive('bold') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBold().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Bold className="h-4 w-4" />
					<span className="sr-only">Bold</span>
				</Button>
				<Button
					variant={editor.isActive('italic') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleItalic().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Italic className="h-4 w-4" />
					<span className="sr-only">Italic</span>
				</Button>
				<Button
					variant={editor.isActive('underline') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleUnderline().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Underline className="h-4 w-4" />
					<span className="sr-only">Underline</span>
				</Button>
				<Button
					variant={editor.isActive('strike') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleStrike().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Strikethrough className="h-4 w-4" />
					<span className="sr-only">Strike</span>
				</Button>
				<Button
					variant={editor.isActive('bulletList') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBulletList().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<List className="h-4 w-4" />
					<span className="sr-only">Bullet List</span>
				</Button>
				<Button
					variant={editor.isActive('orderedList') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleOrderedList().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<ListOrdered className="h-4 w-4" />
					<span className="sr-only">Ordered List</span>
				</Button>
				<Button
					variant={editor.isActive('blockquote') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBlockquote().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Quote className="h-4 w-4" />
					<span className="sr-only">Blockquote</span>
				</Button>
				<Button
					variant={editor.isActive('code') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().setCode().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Code className="h-4 w-4" />
					<span className="sr-only">Code</span>
				</Button>
				<Button
					variant={editor.isActive('undo') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().undo().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Undo className="h-4 w-4" />
					<span className="sr-only">Undo</span>
				</Button>
				<Button
					variant={editor.isActive('redo') ? 'outline' : 'ghost'}
					size="icon"
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().redo().run();
					}}
					className="h-8 w-8 hover:bg-primary-foreground"
				>
					<Redo className="h-4 w-4" />
					<span className="sr-only">Redo</span>
				</Button>
				<HeadingEditorFormat editor={editor} />
			</div>
		</div>
	);
};
