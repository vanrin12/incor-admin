/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { ROUTES } from 'utils/Apis';

// Custom Upload Adapter
export class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    return this.loader.file.then((file) => {
      const data = new FormData();
      data.append('upload', file);
      const genericError = `Couldn't upload file: ${file.name}.`;

      return axios({
        data,
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}${ROUTES.UPLOAD_IMAGE}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(({ data }) => {
          return { default: data.data.url };
        })
        .catch(({ error }) => Promise.reject(error?.message ?? genericError));
    });
  }

  abort() {
    return Promise.reject();
  }
}

// CKEditor FileRepository
export function uploadAdapterPlugin(editor) {
  if (editor && editor.plugins) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>
      new UploadAdapter(loader);
  }
}
