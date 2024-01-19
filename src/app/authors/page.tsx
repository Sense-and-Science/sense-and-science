'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import BlogPage from '@/components/layout/BlogPage';
import AuthorCard from '@/components/util/AuthorCard';
import DeveloperCard from '@/components/util/DeveloperCard';
import { services } from '@/services';
import { BlogUserCompound } from '@/types';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Authors() {
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [members, setMembers] = useState<BlogUserCompound[] | null>(null);
  const [authors, setAuthors] = useState<BlogUserCompound[] | null>(null);

  const [developers, setDevelopers] = useState<BlogUserCompound[] | null>(null);

  async function loadAuthors() {
    setLoadingAuthors(true);
    const { result, error } = await services.users.getAuthors();
    if (error) {
      toast('Something went wrong', { type: 'error' });
    } else if (result) {
      setMembers(result);
      setAuthors(
        result.filter((r) => {
          if (r.firstName === 'Randima' || r.firstName === 'Nethsara') {
            return false;
          }
          return true;
        })
      );
    }
    setLoadingAuthors(false);
  }

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    if (members && members.length >= 2) {
      const randima = members.find((a) => a.firstName === 'Randima');
      const nethsara = members.find((a) => a.firstName === 'Nethsara');
      if (randima && nethsara) setDevelopers([nethsara, randima]);
    }
  }, [members]);

  return (
    <BlogPage>
      <div
        className='relative'
        style={{
          height:
            loadingAuthors || (!loadingAuthors && authors?.length == 0)
              ? 'calc(100vh - 236px)'
              : 'auto',
        }}
      >
        <title>Authors | Sense & Science</title>
        <meta
          name='description'
          content='Authors of Sense & Science blog website'
        />
        {loadingAuthors ? (
          <div
            className='absolute flex flex-col  items-center justify-center gap-4'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <Icon
              icon={'svg-spinners:blocks-shuffle-3'}
              className='text-[5rem] opacity-[0.5]'
            ></Icon>
            <p className='text-center text-xl opacity-[0.5]'>Please wait</p>
          </div>
        ) : authors ? (
          <>
            <h2 className='mb-4 text-2xl font-bold lg:text-3xl'>Authors</h2>
            <section className='author-gallery'>
              {authors.map((author) => {
                return <AuthorCard key={author.id} author={author} />;
              })}
            </section>
            {developers && (
              <>
                <h2 className='my-4 text-3xl font-bold'>Developers</h2>
                <section className='author-gallery'>
                  {developers.map((developer) => {
                    return (
                      <DeveloperCard key={developer.id} developer={developer} />
                    );
                  })}
                </section>
              </>
            )}
          </>
        ) : null}
      </div>
    </BlogPage>
  );
}
