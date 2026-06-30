const request = require("supertest");
const app = require("../src/app");

describe("Jenkins CI/CD API", () => {

    test("GET /", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.application).toBe("Jenkins CI/CD API");
    });

    test("GET /health", async () => {
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("Healthy");
    });

    test("GET /deployment", async () => {
        const response = await request(app).get("/deployment");

        expect(response.statusCode).toBe(200);
        expect(response.body.pipeline).toBe("Jenkins");
    });

});