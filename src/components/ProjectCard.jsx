import Tilt from 'react-parallax-tilt';

function ProjectCard({ project, onClick }) {
  return (
    <Tilt 
      glareEnable={true} 
      glareMaxOpacity={0.2} 
      scale={1.05} 
      transitionSpeed={400}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      className="project-card-wrapper"
      glareBorderRadius='16px'
    >
        <div className="project-card" onClick={onClick} style={{transform: 'none'}}>
          <img src={project.img} className="card-img" alt={project.title} loading="lazy" />
          
          <div className="card-overlay">
            <div className="card-header-flex">
              {project.logo && (
                <img src={project.logo} className="team-logo-img" alt="logo" />
              )}
              <span className="card-title">
                {project.title}
                {project.isHub && (
                  <span style={{fontSize:'0.6em', color:'var(--accent-red)', verticalAlign:'middle', marginLeft:'5px'}}>
                     [HUB]
                  </span>
                )}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
               <span className="card-meta">{project.location}</span>
               <span className="card-meta" style={{ color: '#666' }}>{project.date}</span>
            </div>
          </div>
        </div>
    </Tilt>
  );
}

export default ProjectCard;