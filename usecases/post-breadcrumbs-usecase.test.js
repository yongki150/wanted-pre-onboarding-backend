const { expect } = require("chai");
const { faker } = require("@faker-js/faker");
const { StatusCodes: statusCodes } = require("http-status-codes");

require("dotenv").config();
const database = require("../apps/database");
const { postUsecase: usecase } = require("./");
const { postRepository: repository } = require("../repositories");

const userSeq = +process.env.TEST_USER_SEQ;
const postSeq = 21;
const parentSeq = 10;

afterAll(() => database.close());

describe("부모 게시글 일련번호 수정", () => {
  const postSeqs = [2, 11];
  const newParentSeq = 11;

  beforeEach(async () => {
    const promises = postSeqs.map((postSeq, idx) =>
      repository.insertPostWithSeq({
        postSeq,
        parentSeq: postSeqs[idx - 1],
        postTitle: faker.person.jobTitle(),
        postContent: faker.lorem.text(),
        userSeq,
      })
    );

    await Promise.allSettled(promises);
  });

  afterEach(async () => {
    const recoverPost = usecase.putBreadcrumbs({
      postSeq,
      userSeq,
      parentSeq,
    });

    const deletePosts = postSeqs.map((postSeq) =>
      repository.deletePost({
        postSeq,
        userSeq,
      })
    );

    await Promise.allSettled([recoverPost, ...deletePosts]);
  });

  /**
   * prev: null ← 1 ← 10 ← 21
   * next: null ← 2 ← 11 ← 21
   */
  test("부모 게시글 일련번호 수정", async () => {
    const status = await usecase.putBreadcrumbs({
      postSeq,
      userSeq,
      parentSeq: newParentSeq,
    });

    expect(status).to.equal(statusCodes.CREATED);
  });

  test("부모 게시글 일련번호 수정 (변경된 요소 존재하지 않음)", async () => {
    const status = await usecase.putBreadcrumbs({
      postSeq,
      userSeq,
      parentSeq,
    });

    expect(status).to.equal(statusCodes.NO_CONTENT);
  });
});
