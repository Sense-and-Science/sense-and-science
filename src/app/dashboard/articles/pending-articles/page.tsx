'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import DashboardPage from '@/components/layout/DashboardPage';
import { services } from '@/services';
import { useAuthStore } from '@/stores';
import { BlogArticleCompund } from '@/types';
import {
    IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead,
    Tr
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';

function PendingArticles() {
  const router = useRouter();

  const { user, profile } = useAuthStore();

  const [loadingApplication, setLoadingArticles] = useState(true);
  const [approving, setApproving] = useState(false);
  const [declining, setDeclining] = useState(false);

  const [articles, setArticles] = useState<BlogArticleCompund[] | null>(null);

  async function loadArticles() {
    if (user && profile) {
      setLoadingArticles(true);
      const { result, error } = await services.articles.getPendingArticles();
      if (result) {
        console.log(result);
        setArticles(result);
      } else if (error) {
        console.log((error as Error).message);
        alert('Error loading author articles, please try again later');
      }

      setLoadingArticles(false);
    }
  }
  useEffect(() => {
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, user]);

  async function publishArticle(articleId: string) {
    setApproving(true);
    const { error, result } = await services.articles.publishArticle(articleId);
    if (error) {
      toast((error as Error).message, { type: 'error' });
    } else {
      toast('Successfully published', { type: 'success' });
      await loadArticles();
    }
    setApproving(false);
  }

  async function requestUpdateForArticle(articleId: string) {
    setDeclining(true);
    const { error, result } =
      await services.articles.requestUpdateForArticle(articleId);
    if (error) {
      toast((error as Error).message, { type: 'error' });
    } else {
      toast('Declined, contact author and request updates', {
        type: 'success',
      });
      await loadArticles();
    }
    setDeclining(false);
  }

  return (
    <DashboardPage>
      <div>
        <h1 className='my-8 flex items-center justify-between text-3xl'>
          Pending Articles
        </h1>
        {loadingApplication && (
          <div>
            <p>Loading, please wait </p>
          </div>
        )}
        <div className='flex items-center justify-center'>
          {articles && articles.length > 0 && (
            <TableContainer>
              <Table size='lg' variant={'simple'}>
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Status</Th>
                    <Th>Date & Time</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {articles.map((article) => {
                    return (
                      <Tr key={article.id}>
                        <Td>{article.title}</Td>
                        <Td>{article.status}</Td>
                        <Td>{article.createdAt.toDate().toDateString()}</Td>
                        <Td>
                          <Menu size={'smaller'}>
                            <MenuButton
                              as={IconButton}
                              aria-label={'Profile Dropdown'}
                              icon={<Icon icon={'ion:md-arrow-dropdown'} />}
                              className={
                                'rounded-xl border-2 border-[var(--text-primary)] bg-[var(--bg-primary)] py-[0.9rem] text-[1.5rem]  transition hover:bg-[var(--text-primary-transparent)]'
                              }
                            />
                            <MenuList
                              className={
                                'border-none bg-[var(--bg-primary)] shadow-xl'
                              }
                              minW={0}
                              // w={'125px'}
                            >
                              <MenuItem
                                onClick={() => {
                                  publishArticle(article.id);
                                }}
                                className={
                                  'bg-[var(--bg-primary)] transition hover:bg-[var(--text-primary-transparent)]'
                                }
                                icon={
                                  <Icon
                                    icon={
                                      approving
                                        ? 'svg-spinners:90-ring'
                                        : 'basil:like-solid'
                                    }
                                    className={'text-3xl'}
                                  />
                                }
                              >
                                Publish article
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  requestUpdateForArticle(article.id);
                                }}
                                className={
                                  'bg-[var(--bg-primary)] transition hover:bg-[var(--text-primary-transparent)]'
                                }
                                icon={
                                  <Icon
                                    icon={
                                      declining
                                        ? 'svg-spinners:90-ring'
                                        : 'basil:dislike-solid'
                                    }
                                    className={'text-3xl'}
                                  />
                                }
                              >
                                Request updates
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          {articles && articles.length === 0 && (
            <>
              <p className='mt-[175px] text-center text-3xl font-[200]'>
                No new articles, check later
              </p>
            </>
          )}
        </div>
      </div>
    </DashboardPage>
  );
}

export default PendingArticles;
