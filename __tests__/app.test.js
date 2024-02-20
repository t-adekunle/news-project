const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
const endpointsDoc = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("GET/api/topics", () => {
  test("return an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.topics)).toBe(true);
      });
  });
  test("should return 404 when is made on a route that does not exist", () => {
    return request(app)
      .get("/api/not-a-route")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
  test("should return an array of objects each with a slug property and description property", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const topics = response.body.topics;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(topic.hasOwnProperty("slug")).toBe(true);
          expect(topic.hasOwnProperty("description")).toBe(true);
        });
      });
  });
});

describe("GET /api", () => {
  test("returns an object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints.constructor === Object).toBe(true);
      });
  });

  test("returns an object of objects that contains properties of description queries and exampleResponse ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endpoints = response.body.endpoints;
        for (let endpoint in endpoints) {
          expect(endpoints[endpoint].hasOwnProperty("description")).toBe(true);
          expect(endpoints[endpoint].hasOwnProperty("queries")).toBe(true);
          expect(endpoints[endpoint].hasOwnProperty("exampleResponse")).toBe(
            true
          );
        }
      });
  });

  test("returns an object that matches the contents of the JSON file", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints).toEqual(endpointsDoc);
      });
  });
  test("should return 404 when is made on a route that does not exist", () => {
    return request(app)
      .get("/not-a-route")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
});

describe('GET /api/articles/:article_id', () => {
    test('returns an object', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
            const article = response.body.article
          expect(article.constructor).toBe(Object)
        });
    })
    test('returns an object with correct properties ', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
            const article = response.body.article
            expect(article.hasOwnProperty('author')).toBe(true)
            expect(article.hasOwnProperty('title')).toBe(true)
            expect(article.hasOwnProperty('article_id')).toBe(true)
            expect(article.hasOwnProperty('body')).toBe(true)
            expect(article.hasOwnProperty('topic')).toBe(true)
            expect(article.hasOwnProperty('created_at')).toBe(true)
            expect(article.hasOwnProperty('votes')).toBe(true)
            expect(article.hasOwnProperty('article_img_url')).toBe(true)
        })
    });
    test('returns 404 when given an id number that does not exist', () => {
        return request(app)
        .get("/api/articles/500")
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe("not found")
        })
    });

    test('returns 400 when given invalid id', () => {
        return request(app)
        .get("/api/articles/dog")
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('bad request')
        })
    });
});