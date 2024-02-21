const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
const endpointsDoc = require("../endpoints.json");
const sorted = require("jest-sorted");

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

describe("GET /api/articles/:article_id", () => {
  test("returns an object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.constructor).toBe(Object);
      });
  });
  test("returns an object with correct properties ", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.article_id).toBe(1)
        expect(article.hasOwnProperty("author")).toBe(true);
        expect(article.hasOwnProperty("title")).toBe(true);
        expect(article.hasOwnProperty("article_id")).toBe(true);
        expect(article.hasOwnProperty("body")).toBe(true);
        expect(article.hasOwnProperty("topic")).toBe(true);
        expect(article.hasOwnProperty("created_at")).toBe(true);
        expect(article.hasOwnProperty("votes")).toBe(true);
        expect(article.hasOwnProperty("article_img_url")).toBe(true);
      });
  });
  test("returns 404 when given an id number that does not exist", () => {
    return request(app)
      .get("/api/articles/500")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 when given invalid id", () => {
    return request(app)
      .get("/api/articles/dog")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("GET /api/articles", () => {
  test("returns an array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.articles)).toBe(true);
      });
  });
  test("returns an array of objects with the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(article.hasOwnProperty("author")).toBe(true);
          expect(article.hasOwnProperty("title")).toBe(true);
          expect(article.hasOwnProperty("article_id")).toBe(true);
          expect(article.hasOwnProperty("topic")).toBe(true);
          expect(article.hasOwnProperty("created_at")).toBe(true);
          expect(article.hasOwnProperty("votes")).toBe(true);
          expect(article.hasOwnProperty("article_img_url")).toBe(true);
          expect(article.hasOwnProperty("comment_count")).toBe(true);
        });
      });
  });
  test("return an array with articles sorted descending order by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
      });
  });
});

describe('GET /api/articles/:article_id/comments', () => {
    test('return an array', () => {
        return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.comments)).toBe(true)
      })
    });
    test('return an array of comment objects each with the correct properties and article_id', () => {
        return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then((response) => {
            const comments = response.body.comments
          expect(comments.length).toBe(2)
          comments.forEach((comment) => {
            expect(comment.article_id).toBe(9)
            expect(comment.hasOwnProperty('comment_id')).toBe(true)
            expect(comment.hasOwnProperty('votes')).toBe(true)
            expect(comment.hasOwnProperty('created_at')).toBe(true)
            expect(comment.hasOwnProperty('author')).toBe(true)
            expect(comment.hasOwnProperty('body')).toBe(true)
          })
        })
    })
    test('return an array of comment objects ordered with most recent first', () => {
        return request(app)
        .get("/api/articles/9/comments")
        .expect(200)
        .then((response) => {
            const comments = response.body.comments
            expect(comments).toBeSortedBy("created_at", {
                descending: true,
                coerce: true,
              });
        })
    })
    test('returns an empty array when article_id exists but there are no comments with that article_id', () => {
      return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments
        expect(comments.length).toBe(0)
      })
    })


    
  
   

    /*test for errors: 
    - invalid article id 
    - non-existent 
    - when there are no comments with that article_id (look at lecture from yesterday(today))
    */
});