import { serverFetch } from "@/lib/server-fetch";

export const boardService = {
  getBoards: async () => {
    const res = await serverFetch.get("/boards");
    if (!res.ok) throw new Error("Failed to fetch boards");
    return res.json();
  },
  
  createBoard: async (data: { name: string; description: string }) => {
    const res = await serverFetch.post("/boards", {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create board");
    return res.json();
  },

  getBoardById: async (id: string) => {
    const res = await serverFetch.get(`/boards/${id}`);
    if (!res.ok) throw new Error("Failed to fetch board details");
    return res.json();
  },

  createColumn: async (boardId: string, data: { title: string; position: number }) => {
    const res = await serverFetch.post(`/boards/${boardId}/columns`, {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create column");
    return res.json();
  },

  createTask: async (columnId: string, data: { title: string; description?: string; position: number }) => {
    const res = await serverFetch.post(`/columns/${columnId}/tasks`, {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  },

  updateBoard: async (id: string, data: { name?: string; description?: string }) => {
    const res = await serverFetch.patch(`/boards/${id}`, {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update board");
    return res.json();
  },

  deleteBoard: async (id: string) => {
    const res = await serverFetch.delete(`/boards/${id}`);
    if (!res.ok) throw new Error("Failed to delete board");
    return res.json();
  },

  updateColumn: async (id: string, data: { title?: string; position?: number }) => {
    const res = await serverFetch.patch(`/columns/${id}`, {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update column");
    return res.json();
  },

  deleteColumn: async (id: string) => {
    const res = await serverFetch.delete(`/columns/${id}`);
    if (!res.ok) throw new Error("Failed to delete column");
    return res.json();
  },

  updateTask: async (id: string, data: { title?: string; description?: string; position?: number; columnId?: string }) => {
    const res = await serverFetch.patch(`/tasks/${id}`, {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  deleteTask: async (id: string) => {
    const res = await serverFetch.delete(`/tasks/${id}`);
    if (!res.ok) throw new Error("Failed to delete task");
    return res.json();
  },

  moveTask: async (id: string, data: { columnId: string; position: number }) => {
    const res = await serverFetch.patch(`/tasks/${id}/move`, {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to move task");
    return res.json();
  }
};
