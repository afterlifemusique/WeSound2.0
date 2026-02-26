import { supabase } from '../lib/supabase';

export const getArtists = async () => {
    return supabase
        .from('artists')
        .select('*, profiles(username, avatar_url), artist_likes(count)')
        .order('created_at', { ascending: false });
};

export const getArtistById = async (id) => {
    return supabase
        .from('artists')
        .select('*, profiles(username, avatar_url), growth_snapshots(*)')
        .eq('id', id)
        .single();
};

export const createArtist = async (artist) => {
    return supabase.from('artists').insert(artist).select().single();
};

export const updateArtist = async (id, updates) => {
    return supabase.from('artists').update(updates).eq('id', id).select().single();
};