import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { boardService } from "@/services/board/board.service"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  boardId: string;
}

export const ShareBoardModal = ({ isOpen, onClose, onSuccess, boardId }: Props) => {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("VIEWER")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    try {
      await boardService.shareBoard(boardId, { email, role })
      toast.success("Board shared successfully")
      if (onSuccess) onSuccess()
      onClose()
      setEmail("")
      setRole("VIEWER")
    } catch (err: any) {
      toast.error(err.message || "Failed to share board")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">User Email</Label>
            <Input 
              id="email" 
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select disabled={loading} value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIEWER" className="cursor-pointer">Viewer</SelectItem>
                <SelectItem value="EDITOR" className="cursor-pointer">Editor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !email.trim()} className="cursor-pointer">
              {loading ? "Sharing..." : "Share"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
