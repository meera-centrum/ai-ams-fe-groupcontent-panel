export default async function fetcher(url: string) {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res
      .text()
      .then((text) => Promise.reject(text))
      .catch(() => Promise.reject(res.statusText));
  });
}
