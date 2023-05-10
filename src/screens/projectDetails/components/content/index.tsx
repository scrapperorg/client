import React, {useContext, useEffect} from 'react';
import { ProjectDetailsContext } from 'screens/projectDetails/context';
import { ProjectDocumentsList } from '../projectDocumentsList';
import { ProjectGeneralData } from '../projectGeneralData';
import { ProjectHeader } from '../projectHeader';
import {useParams} from "react-router-dom";

export default function ProjectDetailsContent () {

  const { project } = useContext(ProjectDetailsContext);

  if (!project) return null

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectGeneralData project={project} />
      <ProjectDocumentsList project={project} />
    </>
  );
}