import axiosClient from "./axiosClient";

export const commentApi = {
  getCommentsByArticle: async (articleId: number) => {
    const { data } = await axiosClient.get(`/api/comments/article/${articleId}`);
    return data;
  },

  getCommentsByUniform: async (uniformId: number) => {
    const { data } = await axiosClient.get(`/api/comments/uniform/${uniformId}`);
    return data;
  },

  createComment: async (uniformId: number, content: string) => {
    const { data } = await axiosClient.post("/api/comments", {
      uniformId,
      content,
    });
    return data;
  },

  createArticleComment: async (articleId: number, content: string) => {
    const { data } = await axiosClient.post("/api/comments", { articleId, content });
    return data;
  },

  updateComment: async (commentId: number, content: string) => {
    const { data } = await axiosClient.put(`/api/comments/${commentId}`, {
      content,
    });
    return data;
  },

  deleteComment: async (commentId: number) => {
    await axiosClient.delete(`/api/comments/${commentId}`);
  },
};
