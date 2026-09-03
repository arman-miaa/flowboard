"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { changePassword } from "@/services/auth/changePassword"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export const SecurityTab = () => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('flowboard_access_token') || ''
      await changePassword({ currentPassword, newPassword }, token)
      
      toast.success("Password changed successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      toast.error(err.message || "Failed to change password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Security & Password</h2>
      <form onSubmit={handleUpdate} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Current Password</label>
          <Input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            placeholder="Enter current password"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">New Password</label>
          <Input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="Enter new password (min 6 characters)"
            required
            minLength={6}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Confirm New Password</label>
          <Input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm new password"
            required
            minLength={6}
          />
        </div>
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Change Password
          </button>
        </div>
      </form>
    </div>
  )
}
