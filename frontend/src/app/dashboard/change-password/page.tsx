"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { changePassword } from "@/services/auth/changePassword"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function ChangePasswordPage() {
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
      await changePassword({ currentPassword, newPassword })
      
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
    <div className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Change Password</h1>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Current Password</label>
              <PasswordInput 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                placeholder="Enter current password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">New Password</label>
              <PasswordInput 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                placeholder="Enter new password (min 6 characters)"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Confirm New Password</label>
              <PasswordInput 
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
      </div>
    </div>
  )
}
