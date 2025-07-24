import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    // GET /procedures-api - List all procedures
    if (req.method === 'GET' && !path) {
      const { data: procedures, error } = await supabase
        .from('procedures')
        .select(`
          id,
          tracking_code,
          type,
          status,
          company_name,
          company_nit,
          created_at,
          updated_at
        `);

      if (error) throw error;

      return new Response(JSON.stringify(procedures), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    // GET /procedures-api/:id - Get procedure by ID
    if (req.method === 'GET' && path) {
      const { data: procedure, error } = await supabase
        .from('procedures')
        .select(`
          id,
          tracking_code,
          type,
          status,
          company_name,
          company_nit,
          address,
          sector,
          legal_rep_name,
          legal_rep_dpi,
          registro_mercantil,
          email,
          phone,
          created_at,
          updated_at,
          is_paid,
          is_signed,
          documents (
            id,
            name,
            url,
            type,
            uploaded_at
          ),
          comments (
            id,
            user_id,
            user_name,
            text,
            type,
            created_at
          )
        `)
        .eq('id', path)
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(procedure), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    // GET /procedures-api/tracking/:code - Get procedure by tracking code
    if (req.method === 'GET' && path?.startsWith('tracking/')) {
      const trackingCode = path.split('/')[1];
      const { data: procedure, error } = await supabase
        .from('procedures')
        .select(`
          id,
          tracking_code,
          type,
          status,
          company_name,
          company_nit,
          created_at,
          updated_at,
          comments (
            id,
            user_name,
            text,
            type,
            created_at
          )
        `)
        .eq('tracking_code', trackingCode)
        .single();

      if (error) throw error;

      return new Response(JSON.stringify(procedure), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
});