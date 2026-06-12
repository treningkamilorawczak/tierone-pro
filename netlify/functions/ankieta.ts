import { Handler } from '@netlify/functions';

// Ankieta rekrutacyjna -> MailerLite (grupa "Ankieta rekrutacyjna — TierOne")
const GROUP_ID = '190047280122824584';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const email = typeof data.email === 'string' ? data.email.trim() : '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Valid email is required' }) };
    }

    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    if (!MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY not set');
      return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
    }

    const text = (v: unknown, max = 250) => (typeof v === 'string' ? v.slice(0, max) : '');

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name: text(data.fullName, 100),
          imie_i_nazwisko: text(data.fullName, 100),
          phone: text(data.phone, 30),
          goal: text(data.goal, 100),
          challenge: text(data.challenge, 250),
          timeline: text(data.timeline, 100),
          ank_weekly_time: text(data.weeklyTime, 100),
          ank_goal_90: text(data.goal90days, 250),
          ank_situation: text(data.situation, 250),
        },
        groups: [GROUP_ID],
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
    console.error('MailerLite error:', result);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to submit' }) };
  } catch (error) {
    console.error('Ankieta function error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
