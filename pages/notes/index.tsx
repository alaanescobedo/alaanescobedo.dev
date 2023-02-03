import Head from "next/head";

import { GetStaticProps } from "next";
import {
  getAllPosts,
  getAllPostsByLocale,
} from "../../src/services/request/graphql-request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PostCard from "../../src/ui/components/blog/post-card";
import { Container, Grid, GridItem } from "@chakra-ui/react";

export default function NotesPage({ posts }: any) {
  return (
    <>
      <Head>
        <title>Notes</title>
        <meta name="description" content={`123`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"container.lg"} flex={1} zIndex={100}>
        <Grid gap={3} templateColumns="repeat(3, 1fr)">
          {posts.map((post: any) => (
            <GridItem display={"flex"} colSpan={[3, 3, 1]} key={post.node.id}>
              <PostCard post={post.node} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = (await getAllPostsByLocale(locale!)) ?? [];

  const initialLocale = locale || "es";
  return {
    props: {
      posts,
      ...(await serverSideTranslations(initialLocale, [
        "home",
        "projects",
        "goals",
        "contributions",
        "navbar",
        "auth",
      ])),
    },
  };
};
