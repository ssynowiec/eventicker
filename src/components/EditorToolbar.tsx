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
import { HeadingEditorFormat } from '@/components/HeadingEditorFormat';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

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
			<ToggleGroup
				className="flex justify-start gap-1"
				type="multiple"
				size="sm"
			>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBold().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('bold')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="bold"
				>
					<Bold className="h-4 w-4" />
					<span className="sr-only">Bold</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleItalic().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('italic')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="italic"
				>
					<Italic className="h-4 w-4" />
					<span className="sr-only">Italic</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleUnderline().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('underline')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="underline"
				>
					<Underline className="h-4 w-4" />
					<span className="sr-only">Underline</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleStrike().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('strike')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="strike"
				>
					<Strikethrough className="h-4 w-4" />
					<span className="sr-only">Strike</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBulletList().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('bulletList')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="bullet-list"
				>
					<List className="h-4 w-4" />
					<span className="sr-only">Bullet List</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleOrderedList().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('orderedList')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="ordered-list"
				>
					<ListOrdered className="h-4 w-4" />
					<span className="sr-only">Ordered List</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBlockquote().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('blockquote')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="blockquote"
				>
					<Quote className="h-4 w-4" />
					<span className="sr-only">Blockquote</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().setCode().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('code')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="code"
				>
					<Code className="h-4 w-4" />
					<span className="sr-only">Code</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().undo().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('undo')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="undo"
				>
					<Undo className="h-4 w-4" />
					<span className="sr-only">Undo</span>
				</ToggleGroupItem>
				<ToggleGroupItem
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().redo().run();
					}}
					className={cn(
						'border border-secondary hover:bg-primary-foreground',
						editor.isActive('redo')
							? 'border-accent-primary border bg-primary-foreground'
							: '',
					)}
					value="redo"
				>
					<Redo className="h-4 w-4" />
					<span className="sr-only">Redo</span>
				</ToggleGroupItem>
				<HeadingEditorFormat editor={editor} />
			</ToggleGroup>
		</div>
	);
};
