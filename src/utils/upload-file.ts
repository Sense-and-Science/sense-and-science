import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import ImageKit from 'imagekit-javascript';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '@/firebase';
import { GetTokenResponse } from '@/types';

const imageKit = new ImageKit({
  publicKey: 'public_ifEo42lZZm27oCkCkxOZ6x2awPk=',
  urlEndpoint: 'https://ik.imagekit.io/compsoc/sense-and-science/',
});

/**
 * Uploads the file to firebase and get the public URL
 * @param uniqueId id of the resource
 * @param file file
 */
export async function uploadFile(uniqueId: string, files: FileList) {
  try {
    const response = await axios.get<GetTokenResponse>('/api/get-key');
    const { expire, signature, token } = response.data;

    const file = files.item(0);
    if (file) {
      const fileUploadResult = await imageKit.upload({
        file,
        fileName: `${uniqueId}-${file.name}`,
        expire,
        signature,
        token,
        folder: 'images',
      });

      const fileData = {
        id: fileUploadResult.fileId,
        url: fileUploadResult.url,
        thumbnailUrl: fileUploadResult.thumbnailUrl,
      };

      return fileData;
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function uploadFileByFileForBlog(file: File) {
  let result = {
    success: 1 as 0 | 1,
    file: {
      url: '' as string,
      fileId: '' as string,
    },
  };

  try {
    const response = await axios.get<GetTokenResponse>('/api/get-key');
    const { expire, signature, token } = response.data;

    if (file) {
      const fileUploadResult = await imageKit.upload({
        file,
        fileName: `${uuidv4()}-${file.name}`,
        expire,
        signature,
        token,
        folder: 'blog-images',
      });

      result.success = 1;
      result.file.url = fileUploadResult.url;
      result.file.fileId = fileUploadResult.fileId;

      return result;
    }
    result.success = 0;
    return result;
  } catch (error) {
    console.log(error);
    result.success = 0;
    return result;
  }
}
