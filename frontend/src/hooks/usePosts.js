import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../services/posts';

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data, error } = await getPosts();
            if (error) throw error;
            return data;
        },
    });
};

export const usePost = (id) => {
    return useQuery({
        queryKey: ['posts', id],
        queryFn: async () => {
            const { data, error } = await getPostById(id);
            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPost,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => updatePost(id, updates),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['posts', id] });
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });
};