import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getAllPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            id
            createdAt
            updatedAt
            title
            slug
            excerpt
            author {
              bio
              createdAt
              id
              name
              photo {
                url
              }
            }
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  if (!graphqlAPI) return;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getAllPostsByLocale = async (locale: string) => {
  const query = gql`
      query MyQuery {
        postsConnection(locales: ${locale}) {
          edges {
            node {
              id
              createdAt
              updatedAt
              title
              slug
              excerpt
              author {
                bio
                createdAt
                id
                name
                photo {
                  url
                }
              }
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      } 
    `;

  if (!graphqlAPI) return;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

export const getPostBySlug = async (slug: string, locales: any) => {
  const query = gql`
    query MyQuery {
      post(locales: [${locales.current},${locales.default}],where: {slug: "${slug}"}) {
        title
        publishedAt
        id
        featuredPost
        createdAt
        updatedAt
        categories {
          id
        }
        content {
          raw
        }
        author {
          id
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
      }
    }
  `;

  if (!graphqlAPI) return;
  const result = await request(graphqlAPI, query);
  return result.post;
};

export const getAuthor = async (id: string) => {
  const query = gql`
    query MyQuery {
      authors(where: { id: "cldkzvs9z0bif0aliqw791tb9" }) {
        createdAt
        bio
        id
        name
      }
    }
  `;

  if (!graphqlAPI) return;
  const result = await request(graphqlAPI, query);
  return result.authors;
};

export const getCategories = async (ids: string[]) => {
  const query = gql`
    query MyQuery {
      categories(
        where: {id_in: [${ids}]}
      ) {
        id
        name
      }
    }
  `;

  if (!graphqlAPI) return;
  const result = await request(graphqlAPI, query);
  return result.categories;
};
