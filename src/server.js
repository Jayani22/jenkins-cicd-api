const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Jenkins CI/CD API running on http://localhost:${PORT}`);
});