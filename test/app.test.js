const request = require("supertest");
const app = require("./../src/app");

describe("SpaceX Monitoring App", () => {
  it("Responds with 200 OK on GET /average-listing", async () => {
    const response = await request(app).get("/average-listing");
    expect(response.status).toBe(200);
  });

  it("Responds with 200 OK and data on GET /average-listing", async () => {
    const response = await request(app).get("/average-listing");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
  it("Responds with 200 OK on GET /percentual-distribution", async () => {
    const response = await request(app).get("/percentual-distribution");
    expect(response.status).toBe(200);
  });

  it("Responds with 200 OK and data on GET /percentual-distribution", async () => {
    const response = await request(app).get("/percentual-distribution");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
