import Head from "next/head";
import Page from "../../src/ui/pages/projects/project-detail";

import PROJECTS_JSON from "../../public/locales/en/projects.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const PROJECTS = PROJECTS_JSON.data;
type IProject = typeof PROJECTS[0];

interface ProjectDetailProps {
  project: IProject;
  nextProjectSlug: string;
  prevProjectSlug: string;
}
export default function ProjectDetailPage({
  project,
  nextProjectSlug,
  prevProjectSlug,
}: ProjectDetailProps) {
  return (
    <>
      <Head>
        <title>{project.title}</title>
        <meta
          name="description"
          content={`${project.title} - ${project.description[0]}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page
        project={project}
        nextProjectSlug={nextProjectSlug}
        prevProjectSlug={prevProjectSlug}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pathsWithLocale = locales?.map((locale) => {
    return PROJECTS.map(({ slug }) => {
      return {
        params: { slug },
        locale,
      };
    });
  });

  return { paths: pathsWithLocale?.flat() ?? [], fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const initialLocale = context.locale ?? context.defaultLocale ?? "es";
  const projects =
    require(`../../public/locales/${initialLocale}/projects.json`)
      .data as IProject[];
  const project = projects.find(({ slug }) => slug === context.params?.slug);

  if (!project) {
    return { notFound: true };
  }

  const nextProject =
    PROJECTS.find(({ id }) => id === project?.id + 1) || PROJECTS[0];
  const prevProject =
    PROJECTS.find(({ id }) => id === project?.id - 1) ||
    PROJECTS[PROJECTS.length - 1];

  return {
    props: {
      project,
      nextProjectSlug: nextProject?.slug,
      prevProjectSlug: prevProject?.slug,
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale ?? "es",
        ["projects", "navbar", "auth"]
      )),
    },
  };
};
