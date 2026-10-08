import express from "express";
import router from "./routes/index.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like curl, mobile, Postman, server-to-server)
        if (!origin)
            return callback(null, true);
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:3000",
            "https://wpcs-akbl-2026.iriscommunications.cloud",
            "https://wpcs-of-akbl-2026.iriscommunications.cloud",
            "https://kf.iriscommunications.cloud",
            "https://akbl.iriscommunications.cloud",
        ];
        // Allow if explicitly listed OR if it's any subdomain under iriscommunications.cloud
        if (allowedOrigins.includes(origin) ||
            origin.endsWith(".iriscommunications.cloud")) {
            return callback(null, true);
        }
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Pragma",
        "Expires",
        "X-Requested-With",
    ],
    credentials: true,
}));
// Middleware to parse JSON
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map