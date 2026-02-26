import { supabase } from '../lib/supabase';

export const likePost = async (postId, userId) => {
    return supabase.from('post_likes').insert({ post_id: postId, user_id: userId });
};

export const unlikePost = async (postId, userId) => {
    return supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);
};

export const likeArtist = async (artistId, userId) => {
    return supabase.from('artist_likes').insert({ artist_id: artistId, user_id: userId });
};

export const unlikeArtist = async (artistId, userId) => {
    return supabase
        .from('artist_likes')
        .delete()
        .eq('artist_id', artistId)
        .eq('user_id', userId);
};