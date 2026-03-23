import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jxpttbtanmtbfgagbsvq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cHR0YnRhbm10YmZnYWdic3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMDY1OTMsImV4cCI6MjA4NTU4MjU5M30.ZcdI32CRxAXArgSVV4xWmi_j1H5r7PALb0HjqD8MWqI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
});
