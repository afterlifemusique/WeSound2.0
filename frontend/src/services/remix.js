import { supabase } from '../lib/supabase';

// Fetch entire remix graph — all edges are publicly viewable
export const getRemixEdges = async () => {
    return supabase
        .from('remix_edges')
        .select('*, parent:posts!parent_post_id(*), child:posts!child_post_id(*)');
};

export const getRemixEdgesForPost = async (postId) => {
    return supabase
        .from('remix_edges')
        .select('*')
        .or(`parent_post_id.eq.${postId},child_post_id.eq.${postId}`);
};

// RLS checks that auth.uid() owns the child post
export const createRemixEdge = async ({ parentPostId, childPostId }) => {
    return supabase
        .from('remix_edges')
        .insert({ parent_post_id: parentPostId, child_post_id: childPostId })
        .select()
        .single();
};