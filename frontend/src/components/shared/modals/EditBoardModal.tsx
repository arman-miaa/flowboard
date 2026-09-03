import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { boardService } from "@/services/board/board.service"
import { toast } from "sonner"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  board: { id: string; name: string; description?: string };
}

export const EditBoardModal = ({ isOpen, onClose, onSuccess, board }: Props) => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && board) {
      setName(board.name)
    }
  }, [isOpen, board])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await boardService.updateBoard(board.id, { name, description: board.description || '' })
      toast.success("Board updated successfully")
      onSuccess()
      onClose()
    } catch (err) {
      toast.error("Failed to update board")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-board-name">Board Name</Label>
            <Input 
              id="edit-board-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading || !name.trim() || name === board?.name}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
