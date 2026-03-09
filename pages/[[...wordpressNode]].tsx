import type { GetStaticPaths, GetStaticProps } from "next";
import { getNextStaticProps, WordPressTemplate } from "@faustwp/core";
import { templates } from "@/wp-templates";

export default function WordPressNode(props: any) {
  const hasWordPressNode = Boolean(
    props?.seedNode ?? props?.__SEED_NODE__ ?? props?.data?.nodeByUri ?? props?.data?.node,
  );

  if (!hasWordPressNode) {
    const NotFound = templates.notFound;
    return <NotFound />;
  }

  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = (ctx) => {
  return getNextStaticProps(ctx, {
    Page: WordPressNode,
  });
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
