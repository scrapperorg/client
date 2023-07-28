import { useState } from 'react'

import { registerPlugin } from "react-filepond";

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';


registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
)

export function useUploadPhoto() {
  const [files, setFiles] = useState<any[]>([]);

  return {
    files,
    setFiles,
  };
}