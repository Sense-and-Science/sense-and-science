import { BlogArticleBrief } from '../';

export type ArticleStore = {
  loadingPublishedArticles: boolean;
  publishedArticles: BlogArticleBrief[] | null;
  setArticles: (articles: BlogArticleBrief[]) => void;
  removeArticles: () => void;
  setLoadingPublishedArticles: (mode: boolean) => void;
  getArticle: (slug: string) => BlogArticleBrief | null;
};
