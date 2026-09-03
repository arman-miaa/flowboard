"use client"
import { ThemeToggle } from "@/components/shared/ThemeToggle"

export const GeneralTab = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">General Preferences</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Appearance</h3>
            <p className="text-sm text-muted-foreground mt-1">Switch between light and dark mode.</p>
          </div>
          <ThemeToggle />
        </div>
        
        {/* Add more settings here in the future if needed */}
      </div>
    </div>
  )
}
