
const { test, expect } = require('@playwright/test');

const baseURL = 'https://jsonplaceholder.typicode.com';

test.describe('JSON Placeholder API', () => {
  test('GET /posts - Retrieve all posts', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`);
    await expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(posts.length).toBe(100);
  });

  test('GET /posts/1 - Retrieve single post', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts/1`);
    await expect(response.ok()).toBeTruthy();
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
  });

  test('GET /posts/999 - Non-existent post', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts/999`);
    await expect(response.status()).toBe(404);
  });

  test('POST /posts - Create a new post', async ({ request }) => {
    const newPost = { title: 'Test Post', body: 'This is a test', userId: 1 };
    const response = await request.post(`${baseURL}/posts`, { data: newPost });
    await expect(response.ok()).toBeTruthy();
    const createdPost = await response.json();
    expect(createdPost.id).toBe(101);
    expect(createdPost.title).toBe(newPost.title);
  });

  test('PUT /posts/1 - Update a post', async ({ request }) => {
    const updatedPost = { id: 1, title: 'Updated Title', body: 'Updated body', userId: 1 };
    const response = await request.put(`${baseURL}/posts/1`, { data: updatedPost });
    await expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.title).toBe(updatedPost.title);
  });

  test('PATCH /posts/1 - Partial update', async ({ request }) => {
    const partialUpdate = { title: 'Patched Title' };
    const response = await request.patch(`${baseURL}/posts/1`, { data: partialUpdate });
    await expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.title).toBe(partialUpdate.title);
  });

  test('DELETE /posts/1 - Delete a post', async ({ request }) => {
    const response = await request.delete(`${baseURL}/posts/1`);
    await expect(response.ok()).toBeTruthy();
    expect(await response.text()).toBe('{}');
  });

  test('POST /posts - Invalid data', async ({ request }) => {
    const invalidPost = { title: '' };
    const response = await request.post(`${baseURL}/posts`, { data: invalidPost });
    await expect(response.ok()).toBeTruthy();
    const result = await response.json();
    expect(result.body).toBeUndefined();
  });
});
