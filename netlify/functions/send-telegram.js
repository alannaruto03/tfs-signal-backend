// api/send-telegram.js
export default async function handler(req, res) {
  // Your secrets go here. In a real project, use environment variables.
  const botToken = '7720666332:AAFU5DMiCpTyvYBUb7dF80otB5_FQ6z514A';
  const chatId = '831719613';

  // Get the message from the request sent by the React app
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await fetch(url, {
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
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}