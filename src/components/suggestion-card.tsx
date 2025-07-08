interface SuggestionCardProps {
  icon: React.ReactNode
  text: string
}

export function SuggestionCard({ icon, text }: SuggestionCardProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-1 bg-white rounded-lg border hover:border-[#FF1B8D] cursor-pointer transition-colors">
      <div className="text-[#FF1B8D]">{icon}</div>
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  )
}

