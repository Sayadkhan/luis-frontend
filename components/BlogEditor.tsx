"use client";

/**
 * BLOG EDITOR VERSION 2.0
 * Fixed Tiptap v3 named imports for Turbopack compatibility.
 */

import React, { useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import toast from "react-hot-toast";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  Code,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function BlogEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  minHeight = "300px",
}: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { uploadToCloudinary } = useCloudinaryUpload();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    immediatelyRender: false, // Recommended for Next.js SSR
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync content when value changes from outside (e.g., when editing)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const handleImageUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || !editor) return;
      const tid = toast.loading("Uploading image...");
      try {
        const uploaded = await uploadToCloudinary(files[0]);
        editor.chain().focus().setImage({ src: uploaded.url, alt: "uploaded image" }).run();
        toast.success("Image inserted!", { id: tid });
      } catch {
        toast.error("Image upload failed", { id: tid });
      }
    },
    [editor, uploadToCloudinary]
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const ToolbarBtn = ({
    onClick,
    active,
    title,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className={`p-2 rounded-lg transition-all ${
        active
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
      }`}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {/* History */}
        <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={16} />
        </ToolbarBtn>
        <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Headings */}
        <ToolbarBtn
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Inline formatting */}
        <ToolbarBtn
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Alignment */}
        <ToolbarBtn
          title="Align Left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Align Center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Align Right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Justify"
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Lists */}
        <ToolbarBtn
          title="Bullet List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Ordered List"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={16} />
        </ToolbarBtn>
        <ToolbarBtn title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={16} />
        </ToolbarBtn>
        <Divider />

        {/* Link & Image */}
        <ToolbarBtn title="Insert Link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon size={16} />
        </ToolbarBtn>
        <ToolbarBtn
          title="Insert Image"
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon size={16} />
        </ToolbarBtn>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleImageUpload(e.target.files)}
        />
      </div>

      {/* Editor Area */}
      <EditorContent
        editor={editor}
        className="prose prose-sm dark:prose-invert max-w-none p-4 focus:outline-none"
        style={{ minHeight }}
      />
    </div>
  );
}
