import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { boardService } from "@/services/board/board.service"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, User, UserPlus } from "lucide-react"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  board: any;
}

export const ShareBoardModal = ({ isOpen, onClose, onSuccess, board }: Props) => {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("VIEWER")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    try {
      await boardService.shareBoard(board.id, { email, role })
      toast.success("Board shared successfully")
      if (onSuccess) onSuccess()
      setEmail("")
      setRole("VIEWER")
    } catch (err: any) {
      toast.error(err.message || "Failed to share board")
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (memberEmail: string, newRole: string) => {
    try {
      await boardService.shareBoard(board.id, { email: memberEmail, role: newRole })
      toast.success("Role updated successfully")
      if (onSuccess) onSuccess()
    } catch (err: any) {
      toast.error(err.message || "Failed to update role")
    }
  }

  const handleRemoveMember = async (memberId: string) => {
    try {
      await boardService.removeBoardMember(board.id, memberId)
      toast.success("Member removed successfully")
      if (onSuccess) onSuccess()
    } catch (err: any) {
      toast.error(err.message || "Failed to remove member")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-b border-border pb-6">
          <div className="space-y-2">
            <Label htmlFor="email">Invite by Email</Label>
            <div className="flex gap-2">
              <Input 
                id="email" 
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="flex-1"
              />
              <Select disabled={loading} value={role} onValueChange={(val) => val && setRole(val)}>
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VIEWER" className="cursor-pointer">Viewer</SelectItem>
                  <SelectItem value="EDITOR" className="cursor-pointer">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={loading || !email.trim()} className="w-full cursor-pointer flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" /> {loading ? "Inviting..." : "Invite"}
          </Button>
        </form>

        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" /> Members
          </h4>
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {board?.accesses?.length === 0 ? (
              <p className="text-sm text-muted-foreground italic text-center py-4">No members yet</p>
            ) : (
              board?.accesses?.map((access: any) => (
                <div key={access.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/30 border border-border">
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate">{access.user.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{access.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Select value={access.role} onValueChange={(val) => handleRoleChange(access.user.email, val)}>
                      <SelectTrigger className="w-[90px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIEWER" className="text-xs cursor-pointer">Viewer</SelectItem>
                        <SelectItem value="EDITOR" className="text-xs cursor-pointer">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-8 w-8 cursor-pointer" 
                      onClick={() => handleRemoveMember(access.user.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer w-full">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
