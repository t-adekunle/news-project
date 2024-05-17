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

describe ("GET /api", () => {
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
  test("returns an object with correct article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.article_id).toBe(1);
      });
  });
  test("returns an object with correct properties ", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.article_id).toBe(1);
        expect(article.hasOwnProperty("author")).toBe(true);
        expect(article.hasOwnProperty("title")).toBe(true);
        expect(article.hasOwnProperty("body")).toBe(true);
        expect(article.hasOwnProperty("topic")).toBe(true);
        expect(article.hasOwnProperty("created_at")).toBe(true);
        expect(article.hasOwnProperty("votes")).toBe(true);
        expect(article.hasOwnProperty("article_img_url")).toBe(true);
      });
  });
  test("returns correct article object with correct comment_count added", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.article_id).toBe(1);
        expect(article.comment_count).toBe("11");
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
  test("returns articles sorted by specifed column if column specified", () => {
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
  

describe("GET /api/articles/:article_id/comments", () => {
  test("return an array of comment objects each with the correct properties and article_id", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(comments.length).toBe(2);
        comments.forEach((comment) => {
          expect(comment.article_id).toBe(9);
          expect(comment.hasOwnProperty("comment_id")).toBe(true);
          expect(comment.hasOwnProperty("votes")).toBe(true);
          expect(comment.hasOwnProperty("created_at")).toBe(true);
          expect(comment.hasOwnProperty("author")).toBe(true);
          expect(comment.hasOwnProperty("body")).toBe(true);
        });
      });
  });
  test("return an array of comment objects ordered with most recent first", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
      });
  });
  test("returns an empty array when article_id exists but there are no comments with that article_id", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(comments.length).toBe(0);
      });
  });
  test("returns 404 when article does not exist", () => {
    return request(app)
      .get("/api/articles/500/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
  test("returns 400 when article is invalid", () => {
    return request(app)
      .get("/api/articles/not-an-article/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe('POST "/api/articles/:article_id/comments"', () => {
  test("adds new comment to database and returns new comment back to user", () => {
    const newComment = { username: "lurker", body: "This is so interesting!" };

    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        const comment = response.body.comment;
        expect(comment.author).toBe("lurker");
        expect(comment.body).toBe("This is so interesting!");
        expect(comment.article_id).toBe(2);
        expect(comment.comment_id).toBe(19);
        expect(comment.votes).toBe(0);
        expect(comment.hasOwnProperty("created_at")).toBe(true);
      });
  });

  test("returns 400 when sent without a body", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("returns 400 when sent with invalid article ID", () => {
    const newComment = { username: "lurker", body: "This is so interesting!" };
    return request(app)
      .post("/api/articles/not-an-article/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("returns 404 when sent with and article ID that does not exist", () => {
    const newComment = { username: "lurker", body: "This is so interesting!" };
    return request(app)
      .post("/api/articles/999/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 when newComment is missing a username", () => {
    const newComment = { body: "This is so interesting!" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("returns 400 when newComment is missing a body", () => {
    const newComment = { username: "lurker" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("returns 404 when user is not in the database", () => {
    const newComment = { username: "not-a-user", body: "Cool article" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
});

describe("PATCH /api/articles/:article_id ", () => {
  test("should return updated article object with correct votes value", () => {
    const newVote = 1;
    const updateVotes = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(updateVotes)
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.article_id).toBe(1);
        expect(article.votes).toBe(101);
      });
  });

  test("should decrement votes value when newVote value is negative", () => {
    const newVote = -30;
    const updateVotes = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(updateVotes)
      .expect(200)
      .then((response) => {
        const article = response.body.article;
        expect(article.article_id).toBe(1);
        expect(article.votes).toBe(70);
      });
  });

  test("returns 400 bad request if there is no patch body", () => {
    const updateVotes = {};
    return request(app)
      .patch("/api/articles/1")
      .send(updateVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("returns 404 if article does not exist", () => {
    const newVote = -30;
    const updateVotes = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/999")
      .send(updateVotes)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 if votes increment is invalid", () => {
    const newVote = "not-a-number";
    const updateVotes = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/1")
      .send(updateVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("returns 400 if article Id is invalid", () => {
    const newVote = 1;
    const updateVotes = { inc_votes: newVote };
    return request(app)
      .patch("/api/articles/not-an-article")
      .send(updateVotes)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("deletes comment with corresponding comment id", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("returns 404 if comment ID does not exist", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toEqual("not found");
      });
  });

  test("returns 404 if comment ID is invalid", () => {
    return request(app)
      .delete("/api/comments/not-an-id")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("bad request");
      });
  });
});

describe("GET /api/users", () => {
  test("returns an array of topics objects with correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const users = response.body.users;
        expect(users.length).toBe(4);
        users.forEach((user) => {
          expect(user.hasOwnProperty("username")).toBe(true);
          expect(user.hasOwnProperty("name")).toBe(true);
          expect(user.hasOwnProperty("avatar_url")).toBe(true);
        });
      });
  });
});
describe("GET /api/articles?:topic_query", () => {
  test("returns an array of articles with the specified topic value", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles.length).toBe(12);
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  test("returns 404 when topic does not exist", () => {
    return request(app)
      .get("/api/articles?topic=not-a-topic")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 404 when topic exists but does not have any associated articles", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles.length).toBe(0);
      });
  });

  test("returns 404 when topic is invalid (topic does not exist)", () => {
    return request(app)
      .get("/api/articles?topic=5")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });
});

describe("GET/api/articles?sort_by=:column&order=:order", () => {
  test("returns articles sorted reverse alphabetically when sort_by by specified column name", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("title", {
          descending: true,
        });
      });
  });
  test("returns articles sorted by topic in reverse numerical order when colum values are numerical", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("votes", {
          descending: true,
        });
      });
  });
  test("returns articles sorted by created_at oldest first when order is asc", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("created_at");
      });
  });

  test("returns articles sorted in alphabetical order by sort_by value when order is asc ", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=asc")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("title");
      });
  });
  test("returns articles sorted in numerical order by sort_by value when order is asc ", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count&order=asc")
      .expect(200)
      .then((response) => {
        const articles = response.body.articles;
        expect(articles).toBeSortedBy("comment_count", { coerce: true });
      });
  });
  test("returns 400 when the sort_by column value is not valid ", () => {
    return request(app)
      .get("/api/articles?sort_by=not-a-column")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("returns 400 when the order value is not valid ", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count&order=5")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("GET /api/users/:username", () => {
  test('returns an object with correct username ', () => {
    return request(app)
    .get("/api/users/butter_bridge")
    .expect(200)
    .then((response) => {
      const user = response.body.user
      expect(user.username).toBe('butter_bridge')
    })
  });

  test('returns object with username, avatar_url and name properties', () => {
    return request(app)
    .get("/api/users/icellusedkars")
    .expect(200)
    .then((response) => {
      const user = response.body.user
      expect(user.username).toBe('icellusedkars')
      expect(user.name).toBe('sam')
      expect(user.avatar_url).toBe('https://avatars2.githubusercontent.com/u/24604688?s=460&v=4')
    })
  });

  test('returns 404 when username does not exist', () => {
    return request(app)
    .get("/api/users/not-a-user")
    .expect(404)
    .then((response) => {
     expect(response.body.msg).toBe('not found')
    })
  });
 
})

describe.only('PATCH /api/comments/:comment_id', () => {
  test('return an object of correct comment with updated vote value when newVote value is positive', () => {
    const newVote = 1
    const updateVotes = { inc_votes: newVote}
    return request(app)
    .patch("/api/comments/1")
    .send(updateVotes)
    .expect(200)
    .then((response) => {
      const comment = response.body.comment
      expect(comment.comment_id).toBe(1)
      expect(comment.votes).toBe(17)
    })
  });

  test('return an object of correct comment with updated vote value when newVote value is negative', () => {
    const newVote = -1
    const updateVotes = { inc_votes: newVote}
    return request(app)
    .patch("/api/comments/1")
    .send(updateVotes)
    .expect(200)
    .then((response) => {
      const comment = response.body.comment
      expect(comment.comment_id).toBe(1)
      expect(comment.votes).toBe(15)
    })
  });

test('return 404 when comment does not exist', () => {
    const newVote = -1
    const updateVotes = { inc_votes: newVote}
    return request(app)
    .patch("/api/comments/500")
    .send(updateVotes)
    .expect(404)
    .then((response) => {
     expect(response.body.msg).toBe('not found')
    })
  });

  test('return 400 when comment id is invalid', () => {
    const newVote = -1
    const updateVotes = { inc_votes: newVote}
    return request(app)
    .patch("/api/comments/invalid-comment-id")
    .send(updateVotes)
    .expect(400)
    .then((response) => {
     expect(response.body.msg).toBe('bad request')
    })
  });

  test('return 400 when newVote does not equal 1', () => {
    const newVote = 50
    const updateVotes = { inc_votes: newVote}
    return request(app)
    .patch("/api/comments/1")
    .send(updateVotes)
    .expect(400)
    .then((response) => {
     expect(response.body.msg).toBe('bad request')
    })
  });

  test('returns 400 bad request when there is no patch body', () => {
    const updateVotes = {}
    return request(app)
    .patch("/api/comments/1")
    .send(updateVotes)
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("bad request")
    })

  });

  test('returns 400 if votes increment is invalid', () => {
    const newVote = "not-a-number"
    const updateVotes = {inc_votes: newVote}
    return request(app)
    .patch("/api/comments/1")
    .send(updateVotes)
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("bad request")
    })
  });

});
