import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRemixEdges, getRemixEdgesForPost, createRemixEdge } from '../services/remix';

export const useRemixGraph = () => {
    return useQuery({
        queryKey: ['remix-edges'],
        queryFn: async () => {
            const { data, error } = await getRemixEdges();
            if (error) throw error;
            return data;
        },
    });
};

export const usePostRemixes = (postId) => {
    return useQuery({
        queryKey: ['remix-edges', postId],
        queryFn: async () => {
            const { data, error } = await getRemixEdgesForPost(postId);
            if (error) throw error;
            return data;
        },
        enabled: !!postId,
    });
};

export const useCreateRemixEdge = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRemixEdge,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['remix-edges'] }),
    });
};