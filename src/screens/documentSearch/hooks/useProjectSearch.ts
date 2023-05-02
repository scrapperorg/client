import { debounce } from "@mui/material";
import { useSessionStorage } from "hooks/useSessionStorage";
import { useEffect, useMemo, useState } from "react";
import { projectApiService } from "services/api/ProjectApiService";
import { ProjectDto } from "services/api/dtos";

export function useProjectSearch() {
  const { setItem, removeItem, getItem } = useSessionStorage()

  const savedProject = getItem('documentSearchProject');
  const defaultProject = savedProject ? JSON.parse(savedProject) : null;

  const [value, setValue] = useState<ProjectDto | null>(defaultProject);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly ProjectDto[]>([]);


  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { title: string },
          callback: (results?: readonly ProjectDto[]) => void,
        ) => {
          projectApiService.search(
            request
          ).then(response => callback(response?.payload))
        },
        400,
      ),
    [],
  );

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ title: inputValue }, (results?: readonly ProjectDto[]) => {
      if (active) {
        let newOptions: readonly ProjectDto[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const persistSelectedProject = (project: ProjectDto | null) => {
    if (!project) {
      removeItem('documentSearchProject')
      return
    }
    setItem('documentSearchProject', JSON.stringify(project))
  }

  return {
    value,
    setValue,
    setInputValue,
    options,
    setOptions,
    persistSelectedProject
  }
}