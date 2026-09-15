/**
 * Temporary diagnostic component to verify environment variables
 * Remove this after confirming env vars are working on Render
 */

export function EnvCheck() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const hasSupabaseKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const isConfigured = supabaseUrl && hasSupabaseKey && supabaseUrl !== 'https://placeholder.supabase.co';
  
  // Only show in development or if there's an issue
  if (import.meta.env.PROD && isConfigured) {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      padding: '15px 20px',
      background: isConfigured ? '#4ade80' : '#fbbf24',
      border: '2px solid ' + (isConfigured ? '#22c55e' : '#f59e0b'),
      borderRadius: '8px',
      zIndex: 9999,
      fontSize: '14px',
      fontFamily: 'monospace',
      maxWidth: '400px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
        🔍 Environment Check
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div>
          <strong>Supabase URL:</strong> {supabaseUrl ? '✅ Set' : '❌ Missing'}
        </div>
        <div>
          <strong>Supabase Key:</strong> {hasSupabaseKey ? '✅ Set' : '❌ Missing'}
        </div>
        <div>
          <strong>Status:</strong> {isConfigured ? '✅ Configured' : '❌ Not Configured'}
        </div>
        {supabaseUrl && (
          <div style={{ fontSize: '11px', marginTop: '5px', opacity: 0.8 }}>
            URL: {supabaseUrl.substring(0, 40)}...
          </div>
        )}
      </div>
      <div style={{ 
        marginTop: '10px', 
        padding: '8px', 
        background: 'rgba(0,0,0,0.1)', 
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        {isConfigured ? (
          '✅ Environment configured correctly!'
        ) : (
          '⚠️ Add environment variables in Render dashboard and redeploy'
        )}
      </div>
    </div>
  );
}
