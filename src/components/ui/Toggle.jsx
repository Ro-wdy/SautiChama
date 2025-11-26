import * as React from "react"
import { cn } from "@/lib/utils"

const Toggle = ({ enabled, onChange, label }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        enabled ? "bg-primary-600" : "bg-gray-200"
      )}
    >
      <span className="sr-only">{label}</span>
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          enabled ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  )
}

export { Toggle }
