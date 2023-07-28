
import React from 'react';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';


import { useUploadPhoto } from '../../hooks/useUploadPhoto';
import { Box } from '@mui/material';
import styled from 'styled-components';

export interface UploadPhotoProps {
  serverUrl: string;
}

export const UploadPhoto = (props: UploadPhotoProps) => {

  const { serverUrl } = props;

  const { files, setFiles } = useUploadPhoto();

  return (
    <StyledBox>
      <FilePond
          files={files}
          onupdatefiles={setFiles}
          onprocessfiles={() => window.location.reload()}
          labelIdle='Drag & Drop pozei tale sau <span class="filepond--label-action">cauta</span>'
          credits={false}
          acceptedFileTypes={['image/png', 'image/jpeg']}
          server={serverUrl}
          name="file"
          imageResizeTargetWidth={200}
          imageResizeTargetHeight={144}
          imageResizeUpscale={false}
          imageResizeMode={"contain"}
          allowImageTransform={true}
        />
    </StyledBox>
  );

};

const StyledBox = styled(Box)`
  display: block;
  width: 100%;
  height: 100%;
`;