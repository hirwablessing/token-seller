import { request } from "undici";
import { createTestServer } from "../../utils/test-utils";


const { serverURL, prisma } = createTestServer();

const meterStructure = {
    id: expect.any(Number),
    number: expect.any(String),
    days: expect.any(Number),
};

beforeAll(async () => {
    await prisma.meter.create({
        data: {
            number: "103434",
            days: 10
        },
    });

    console.log("✨ inserted Posts into database");
});

describe("Meter API", () => {
    describe("GET /api/meters", () => {
        it("Should return meters", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/meters`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(200);

            for (const meters of respData) {
                expect(meters).toMatchObject(meterStructure);
            }
        });
    });

    describe("GET /api/meters/by-number/:number", () => {
        it("should return a meter number on success ", async () => {
            const { statusCode, body, headers } = await request(
                `${serverURL}/api/meters/by-number/103434`
            );

            const respData = await body.json();

            expect(headers["content-type"]).toMatch(
                /application\/json/
            );

            expect(statusCode).toBe(200);
            expect(respData).toMatchObject(meterStructure)
        })
    })
});
