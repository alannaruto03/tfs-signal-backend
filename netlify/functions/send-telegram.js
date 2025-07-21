// netlify/functions/send-telegram.js

exports.handler = async function(event) {
  // IMPORTANT: Make sure to replace these with your actual token and ID
  const botToken = '7720666332:AAFU5DMiCpTyvYBUb7dF80otB5_FQ6z514A';
  const chatId = '831719613';

  // Netlify passes the request body as a string, so we need to parse it
  const body = JSON.parse(event.body);
  const { message } = body;

  if (!message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Message is required' }),
    };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const telegramResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
        const errorData = await telegramResponse.json();
        console.error('Telegram API Error:', errorData);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send message to Telegram.' }),
        };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error('Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send message.' }),
    };
  }
};