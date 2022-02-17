import {
	isAmountValid,
	isMeterNumberValid,
	responseMessage,
} from "../../utils/app-utils";

describe("IsAmountValid method", () => {
	it("return false for invalid amount", () => {
		expect(isAmountValid(89)).toBe(false);
	});
});

describe("isMeterNumberValid method", () => {
	it("return false for invalid meter number", () => {
		expect(isMeterNumberValid("89")).toBe(false);
	});
});

describe("responseMessage method", () => {
	it("return the expected message", () => {
		expect(responseMessage("89")).toEqual({
			message: "89",
			body: null,
		});
	});
});
