import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import ImageKit from 'imagekit-javascript';

import { storage } from '@/firebase';
import { GetTokenResponse } from '@/types';

const imageKit = new ImageKit({
  publicKey: 'public_NHLKvXLhGfutU7mW9CBFSv2wgWw=',
  urlEndpoint: 'https://ik.imagekit.io/vuechat/sense-and-science/',
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
      console.log(
        'File is ',
        file,
        ' storage is ',
        storage,
        ' type is ',
        file.type
      );

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
