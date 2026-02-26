import { supabase } from '../lib/supabase';

// Fetch all public posts with their type-specific details
export const getPosts = async () => {
    return supabase
        .from('posts')
        .select(`
      *,
      profiles(id, username, avatar_url),
      track_details(*),
      beat_details(*),
      sample_details(*),
      sample_pack_details(*),
      preset_details(*),
      project_details(*),
      post_external_links(*),
      post_likes(count)
    `)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });
};

export const getPostById = async (id) => {
    return supabase
        .from('posts')
        .select(`
      *,
      profiles(id, username, avatar_url),
      track_details(*),
      beat_details(*),
      sample_details(*),
      sample_pack_details(*),
      preset_details(*),
      project_details(*),
      post_external_links(*),
      post_collaborators(*, profiles(username, avatar_url)),
      post_likes(count)
    `)
        .eq('id', id)
        .single();
};

export const createPost = async (post) => {
    return supabase.from('posts').insert(post).select().single();
};

export const updatePost = async (id, updates) => {
    return supabase.from('posts').update(updates).eq('id', id).select().single();
};

// Soft delete — matches your deleted_at IS NULL policy
export const deletePost = async (id) => {
    return supabase
        .from('posts')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
};