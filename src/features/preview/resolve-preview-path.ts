export type PreviewType = 'Post' | 'Page';

export function resolvePreviewPath(typeName: string, slug: string) {
  const allowed: PreviewType[] = ['Post', 'Page'];
  if (!allowed.includes(typeName as PreviewType)) {
    throw new Error(`Preview for ${typeName} is not enabled in Phase 1.`);
  }

  if (typeName === 'Page') {
    return slug === 'home' ? '/' : `/${slug}`;
  }

  return `/blog/${slug}`;
}
