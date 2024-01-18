'use client';

import { useAuthStore } from '@/stores';
import { BlogUserRole } from '@/types';

export default function BecomeAnAuthorBanner() {
  const { profile } = useAuthStore();

  return (
    <>
      {!profile || (profile.role === BlogUserRole.AUTHOR ) || (profile.role === BlogUserRole.ADMIN) ? null : (
        <div>
          <h1 className={'pb-4 text-[2.5rem] font-[700]'}>BECOME AN AUTHOR</h1>
          <p>
            REGISTER AS AN AUTHOR IF YOU ARE AN UNDERGRADUATE OF UNIVERSITY OF
            COLOMBO
          </p>
        </div>
      )}
    </>
  );
}
