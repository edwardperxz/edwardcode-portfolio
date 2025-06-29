import { useEffect, useState } from "react";
import { fetchProjects } from "../services/api";

interface Project {
  name?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .catch(() => setError("Error al cargar proyectos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando proyectos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project, idx) => (
          <li key={idx}>{project.name || JSON.stringify(project)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;