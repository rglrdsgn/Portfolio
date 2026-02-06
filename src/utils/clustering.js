// Questa funzione prende la lista dei progetti e unisce quelli vicini
export function clusterProjects(data) {
    const clusters = [];
    const threshold = 0.5; // Distanza minima per raggruppare (gradi latitudine/longitudine)

    data.forEach(project => {
        let addedToCluster = false;

        // Controlla se il progetto è vicino a un cluster esistente
        for (let cluster of clusters) {
            // Se è già un HUB, controlliamo la distanza dal centro del cluster
            const dLat = Math.abs(cluster.lat - project.lat);
            const dLon = Math.abs(cluster.lon - project.lon);

            if (dLat < threshold && dLon < threshold) {
                cluster.subProjects.push(project);
                cluster.isHub = true; // Diventa un HUB
                // Se è un HUB, il titolo cambia (es. "MILANO HUB")
                if (cluster.subProjects.length === 2) {
                    const cityName = cluster.location.split(',')[0]; 
                    cluster.title = cityName + " HUB";
                }
                addedToCluster = true;
                break;
            }
        }

        // Se non è vicino a nessuno, crea un nuovo punto
        if (!addedToCluster) {
            clusters.push({
                ...project, // Copia tutti i dati del progetto
                isHub: false,
                subProjects: [project] // Inizializza la lista dei sottoprogetti
            });
        }
    });

    return clusters;
}