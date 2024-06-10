const request = require("supertest");
const App = require("./../src/server.js");

describe("Car Data Analysis", () => {
    beforeAll(async () => {
        App.start();
    });

    it("Responds with 200 OK on GET /api/average-listing", async () => {
        const response = await request(App.app).get("/api/average-listing");
        expect(response.status).toBe(200);
    });

    it("Responds with 200 OK and data on GET /api/average-listing", async () => {
        const response = await request(App.app).get("/api/average-listing");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("Responds with 200 OK on GET /api/percentual-distribution", async () => {
        const response = await request(App.app).get("/api/percentual-distribution");
        expect(response.status).toBe(200);
    });

    it("Responds with 200 OK and data on GET /api/percentual-distribution", async () => {
        const response = await request(App.app).get("/api/percentual-distribution");
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
