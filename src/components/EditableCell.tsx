import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";

interface EditableCellProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const EditableCell = ({
  value,
  onSave,
  className = "",
  placeholder = "Click to edit...",
}: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [editing]);

  const handleSave = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed !== value) {
      onSave(trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setDraft(value);
      setEditing(false);
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  if (editing) {
    return (
      <td className={className}>
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full min-w-[120px] p-1.5 text-sm bg-background border border-primary/40 rounded resize-none focus:outline-none focus:ring-1 focus:ring-primary/50"
          rows={1}
        />
      </td>
    );
  }

  return (
    <td
      className={`${className} cursor-pointer group relative hover:bg-accent/30 transition-colors`}
      onClick={() => setEditing(true)}
    >
      {value ? (
        <span className="text-sm">{value}</span>
      ) : (
        <span className="text-muted-foreground/50 italic text-xs">{placeholder}</span>
      )}
      <Pencil className="w-3 h-3 text-muted-foreground/40 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
    </td>
  );
};
