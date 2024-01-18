import { doc, getDoc, getDocs, getDocsFromServer, orderBy, query, where } from 'firebase/firestore';

import { authorApplicationCollection, userCollection } from '@/firebase';
import { BlogAuthorApplicationCompund, BlogAuthorApplicationStatus } from '@/types';

export async function getAuthorApplications() {
  let result: BlogAuthorApplicationCompund[] | null = null,
    error = null;
  try {
    const applicationsQuery = query(
      authorApplicationCollection,
      where('status', '==', BlogAuthorApplicationStatus.PENDING),
      orderBy('createdAt')
    );
    const snapshot = await getDocsFromServer(applicationsQuery);
    const applications: BlogAuthorApplicationCompund[] = [];
    for (const ds of snapshot.docs) {
      const applicationData = ds.data();
      const userId = applicationData.userId;
      const userDocRef = doc(userCollection, userId);
      const userData = (await getDoc(userDocRef)).data();
      if (userData) {
        const data: BlogAuthorApplicationCompund = {
          ...applicationData,
          name: `${userData.firstName} ${userData.lastName}`,
          contactNo: userData.contactNo,
          id: ds.id,
        };
        applications.push(data);
      }
    }
    result = applications;
  } catch (e) {
    error = e;
  }
  return { result, error };
}
