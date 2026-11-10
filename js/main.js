import { videoIgre } from './podaci.js';

// Dohvat elemenata iz DOM-a
const spremnik = document.getElementById('katalog-spremnik');
const praznoStanje = document.getElementById('prazno-stanje');
const brojacZapisa = document.getElementById('brojac-zapisa');
const filterGumbi = document.querySelectorAll('.filter-btn');
const sortGumbi = document.querySelectorAll('.sort-btn');


let aktivnaKategorija = 'sve';
let aktivanSort = 'naziv';


function gradiKarticu(zapis) {
    const kartica = document.createElement('article');
    kartica.classList.add('card');
    
   
    kartica.dataset.id = zapis.id;

    
    if (zapis.vrijednost >= 9.0) {
        kartica.classList.add('istaknuto');
    } else if (zapis.vrijednost < 6.0) {
        kartica.classList.add('zasivljeno');
    }

   
    kartica.innerHTML = `
        <div class="card-image-wrapper">
            <img src="${zapis.slika}" alt="Slika igre: ${zapis.naziv}" loading="lazy">
        </div>
        <div class="card-body">
            <span class="card-category">${zapis.kategorija}</span>
            <h3 class="card-title">${zapis.naziv}</h3>
            <span class="card-value">Ocjena: <strong>${zapis.vrijednost}</strong></span>
            <a href="${zapis.poveznica}" class="card-link" target="_blank" rel="noopener noreferrer">Saznaj više</a>
        </div>
    `;

    return kartica;
}


function prikaziKatalog(podaciZaPrikaz) {
    spremnik.innerHTML = '';

    
    let filtrirani = podaciZaPrikaz;
    if (aktivnaKategorija !== 'sve') {
        filtrirani = podaciZaPrikaz.filter(z => z.kategorija === aktivnaKategorija);
    }

 
    filtrirani.sort((a, b) => {
        if (aktivanSort === 'naziv') {
            return a.naziv.localeCompare(b.naziv);
        } else if (aktivanSort === 'ocjena') {
            return b.vrijednost - a.vrijednost; 
        }
    });

  
    brojacZapisa.textContent = filtrirani.length;

    
    if (filtrirani.length === 0) {
        praznoStanje.classList.remove('hidden');
    } else {
        praznoStanje.classList.add('hidden');
        
        filtrirani.forEach(zapis => {
            const karticaElement = gradiKarticu(zapis);
            spremnik.appendChild(karticaElement);
        });
    }
}


filterGumbi.forEach(gumb => {
    gumb.addEventListener('click', (e) => {
        filterGumbi.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        aktivnaKategorija = e.target.getAttribute('data-kategorija');
        prikaziKatalog(videoIgre);
    });
});


sortGumbi.forEach(gumb => {
    gumb.addEventListener('click', (e) => {
        sortGumbi.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        aktivanSort = e.target.getAttribute('data-sort');
        prikaziKatalog(videoIgre);
    });
});


function testirajPraznoStanje() {
    console.log("Provjera praznog stanja...");
    prikaziKatalog([]);
}



document.addEventListener('DOMContentLoaded', () => {
    prikaziKatalog(videoIgre);
});