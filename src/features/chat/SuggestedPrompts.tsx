interface SuggestedPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
}

export default function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="flex-shrink-0 px-3.5 py-1.5 rounded-full border border-border bg-background text-sm text-muted-foreground hover:border-primary hover:text-foreground transition-colors whitespace-nowrap"
        >
          {prompt}
        </button>
      ))}
    </div>
  )
}
