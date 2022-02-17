import faker from "@faker-js/faker";
import { request } from "undici";
import { createTestServer } from "../../utils/test-utils";

const { serverURL, prisma } = createTestServer();

const meterStructor = {
	id: expect.any(Number),
	number: expect.any(String),
	days: expect.any(Number),
};

describe("Post API", () => {
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
				expect(meters).toMatchObject(meterStructor);
			}
		});
	});

	// const { statusCode, body } = await request(`${serverURL}/api/posts`, {
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
