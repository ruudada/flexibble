import { ProjectInterface } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions";
import Image from "next/image";
import React from "react";
import ProjectCard from "./components/ProjectCard";
import Categories from "./components/Categories";
import LoadMore from "./components/LoadMore";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }
  const pagination = data?.projectSearch?.pageInfo;

  const filteredProjects = category
    ? projectsToDisplay.filter((project) => project.node.category === category)
    : projectsToDisplay;
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {filteredProjects.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;
