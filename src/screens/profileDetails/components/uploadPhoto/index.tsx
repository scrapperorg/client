
import React from 'react';
import { FilePond } from 'react-filepond';

import 'filepond/dist/filepond.min.css';


import { useUploadPhoto } from '../../hooks/useUploadPhoto';
import { Box } from '@mui/material';
import styled from 'styled-components';

export interface UploadPhotoProps {
  serverUrl: string;
  labelText: string;
}

export const UploadPhoto = (props: UploadPhotoProps) => {

  const { serverUrl, labelText } = props;

  const { files, setFiles } = useUploadPhoto();

  return (
    <StyledBox>
      <StyledFilePond
          files={files}
          onupdatefiles={setFiles}
          onprocessfiles={() => window.location.reload()}
          labelIdle={labelText}
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

const StyledFilePond = styled(FilePond)`
  .filepond--panel-root {
    padding: 6px 16px;
    border-radius: 4px;
    background-color: #7582EB;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
  }
  .filepond--drop-label {
    cursor: pointer;
  }
  .filepond--drop-label label {
    color: #fff;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    cursor: pointer;
  }
`;