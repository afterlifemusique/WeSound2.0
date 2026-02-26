import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile } from '../services/profiles';

export const useProfile = (userId) => {
    return useQuery({
        queryKey: ['profiles', userId],
        queryFn: async () => {
            const { data, error } = await getProfile(userId);
            if (error) throw error;
            return data;
        },
        enabled: !!userId,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ userId, updates }) => updateProfile(userId, updates),
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ['profiles', userId] });
        },
    });
};