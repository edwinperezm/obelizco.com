import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Placeholder image route for development
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const { id } = req.query;
    const w = parseInt(width) || 400;
    const h = parseInt(height) || 300;
    
    // Create themed placeholder images based on dimensions
    let content = `${w} × ${h}`;
    let bgColor = "#f8f9fa";
    let textColor = "#6c757d";
    
    // Customize for different image sizes and IDs
    if (w === 414 && h === 536) {
      content = "Journal Cover";
      bgColor = "#fff7ed";
      textColor = "#ea580c";
    } else if (w === 598 && h === 218) {
      content = "Product Footer";
      bgColor = "#fef2f2";
      textColor = "#dc2626";
    } else if (w === 500 && h === 300) {
      // Different feature images based on ID
      const featureTypes = {
        "1": { content: "Reflexiones Diarias", bgColor: "#f0f9ff", textColor: "#0369a1" },
        "2": { content: "Actividades Prácticas", bgColor: "#f0fdf4", textColor: "#16a34a" },
        "3": { content: "Rutinas Espirituales", bgColor: "#fefce8", textColor: "#ca8a04" },
        "4": { content: "Formato PDF", bgColor: "#fdf2f8", textColor: "#be185d" }
      };
      const featureType = featureTypes[id as keyof typeof featureTypes] || { content: "Feature Image", bgColor: "#f0fdf4", textColor: "#16a34a" };
      content = featureType.content;
      bgColor = featureType.bgColor;
      textColor = featureType.textColor;
    } else if (w === 1200 || w === 1080) {
      content = "Testimonials";
      bgColor = "#f3f4f6";
      textColor = "#374151";
    }
    
    // Create a themed SVG placeholder
    const svg = `
      <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <rect width="100%" height="100%" fill="url(#grid)"/>
        <circle cx="${w/2}" cy="${h/2}" r="30" fill="${textColor}" opacity="0.1"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="${textColor}">
          ${content}
        </text>
        <text x="50%" y="50%" text-anchor="middle" dy="1.8em" font-family="system-ui, sans-serif" font-size="12" fill="${textColor}" opacity="0.7">
          ${w} × ${h}
        </text>
      </svg>
    `;
    
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(svg);
  });

  const httpServer = createServer(app);

  return httpServer;
}
