// Función para renderizar el texto latino interactivo
function renderLatinText(wordsData) {
    const container = document.getElementById('latin-text');
    let html = '';
    
    wordsData.forEach((item, index) => {
        // Crea un span para cada palabra con un ID único
        html += `<span class="clickable-word" data-index="${index}" onclick="loadWordData(${index})">${item.word}</span> `;
    });
    
    container.innerHTML = html;
}

// Función que carga los datos al hacer click
function loadWordData(index) {
    // Remover clase activa anterior
    document.querySelectorAll('.clickable-word').forEach(el => el.classList.remove('active'));
    // Añadir clase activa actual
    const wordSpan = document.querySelector(`.clickable-word[data-index="${index}"]`);
    if(wordSpan) wordSpan.classList.add('active');

    const data = window.verseData[index];
    const lang = document.getElementById('lang-select').value; // es, en, zh

    // 1. Análisis Morfológico
    document.getElementById('morph-content').innerHTML = `
        <strong>${data.word}</strong><br>
        <em>${data.morphology[lang]}</em>
    `;

    // 2. Nota Erudita (si existe)
    const noteBox = document.getElementById('scholarly-content');
    if (data.note && data.note[lang]) {
        noteBox.innerHTML = data.note[lang];
    } else {
        noteBox.innerHTML = `<span style="color:#ccc">${lang === 'zh' ? '無特別註釋' : (lang === 'en' ? 'No special note.' : 'Sin nota especial.')}</span>`;
    }
}

// Cargar comentario general al inicio
function loadGeneralCommentary(commentaryObj) {
    const lang = document.getElementById('lang-select').value;
    document.getElementById('commentary-content').innerHTML = commentaryObj[lang];
}

// Listener para cambio de idioma
document.getElementById('lang-select').addEventListener('change', () => {
    // Recargar la palabra seleccionada actualmente si hay una, o resetear
    const activeWord = document.querySelector('.clickable-word.active');
    if (activeWord) {
        loadWordData(activeWord.dataset.index);
    }
    // Recargar comentario general
    loadGeneralCommentary(window.generalCommentary);
});
