
const request = require('supertest');
const app = require("./index.js");
// console.log(app);

// Tested
describe("post request /student/signup", () => {
    // test("status code must be 201 and type must be json list", async () => {
    //     const response = await request(app).post("/student/signup").send({
    //         firstName: "test_stud",
    //         lastName: "test_stud",
    //         email: "test_stud@gmail.com",
    //         password: "Test@123"
    //     })
    //     console.log("yo",response);
    //     expect(response.statusCode).toBe(201);
    //     expect(response.type).toBe("application/json");
    // })
    test("status code must be 400 and type must be html text", async () => {
        const response = await request(app).post("/student/signup").send({
            firstName: "test_stud",
            lastName: "test_stud",
            email: "test_stud@gmail.com",
            password: "testpassword"
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe("application/json");
    })
})

// Tested
describe("post request /student/signin", () => {
    test("Status Code must be 201 and type must be json list", async () => {
        const response = await request(app).post("/student/signin").send({
            email: "test_stud@gmail.com",
            password: "Test@123"
        })
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
    })
    test("Status Code must be 401 and type must be json list", async () => {
        const response = await request(app).post("/student/signin").send({
            email: "test_stud@gmail.com",
            password: "testpassword"
        })
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
    })
})

// Tested
describe("post request /admin/signup", () => {
    // test("status code must be 201 and type must be json list", async () => {
    //     const response = await request(app).post("/admin/signup").send({
    //         firstName: "test_admin",
    //         lastName: "test_admin",
    //         email: "test_admin@gmail.com",
    //         password: "Test@123"
    //     })
    //     console.log("yo",response);
    //     expect(response.statusCode).toBe(201);
    //     expect(response.type).toBe("application/json");
    // })
    test("status code must be 400 and type must be json list", async () => {
        const response = await request(app).post("/admin/signup").send({
            firstName: "test_admin",
            lastName: "test_admin",
            email: "test_admin@gmail.com",
            password: "testpassword"
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toBe("application/json");
    })
})

// Tested
describe("post request /admin/signin", () => {
    test("Status Code must be 201 and type must be json list", async () => {
        const response = await request(app).post("/admin/signin").send({
            email: "test_admin@gmail.com",
            password: "Test@123"
        })
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
    })
    test("Status Code must be 401 and type must be json list", async () => {
        const response = await request(app).post("/admin/signin").send({
            email: "test_admin@gmail.com",
            password: "testpassword"
        })
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe("application/json");
    })
})