import { supabase } from '../lib/supabase';

export const getProfile = async (userId) => {
    return supabase.from('profiles').select('*').eq('id', userId).single();
};

// RLS blocks role changes — user can update everything except role
export const updateProfile = async (userId, updates) => {
    return supabase.from('profiles').update(updates).eq('id', userId).select().single();
};