// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY; // или ANON, если только публичный доступ
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
