import ThemeProvider
from "../../context/ThemeContext";

import AuthProvider
from "../../context/AuthContext";

import ProjectProvider
from "../../context/ProjectContext";

function Providers({
  children
}) {

  return (

    <ThemeProvider>

      <AuthProvider>

        <ProjectProvider>

          {children}

        </ProjectProvider>

      </AuthProvider>

    </ThemeProvider>
  );
}

export default Providers;