import mockLocalStorage from "@/tests/mocks/localstorage";

describe("Home Page", () => {
  it("isUser should be true when session_id is in localStorage", () => {
    mockLocalStorage.setItem("session_id", "12345");
    const isUser = mockLocalStorage.getItem("session_id") ? true : false;
    expect(isUser).toBe(true);
  });

  it("isUser should be false when session_id is not in localStorage", () => {
    mockLocalStorage.clear();
    const isUser = mockLocalStorage.getItem("session_id") ? true : false;
    expect(isUser).toBe(false);
  });
});
