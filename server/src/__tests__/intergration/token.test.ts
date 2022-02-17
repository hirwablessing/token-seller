import faker from "@faker-js/faker";
import { request } from "undici";
import { createTestServer } from "../../utils/test-utils";

const { serverURL, prisma } = createTestServer();

const tokenStructor = {
	id: expect.any(Number),
	meterId: expect.any(Number),
	token: expect.any(String),
	days: expect.any(Number),
	status: expect.any(String),
};

describe("Token API", () => {
	describe("GET /api/tokens", () => {
		it("Should return tokens", async () => {
			const { statusCode, body, headers } = await request(
				`${serverURL}/api/tokens`
			);

			const respData = await body.json();

			expect(headers["content-type"]).toMatch(
				/application\/json/
			);

			expect(statusCode).toBe(200);

			for (const tokens of respData.body) {
				expect(tokens).toMatchObject(tokenStructor);
			}
		});
	});

	// const { statusCode, body } = await request(`${serverURL}/api/tokens`, {
	//         method: "POST",
	//         headers: {
	//           "Content-Type": "application/json",
	//         },
	//         body: JSON.stringify({
	//           content: faker.lorem.paragraph(),
	//           title: faker.lorem.sentence(),
	//           authorId: 1,
	//         }),
	//       });

	//       const respData = await body.json();

	//       expect(statusCode).toBe(201);
	//       expect(typeof respData).toBe("object");
});
