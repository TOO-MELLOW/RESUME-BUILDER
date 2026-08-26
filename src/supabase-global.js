// Provides Supabase as a window global for the legacy paywall/download gate.
// Keeping this inside the Vite bundle removes the brittle CDN dependency from
// the application shell while preserving the existing legacy API surface.
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mlhuidtekecxgeizgmyr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vNUa__bfq0gHRIObYNe0rQ_MgI8s09r';

window.supabase = { createClient };
window.MELLOW_SUPABASE_URL = SUPABASE_URL;
window.MELLOW_SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
