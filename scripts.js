// Charger les données JSON
$.getJSON('espaces_verts.json', function(data) {
    const espacesVerts = data;

    // Fonction pour afficher les espaces verts dans le tableau
    function afficherEspacesVerts(data) {
        const tableBody = $('#spaces-table');
        tableBody.empty();

        data.forEach(espace => {
            const row = `
                <tr>
                    <td>${espace.nom}</td>
                    <td>${espace.type}</td>
                    <td>${espace.adresse || 'Non spécifiée'}</td>
                    <td>${espace.superficie || 'N/A'}</td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Filtrer et rechercher les espaces verts
    function filtrerEspacesVerts() {
        const recherche = $('#search-input').val().toLowerCase();
        const filtreType = $('#filter-type').val();

        const resultats = espacesVerts.filter(espace => {
            const correspondNom = espace.nom.toLowerCase().includes(recherche);
            const correspondType = filtreType ? espace.type === filtreType : true;
            return correspondNom && correspondType;
        });

        afficherEspacesVerts(resultats);
    }

    // Événements pour le filtre et la recherche
    $('#search-input').on('input', filtrerEspacesVerts);
    $('#filter-type').on('change', filtrerEspacesVerts);

    // Afficher les données au chargement de la page
    afficherEspacesVerts(espacesVerts);
});

// Toggle Dark Mode
$('#dark-mode-toggle').on('click', function() {
    $('body').toggleClass('dark-mode');
    const isDarkMode = $('body').hasClass('dark-mode');
    $(this).html(isDarkMode ? '<i class="fas fa-sun"></i> Mode clair' : '<i class="fas fa-moon"></i> Mode sombre');
});
