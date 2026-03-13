import { useState, useRef, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  display_name: string;
  email: string;
}

interface MentionableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  className?: string;
  rows?: number;
  onMention?: (profile: Profile) => void;
}

export const MentionableTextarea = ({
  value,
  onChange,
  onBlur,
  onKeyDown,
  className = "",
  rows = 1,
  onMention,
}: MentionableTextareaProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filtered, setFiltered] = useState<Profile[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [mentionStart, setMentionStart] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await supabase.from("profiles").select("id, display_name, email");
      if (data) setProfiles(data);
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(profiles);
    } else {
      const q = query.toLowerCase();
      setFiltered(
        profiles.filter(
          (p) =>
            p.display_name.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q)
        )
      );
    }
    setSelectedIdx(0);
  }, [query, profiles]);

  const insertMention = useCallback(
    (profile: Profile) => {
      const before = value.slice(0, mentionStart);
      const after = value.slice(textareaRef.current?.selectionStart || mentionStart);
      const mentionText = `@${profile.display_name}`;
      const newValue = before + mentionText + " " + after;
      onChange(newValue);
      setShowDropdown(false);
      setQuery("");
      setMentionStart(-1);
      onMention?.(profile);

      setTimeout(() => {
        if (textareaRef.current) {
          const pos = before.length + mentionText.length + 1;
          textareaRef.current.selectionStart = pos;
          textareaRef.current.selectionEnd = pos;
          textareaRef.current.focus();
        }
      }, 0);
    },
    [value, mentionStart, onChange, onMention]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart;
    onChange(newValue);

    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    // Check for @ trigger
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const lastAtIdx = textBeforeCursor.lastIndexOf("@");

    if (lastAtIdx >= 0) {
      const charBefore = lastAtIdx > 0 ? textBeforeCursor[lastAtIdx - 1] : " ";
      if (charBefore === " " || charBefore === "\n" || lastAtIdx === 0) {
        const searchText = textBeforeCursor.slice(lastAtIdx + 1);
        if (!searchText.includes(" ") || searchText.length < 20) {
          setMentionStart(lastAtIdx);
          setQuery(searchText);
          setShowDropdown(true);
          return;
        }
      }
    }
    setShowDropdown(false);
  };

  const handleKeyDownInternal = (e: React.KeyboardEvent) => {
    if (showDropdown && filtered.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev + 1) % filtered.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        insertMention(filtered[selectedIdx]);
        return;
      }
      if (e.key === "Escape") {
        setShowDropdown(false);
        return;
      }
    }
    onKeyDown(e);
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 200);
          onBlur();
        }}
        onKeyDown={handleKeyDownInternal}
        className={className}
        rows={rows}
      />
      {showDropdown && filtered.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-lg overflow-hidden"
        >
          {filtered.map((profile, idx) => (
            <button
              key={profile.id}
              type="button"
              className={`w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors ${
                idx === selectedIdx ? "bg-accent" : ""
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                insertMention(profile);
              }}
            >
              <span className="font-medium text-foreground">{profile.display_name}</span>
              <span className="text-muted-foreground text-xs ml-2">{profile.email}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/** Renders text with @mentions highlighted */
export const MentionText = ({ text }: { text: string }) => {
  const parts = text.split(/(@\w[\w\s]*?\w(?=\s|$|@)|@\w+)/g);

  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith("@") ? (
          <span
            key={i}
            className="bg-primary/10 text-primary font-medium rounded px-0.5"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};
