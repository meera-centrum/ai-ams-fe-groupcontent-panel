import { nanoid } from 'nanoid';

// const END_POINT = 'http://localhost:3001';
// const COOKIE =
// 'next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.csrf-token=256871b602664bd6fdbee2beab9fce5f7e708c2c66db8a33ed065f8f70a9c11a%7Cb1915ba2768886b25fd4f19436a1acf9d7c33373966cba048afe299bb7a6ad50; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..eUvkZZZGNtnH7pvV.79myPh5rBjmAree7v8pQnJqDklAvUQGjMydCQ0BP1wD2BtenOew7scEetjn0wDUCVETow0yGyBSarv1D4AB2sc8N31X-e2eFwJiDdT71YP0mJ0BU2ANSTEwEt4ibYfA0uM-v7PWstRMIYy8s5FcLOoJ-d0uhgEJwDR3lN674Ci-OJW-ugDLKmZCn7w9Dnwb1_m2NZubOy6L892xlUTa6WHgh3gF-yRENWeI.Rxi0cg6MAoBPHqJgLngRYQ; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fchats; next-auth.csrf-token=26e014549eb834b532c907f1b0050953e4aa6791c337507d9594845fc29bbd19%7Ca3d1e09c1953077475bdd194ee81d507fd12b1aeddbd9fdf02450cd8d96cf469; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Wl6_xaEhqr266qsL.si5p56ildw7gVluYd0bOFkksU_9ceRo2HoHMVI7yVSXky5O2wWDm1WrmIW0xuqH1CBQSUJzr3h0E0f9kcDXkkq_iLj0PGHH-15PmEp69Nmllh6xVpauIJOznp92svCIy-9zhSOTIXfhr14YUC2EEeNFwin2aN5ewPUu3tFHn0cp8gQITgpBwoluXx1luViN_j4hAeYjDA72dT3pOXt8Rif2Rpn_WlZl23xU.e5-RyvO9Vh40wnKIiO15FA';

export const generateMessage = async (
  chatId: string,
  urlQueryParameter: string,
  cookieQueryParameter: string,
  message: string,
  traceId: string
) => {
  return fetch(`${urlQueryParameter}/api/generate`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      cookie: cookieQueryParameter,
    },
    body: JSON.stringify({
      chatId: chatId,
      content: message,
      createdAt: new Date(),
      id: nanoid(),
      role: 'user',
      traceId: traceId,
    }),
  });
};
//
export const deleteMessage = async (traceId: string, urlQueryParameter: string, cookieQueryParameter: string) => {
  fetch(`${urlQueryParameter}/api/messages?id=${traceId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'content-type': 'text/plain',
      cookie: cookieQueryParameter,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res
      .text()
      .then((text) => Promise.reject(text))
      .catch(() => Promise.reject(res.statusText));
  });
};
//
export async function chatListFetcher(url: string, cookieQueryParameter: string) {
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      cookie: cookieQueryParameter,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res
      .text()
      .then((text) => Promise.reject(text))
      .catch(() => Promise.reject(res.statusText));
  });
}
