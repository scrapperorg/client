import { AuthContext } from "contexts/authContext";
import { useContext, useEffect, useState } from "react"
import { userApiService } from "services/api/UserApiService";


export const useDocumentsFilters = () => {
  const [sourcesOfInterest, setSourcesOfInterest] = useState<string[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const sources = user?.sourcesOfInterest ?? [];
    setSourcesOfInterest(sources)
  }, [user?.sourcesOfInterest])


  const updateSourcesOfInterest = (sources: string[]) => {
    setSourcesOfInterest(sources);
    userApiService.updateSourcesOfInterest(sources);
  }

  return {
    sourcesOfInterest,
    updateSourcesOfInterest,
  }
}