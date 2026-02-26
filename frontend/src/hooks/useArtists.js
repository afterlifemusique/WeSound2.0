import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getArtists, getArtistById, createArtist, updateArtist } from '../services/artists';

export const useArtists = () => {
    return useQuery({
        queryKey: ['artists'],
        queryFn: async () => {
            const { data, error } = await getArtists();
            if (error) throw error;
            return data;
        },
    });
};

export const useArtist = (id) => {
    return useQuery({
        queryKey: ['artists', id],
        queryFn: async () => {
            const { data, error } = await getArtistById(id);
            if (error) throw error;
            return data;
        },
        enabled: !!id,
    });
};

export const useCreateArtist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createArtist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['artists'] }),
    });
};

export const useUpdateArtist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates }) => updateArtist(id, updates),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['artists', id] });
        },
    });
};