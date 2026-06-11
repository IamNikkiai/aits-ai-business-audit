exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, track, source } = JSON.parse(event.body);

  const webhookMap = {
    carla: process.env.GHL_WEBHOOK_CARLA,
    denise: process.env.GHL_WEBHOOK_DENISE,
    angela: process.env.GHL_WEBHOOK_ANGELA,
  };

  const webhookUrl = webhookMap[track];

  if (!webhookUrl) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid track' }) };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, track, source }),
    });

    if (!response.ok) {
      throw new Error(`GHL webhook returned ${response.status}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Webhook error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook failed' }),
    };
  }
};
