import { create } from 'zustand';

import { BlogArticleBrief } from '@/types';
import { ArticleStore } from '@/types/states/article.state';

export const useArticlesStore = create<ArticleStore>((set, state) => ({
  loadingPublishedArticles: true,
  publishedArticles: null,
  setArticles: (publishedArticles: BlogArticleBrief[]) =>
    set(() => ({ publishedArticles })),
  removeArticles: () => {
    set(() => ({ publishedArticles: null }));
  },
  setLoadingPublishedArticles: (mode: boolean) => {
    set(() => ({ loadingPublishedArticles: mode }));
  },
  getArticle: (slug: string) => {
      const articles = state().publishedArticles
      if(articles) {
        const article = articles.find(a => a.slug === slug)
        return article ?? null
      } 
      return null
  },
}));
