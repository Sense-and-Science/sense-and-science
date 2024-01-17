
import { BlogArticleCompund } from '../';

export type ArticleStore = {

    loadingPublishedArticles: boolean
  publishedArticles: BlogArticleCompund[] | null;
  setArticles: (articles: BlogArticleCompund[]) => void;
  removeArticles: () => void;
  setLoadingPublishedArticles: (mode: boolean) => void
  getArticle: (slug: string) => BlogArticleCompund | null
};
