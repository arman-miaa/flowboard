import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { boardService } from "@/services/board/board.service"
import { toast } from "sonner"
import { AlignLeft } from "lucide-react"

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task: { id: string; title: string; description?: string; columnId: string; position: number };
  initialMode?: "view" | "edit";
}

export const EditTaskModal = ({ isOpen, onClose, onSuccess, task, initialMode = "view" }: Props) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [loading, setLoading] = useState(false)

  const [isEditingMode, setIsEditingMode] = useState(initialMode === "edit")

  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title)
      setDescription(task.description || "")
      setIsEditingMode(initialMode === "edit")
      setIsEditingDescription(initialMode === "edit" ? !task.description : false)
    }
  }, [isOpen, task, initialMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await boardService.updateTask(task.id, { 
        title, 
        description, 
        columnId: task.columnId,
        position: task.position
      })
      toast.success("Task updated")
      onSuccess()
      onClose()
    } catch (err) {
      toast.error("Failed to update task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Task Details
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-muted-foreground font-semibold">Title</Label>
            {isEditingMode ? (
              <Input 
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-medium h-12"
                autoFocus={!task.description}
              />
            ) : (
              <div className="text-lg font-medium h-12 flex items-center px-3 border border-transparent">
                {title}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-muted-foreground" />
              <Label htmlFor="edit-description" className="text-muted-foreground font-semibold">Description</Label>
            </div>
            
            {isEditingDescription ? (
              <div className="space-y-3">
                <Textarea 
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none min-h-[150px] p-4 text-base"
                  placeholder="Add a more detailed description..."
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <Button type="button" size="sm" onClick={() => setIsEditingDescription(false)} variant="secondary" className="cursor-pointer">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => isEditingMode && setIsEditingDescription(true)}
                className={`bg-muted/50 p-4 rounded-lg min-h-[100px] transition-colors ${isEditingMode ? 'hover:bg-muted cursor-pointer' : ''}`}
              >
                {description ? (
                  <p className="whitespace-pre-wrap text-foreground text-sm leading-relaxed">{description}</p>
                ) : (
                  <p className="text-muted-foreground text-sm italic">No description provided.</p>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="pt-4 border-t border-border">
            {isEditingMode ? (
              <>
                <Button type="button" variant="outline" onClick={onClose} disabled={loading} className="cursor-pointer">Cancel</Button>
                <Button type="submit" disabled={loading || !title.trim() || (title === task?.title && description === (task?.description || ""))} className="cursor-pointer">
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">Close</Button>
                <Button type="button" onClick={(e) => { e.preventDefault(); setIsEditingMode(true); setIsEditingDescription(true); }} className="cursor-pointer">
                  Edit Task
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
