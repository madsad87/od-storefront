import type { GetStaticPaths, GetStaticProps } from "next";
import { getNextStaticProps, is404, WordPressTemplate } from "@faustwp/core";
import { templates } from "@/wp-templates";

export default function WordPressNode(props: any) {
  if (is404(props)) {
    const NotFound = templates.notFound;
    return <NotFound />;
  }

  // The Faust dynamic template route still resolves through getNextStaticProps.
  // Apollo-powered custom pages do not interfere with this catch-all flow.
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = (ctx) => {
  return getNextStaticProps(ctx, {
    templates,
  });
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
