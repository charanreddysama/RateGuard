import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getProjects
} from "../services/projectService";

const ProjectContext =
  createContext();

export const useProjects = () =>
  useContext(ProjectContext);

function ProjectProvider({
  children
}) {

  const [projects,
    setProjects] =
    useState([]);

  const [selectedProject,
    setSelectedProject] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const fetchProjects =
  async () => {

    try {

      setLoading(true);

      const data =
        await getProjects();

      setProjects(data);

      // Auto select first project

      if (
        data.length > 0 &&
        !selectedProject
      ) {

        setSelectedProject(
          data[0]
        );
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

useEffect(() => {

  const token =
    localStorage.getItem("token");

  if (!token) return;

  fetchProjects();

}, []);
  return (

    <ProjectContext.Provider

      value={{

        projects,
        loading,

        selectedProject,
        setSelectedProject,

        fetchProjects
      }}
    >

      {children}

    </ProjectContext.Provider>
  );
}

export default ProjectProvider;