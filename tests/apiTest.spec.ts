import { test, expect, request } from '@playwright/test';

test.describe('API Tests', () => {

  const baseURL = 'https://jsonplaceholder.typicode.com';

  test('GET request - Fetch posts', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThan(0);

    console.log(responseBody[0]); // Logs the first post object
  });

  test('POST request - Create a new post', async ({ request }) => {
    const postPayload = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    const response = await request.post(`${baseURL}/posts`, {
      data: postPayload
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id'); // New ID should be assigned
    expect(responseBody.title).toBe(postPayload.title);
    expect(responseBody.body).toBe(postPayload.body);
    expect(responseBody.userId).toBe(postPayload.userId);

    console.log(responseBody); // Logs the newly created post object
  });
});