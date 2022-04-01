export const fetchApi = (url: string) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
