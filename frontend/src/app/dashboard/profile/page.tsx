"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { updateProfile } from "@/services/auth/updateProfile"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('flowboard_user')
    if (userData && userData !== 'undefined') {
      const parsed = JSON.parse(userData)
      setName(parsed.name || "")
      setEmail(parsed.email || "")
      setPhone(parsed.phone || "")
      setAddress(parsed.address || "")
    }
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error("Name is required")
      return
    }

    try {
      setLoading(true)
      const token = localStorage.getItem('flowboard_access_token') || ''
      const res = await updateProfile({ name, phone, address }, token)
      
      localStorage.setItem('flowboard_user', JSON.stringify(res.user))
      if (res.accessToken) {
        localStorage.setItem('flowboard_access_token', res.accessToken)
      }
      toast.success("Profile updated successfully")
      // Quick reload to update avatar/header (could use a global store, but reload is easiest)
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Profile Settings</h1>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email (Read Only)</label>
              <Input type="email" value={email} disabled className="bg-muted/50 cursor-not-allowed" />
              <p className="text-xs text-muted-foreground mt-1.5">Your email address is used for login and cannot be changed.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name</label>
              <Input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Phone Number</label>
              <Input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Address</label>
              <Input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Enter your address"
              />
            </div>
            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
