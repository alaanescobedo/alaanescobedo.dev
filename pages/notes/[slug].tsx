import Head from "next/head";

import { GetStaticPaths, GetStaticProps } from "next";
import {
  getAuthor,
  getCategories,
  getPostBySlug,
  getAllPosts,
} from "../../src/services/request/graphql-request";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Page from "../../src/ui/pages/post/post-details";

export default function NotePage({ note, categories }: any) {
  return (
    <>
      <Head>
        <title>Notes</title>
        <meta name="description" content={`123`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Page post={note} />
      </>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = (await getAllPosts()) ?? [];
  const pathsWithLocale =
    locales?.map((locale) => {
      return posts.map((post: any) => ({
        params: { slug: post.node.slug },
        locale,
      }));
    }) ?? [];

  return { paths: pathsWithLocale.flat(), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale,
}) => {
  const { slug } = params as { slug: string };

  const note =
    (await getPostBySlug(slug, { current: locale, default: defaultLocale })) ??
    [];
  const ids: string[] = note.categories.map(
    (category: any) => `"${category.id}"`
  );
  const categories = (await getCategories(ids)) ?? [];

  const initialLocale = locale ?? defaultLocale ?? "es";
  return {
    props: {
      note,
      categories,
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
