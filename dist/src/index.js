import express from "express";
import router from "./routes/index.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://kf.iriscommunications.cloud",
        "https://wpcs-of-akbl-2026.iriscommunications.cloud",
        "https://akbl.iriscommunications.cloud",
    ],
}));
// Middleware to parse JSON
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map