import { supabase } from '../lib/supabase';

// RLS enforces only owners can manage collaborators
export const addCollaborator = async ({ postId, userId, role }) => {
    return supabase
        .from('post_collaborators')
        .insert({ post_id: postId, user_id: userId, role })
        .select()
        .single();
};

export const updateCollaboratorRole = async ({ postId, userId, role }) => {
    return supabase
        .from('post_collaborators')
        .update({ role })
        .eq('post_id', postId)
        .eq('user_id', userId);
};

export const removeCollaborator = async ({ postId, userId }) => {
    return supabase
        .from('post_collaborators')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);
};