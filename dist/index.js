"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const login_router_1 = require("./src/routes/login.router");
const PORT = 3300;
const app = (0, express_1.default)();
app.set('views', './src/views');
app.set('view engine', 'ejs');
const DB_URL = "mongodb://localhost:27017/Product_Management";
mongoose_1.default.connect(DB_URL)
    .then(() => { console.log('DB Connected'); })
    .catch((err) => {
    console.log(err.message);
});
app.use('', login_router_1.loginRoutes);
app.listen(PORT, () => { console.log(`App is running on http://localhost:${PORT}`); });
//# sourceMappingURL=index.js.map