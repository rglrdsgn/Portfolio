import React, { useState } from 'react';
import { projectsData } from '../data/projects'; // Importiamo i dati

function SearchUI({ onSelectProject }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.length > 0) {
      // Filtra i progetti cercando nel titolo o nella location
      const filtered = projectsData.filter(p => 
        p.title.toLowerCase().includes(val.toLowerCase()) || 
        p.location.toLowerCase().includes(val.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-ui-container">
      <div className="search-input-box">
        <i className="ri-search-line"></i>
        <input 
          type="text" 
          placeholder="Find project..." 
          value={query}
          onChange={handleSearch}
        />
      </div>

      {/* Lista dei risultati */}
      <div className={`search-results ${query.length > 0 ? 'active' : ''}`}>
        {results.length > 0 ? (
          results.map(project => (
            <div 
              key={project.id} 
              className="search-item"
              onClick={() => {
                onSelectProject(project); // Apre il modale
                setQuery(''); // Pulisce la ricerca dopo il click
                setResults([]);
              }}
            >
              <img src={project.img} className="search-thumb" alt="thumb" />
              <span>{project.title}</span>
            </div>
          ))
        ) : (
          query.length > 0 && <div className="search-item no-result">Nothing found.</div>
        )}
      </div>
    </div>
  );
}

export default SearchUI;