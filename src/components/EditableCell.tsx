import { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import { MentionableTextarea, MentionText } from "@/components/MentionableTextarea";
import { supabase } from "@/integrations/supabase/client";

interface EditableCellProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
}

export const EditableCell = ({
  value,
  onSave,
  className = "",
  placeholder = "Click to edit...",
  readOnly = false,
}: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleSave = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed !== value) {
      onSave(trimmed);
      // Check for new mentions and send notifications
      sendMentionNotifications(value, trimmed);
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

  if (editing && !readOnly) {
    return (
      <td className={className}>
        <MentionableTextarea
          value={draft}
          onChange={setDraft}
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
      className={`${className} ${readOnly ? "" : "cursor-pointer group relative hover:bg-accent/30"} transition-colors`}
      onClick={() => !readOnly && setEditing(true)}
    >
      {value ? (
        <MentionText text={value} />
      ) : (
        <span className="text-muted-foreground/50 italic text-xs">
          {readOnly ? "—" : placeholder}
        </span>
      )}
      {!readOnly && (
        <Pencil className="w-3 h-3 text-muted-foreground/40 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </td>
  );
};

/** Extract @mentions from text */
function extractMentions(text: string): string[] {
  const matches = text.match(/@[\w\s]+?(?=\s@|\s*$|@)/g) || [];
  return matches.map((m) => m.slice(1).trim());
}

/** Send email notifications for new mentions */
async function sendMentionNotifications(oldText: string, newText: string) {
  const oldMentions = new Set(extractMentions(oldText));
  const newMentions = extractMentions(newText).filter((m) => !oldMentions.has(m));

  if (newMentions.length === 0) return;

  try {
    const { data: currentUser } = await supabase.auth.getUser();
    const mentionerName = currentUser?.user?.user_metadata?.display_name || currentUser?.user?.email || "Someone";

    await supabase.functions.invoke("send-mention-notification", {
      body: {
        mentions: newMentions,
        mentioner: mentionerName,
        context: newText,
      },
    });
  } catch (err) {
    console.error("Failed to send mention notification:", err);
  }
}
