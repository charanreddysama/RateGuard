# RateGuard SDK

The official Node.js SDK for RateGuard, the cloud-based API Rate Limiting Platform.

## Installation

```bash
npm install rateguard-sdk
```

## Usage

### Express Middleware

The easiest way to protect your Express applications is using the provided middleware.

```javascript
import express from 'express';
import { rateGuard } from 'rateguard-sdk';

const app = express();

app.use(rateGuard({
  apiKey: 'YOUR_API_KEY', // Get this from your RateGuard dashboard
  // Optional: Provide a custom identifier. Defaults to req.ip
  identifier: (req) => req.user?.id || req.ip
}));

app.get('/api/protected', (req, res) => {
  res.json({ message: 'Success!' });
});

app.listen(3000);
```

### Universal API

If you aren't using Express or need more control, you can use the universal client.

```javascript
import { checkRateLimit } from 'rateguard-sdk';

async function handleRequest(req, res) {
  try {
    const result = await checkRateLimit({
      apiKey: 'YOUR_API_KEY',
      route: req.path,
      identifier: req.ip
    });

    if (!result.allowed) {
      return res.status(429).json({ 
        error: 'Too many requests',
        limit: result.limit
      });
    }

    // Process request
  } catch (error) {
    // Handle error
  }
}
```

## Features

- **Zero-Dependency Core**: Lightweight and fast.
- **Multiple Algorithms**: Fixed Window, Sliding Window, Token Bucket, Leaky Bucket.
- **Custom Identifiers**: Rate limit by IP, User ID, API Key, etc.
- **Express Integration**: Plug-and-play middleware.

## License

MIT
