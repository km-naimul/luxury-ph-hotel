# Fixing Server Startup Issues

If the server won't start, try these solutions in order:

## Solution 1: Check TypeScript Errors

Run:
```bash
cd server
npm run build
```

If there are errors, fix them first.

## Solution 2: Start with TypeScript Compilation Check Disabled

If TypeScript errors are blocking startup, you can temporarily bypass them by modifying `server/package.json`:

Change:
```json
"dev": "nodemon --exec ts-node src/server.ts"
```

To:
```json
"dev": "nodemon --exec ts-node --transpile-only src/server.ts"
```

## Solution 3: Check MongoDB Connection

Make sure your `.env` file in the `server` folder has:
```
MONGODB_URI=your_connection_string_here
```

## Solution 4: Check Port 5000

Make sure port 5000 is not in use:
```bash
netstat -ano | findstr :5000
```

If something is using it, kill that process or change PORT in `.env`.

## Solution 5: Reinstall Dependencies

```bash
cd server
rm -rf node_modules
npm install
```

## Solution 6: Check Node.js Version

Make sure you have Node.js installed:
```bash
node --version
```

Should be v14 or higher.
