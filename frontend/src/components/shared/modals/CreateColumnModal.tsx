import { useState } from "react"
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
  boardId: string;
  position: number;
}

export const CreateColumnModal = ({ isOpen, onClose, onSuccess, boardId, position }: Props) => {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await boardService.createColumn(boardId, { title, position })
      toast.success("Column created")
      onSuccess()
      onClose()
    } catch (err) {
      toast.error("Failed to create column")
    } finally {
      setLoading(false)
      setTitle("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new column</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Column Title</Label>
            <Input 
              id="title"
              placeholder="e.g. In Progress"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading || !title.trim()}>
              {loading ? "Adding..." : "Add Column"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
