'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { services } from '@/services';
import { BlogAuthorApplicationCompund, BlogAuthorApplicationStatus } from '@/types';
import {
    IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Tfoot, Th,
    Thead, Tr
} from '@chakra-ui/react';
import { Icon } from '@iconify/react/dist/iconify.js';

function Requests() {
  const router = useRouter();

  const [loadingApplication, setLoadingApplications] = useState(true);
  const [approving, setApproving] = useState(false);
  const [declining, setDeclining] = useState(false);

  const [applications, setApplications] = useState<
    BlogAuthorApplicationCompund[] | null
  >(null);

  async function loadApplications() {
    setLoadingApplications(true);
    const { result, error } =
      await services.authorApplications.getAuthorApplications();
    if (result) {
      console.log(result);
      setApplications(result);
    } else if (error) {
      console.log((error as Error).message);
      alert('Error loading author applications, please try again later');
    }

    setLoadingApplications(false);
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function chnageStatus(
    userId: string,
    applicationId: string,
    status: BlogAuthorApplicationStatus
  ) {
    if (status === BlogAuthorApplicationStatus.APPROVED) {
      setApproving(true);
    } else {
      setDeclining(true);
    }
    const { error, result } =
      await services.authorApplications.updateApplicationStatus(
        userId,
        applicationId,
        status
      );

    if (error) {
      alert('Something went wrong, please try again later');
    }

    setApproving(false);
    setDeclining(false);

    await loadApplications();
  }

  return (
    <div>
      <h1 className='text-3xl my-8'>New author applications</h1>
      {loadingApplication && (
        <div>
          <p>Loading, please wait </p>
        </div>
      )}
      <div className='flex items-center justify-center'>
        {applications && applications.length > 0 && (
          <TableContainer>
            <Table size='lg' variant={'simple'}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Contact No</Th>
                  <Th isNumeric>Reason</Th>
                  <Th>Date & Time</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {applications.map((application) => {
                  return (
                    <Tr key={application.userId}>
                      <Td>{application.name}</Td>
                      <Td>{application.contactNo}</Td>
                      <Td>{application.reason}</Td>
                      <Td>{application.createdAt.toDate().toDateString()}</Td>
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
                                chnageStatus(
                                  application.userId,
                                  application.id,
                                  BlogAuthorApplicationStatus.APPROVED
                                );
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
                              Approve
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                chnageStatus(
                                  application.userId,
                                  application.id,
                                  BlogAuthorApplicationStatus.DENIED
                                );
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
                              Decline
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
        {applications && applications.length === 0 && (
          <>
            <p className='text-3xl font-[200] text-center mt-[175px]'>No new applications, check later</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Requests;
