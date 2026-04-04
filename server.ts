import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes can be added here if needed
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // SPA fallback for dev mode - handle all non-asset requests
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      
      // Skip if it looks like an asset request (has a file extension)
      if (url.includes('.') && !url.endsWith('.html')) {
        return next();
      }

      try {
        // Read index.html from root
        const indexPath = path.resolve(__dirname, "index.html");
        if (!fs.existsSync(indexPath)) {
          return res.status(404).send("index.html not found");
        }
        
        let template = fs.readFileSync(indexPath, "utf-8");
        // Transform it with Vite
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
