// Vercel Serverless Function - No Express needed
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Webhook-Signature');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Root endpoint
  if (req.method === 'GET' && req.url === '/') {
    return res.status(200).json({
      success: true,
      message: 'SPAIK AI Opportunity Seeker Webhook API',
      endpoints: {
        webhook: 'POST /webhook/visualization-data',
        health: 'GET /health',
        status: 'GET /webhook/status'
      }
    });
  }

  // Health check
  if (req.method === 'GET' && req.url === '/health') {
    return res.status(200).json({ 
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  }

  // Webhook status
  if (req.method === 'GET' && req.url === '/webhook/status') {
    return res.status(200).json({ 
      status: 'active',
      webhook_url: '/webhook/visualization-data',
      ready: true
    });
  }

  // Main webhook endpoint
  if (req.method === 'POST' && req.url === '/webhook/visualization-data') {
    try {
      const data = req.body;
      
      // Basic validation
      if (!data || !data.recommendation) {
        return res.status(400).json({
          success: false,
          error: 'Invalid webhook data'
        });
      }

      // Generate visualization ID
      const visualizationId = `vis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Log for debugging
      console.log('Webhook received:', {
        id: visualizationId,
        type: data.recommendation.type,
        title: data.recommendation.title
      });

      // Return success response
      return res.status(200).json({
        success: true,
        id: visualizationId,
        viewUrl: `/visualization/${visualizationId}`,
        message: 'Visualization data received successfully'
      });
      
    } catch (error) {
      console.error('Webhook error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message
      });
    }
  }

  // 404 for unknown routes
  return res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Cannot ${req.method} ${req.url}`
  });
}
