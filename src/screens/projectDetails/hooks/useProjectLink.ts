import {useCallback, useState} from "react";
import {ProjectDto} from "../../../services/api/dtos";
import {projectApiService} from "../../../services/api/ProjectApiService";

export default function useProjectLink() {
  const [project, setProject] = useState<ProjectDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProjectLink = useCallback(async (project: ProjectDto) => {
    setLoading(true);
    const query: any = {};
    if (project.source === 'senat_pl') {
      query['title'] = project.numarInregistrareCDep;
    } else if (project.source === 'camera_deputatilor_pl') {
      query['title'] = project.numarInregistrareSenat;
    }
    if (!query.title) {
      setLoading(false);
      return;
    }
    const response = await projectApiService.getProjectByFilter(query);
    if (response.success && response.payload && response.payload.length > 0) {
      setProject(response.payload![0]);
    }
    setLoading(false);
  }, []);

  return {
    project,
    loading,
    fetchProjectLink,
  };
}
