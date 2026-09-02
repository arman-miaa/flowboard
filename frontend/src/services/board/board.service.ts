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

  createTask: async (columnId: string, data: { title: string; position: number }) => {
    const res = await serverFetch.post(`/columns/${columnId}/tasks`, {
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  }
};
