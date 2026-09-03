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
  column: { id: string; title: string };
}

export const EditColumnModal = ({ isOpen, onClose, onSuccess, column }: Props) => {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && column) {
      setTitle(column.title)
    }
  }, [isOpen, column])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await boardService.updateColumn(column.id, { title })
      toast.success("Column updated")
      onSuccess()
      onClose()
    } catch (err) {
      toast.error("Failed to update column")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit column</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-column-title">Column Title</Label>
            <Input 
              id="edit-column-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading || !title.trim() || title === column?.title}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
