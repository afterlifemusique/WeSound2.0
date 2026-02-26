import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likePost, unlikePost, likeArtist, unlikeArtist } from '../services/likes';

export const usePostLike = (postId) => {
    const queryClient = useQueryClient();

    const like = useMutation({
        mutationFn: (userId) => likePost(postId, userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', postId] }),
    });

    const unlike = useMutation({
        mutationFn: (userId) => unlikePost(postId, userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts', postId] }),
    });

    return { like, unlike };
};

export const useArtistLike = (artistId) => {
    const queryClient = useQueryClient();

    const like = useMutation({
        mutationFn: (userId) => likeArtist(artistId, userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['artists', artistId] }),
    });

    const unlike = useMutation({
        mutationFn: (userId) => unlikeArtist(artistId, userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['artists', artistId] }),
    });

    return { like, unlike };
};