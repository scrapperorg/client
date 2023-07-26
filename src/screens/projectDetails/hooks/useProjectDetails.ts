import { useContext, useEffect, useState } from 'react';
import { ProjectDto } from 'services/api/dtos';
import { ProjectDetailsContext } from '../context';
import { attachmentApiService } from 'services/api/AttachmentApiService';
import { downloadBlob } from 'helpers/downloadBlob';
import { projectApiService } from '../../../services/api/ProjectApiService';

export function useProjectDetails() {
  const { project: contextProject } = useContext(ProjectDetailsContext);
  const [project, setProject] = useState<ProjectDto | null>(null);

  useEffect(() => setProject(contextProject), [contextProject]);

  const uploadAttachment = async (attachment: File) => {
    if (!project?.id) return false;
    const { payload } = await projectApiService.uploadAttachment(project.id, attachment);

    if (!payload) return;
    setProject(payload);
  };

  const deleteAttachment = async (attachmentId: string) => {
    if (!project?.id) return false;
    const { payload } = await projectApiService.deleteAttachment(project.id, attachmentId);
    if (!payload) return;
    setProject(payload);
  };

  const downloadAttachment = async (attachmentId: string) => {
    const data = await attachmentApiService.downloadAttachment(attachmentId);

    if (data.payload) {
      const { blob, fileName } = data.payload;
      downloadBlob(blob, fileName);
    }
  };

  return {
    project,
    uploadAttachment,
    deleteAttachment,
    downloadAttachment,
  };
}
