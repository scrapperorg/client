import React from 'react';
import { useProjectDetails } from 'screens/projectDetails/hooks/useProjectDetails';
import { ProjectDocumentsList } from '../projectDocumentsList';
import { ProjectGeneralData } from '../projectGeneralData';
import { ProjectHeader } from '../projectHeader';
import ProjectAttachments from '../projectAttachments';

export default function ProjectDetailsContent() {
  const { project, deleteAttachment, downloadAttachment, uploadAttachment } = useProjectDetails();

  if (!project) return null;

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectGeneralData project={project} />
      <ProjectDocumentsList project={project} />
      <ProjectAttachments
        project={project}
        onUploadAttachment={uploadAttachment}
        onDeleteAttachment={deleteAttachment}
        onDownloadAttachment={downloadAttachment}
      />
    </>
  );
}
