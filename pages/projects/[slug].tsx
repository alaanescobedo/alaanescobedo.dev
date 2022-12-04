import Head from "next/head";
import Page from "../../src/ui/pages/projects/project-detail";

import PROJECTS from "../../src/data/projects.json";
import { GetStaticPaths, GetStaticProps } from "next";

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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = PROJECTS.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slugParam = context.params?.slug as string;
  const project = PROJECTS.find(({ slug }) =>
    slug.includes(slugParam)
  ) as IProject;

  if (!project) {
    return {
      notFound: true,
    };
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
    },
  };
};
