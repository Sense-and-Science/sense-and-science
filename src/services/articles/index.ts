import { createArticle } from './createArticle';
import { createArticleDraft } from './createArticleDraft';
import { getPendingArticles } from './getPendingArticles';
import { getPublishedArticles } from './getPublishedArticles';
import { getSelfArticles } from './getSelfArticles';
import { publishArticle } from './publishArticle';
import { requestUpdateForArticle } from './requestUpdateForArticle';

export const articles = {
  createArticle,
  createArticleDraft,
  getSelfArticles,
  getPendingArticles,
  publishArticle,
  requestUpdateForArticle,
  getPublishedArticles,
};
