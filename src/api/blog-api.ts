import axios from 'axios';
import queryString from 'query-string';

const baseUrlBLog = 'https://blog.insa.vn/graphql';

const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response.data) {
            return response.data;
        }
        return response;
    },

    async (error) => {
        return Promise.reject(error);
    },
);

export async function getPosts() {
    const response = await axiosClient({
        method: 'POST',
        url: baseUrlBLog,
        data: JSON.stringify({
            query: `
            query {
                posts(where: {tag: "", offsetPagination: {offset: 0, size: 3}, categoryId: 233}) {
                nodes {
                    id
                    link
                    slug
                    title
                    uri
                    featuredImage {
                      node {
                        id
                        sourceUrl
                      }
                    }
                    excerpt
                    date
                  }
              }
            }
            `,
        }),
    });

    return response;
}

export function getPostDetail() {}
