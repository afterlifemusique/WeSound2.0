import { supabase } from '../lib/supabase';

// RLS checks auth.uid() = user_id automatically
export const trackPlayback = async ({ postId, userId, durationMs }) => {
    return supabase.from('playback_events').insert({
        post_id: postId,
        user_id: userId,
        duration_ms: durationMs,
    });
};

// Only visible to the linked artist owner — RLS enforced
export const getGrowthSnapshots = async (artistId) => {
    return supabase
        .from('growth_snapshots')
        .select('*')
        .eq('artist_id', artistId)
        .order('snapshot_date', { ascending: true });
};