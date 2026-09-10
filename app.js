const questions = [
  ['Histoire','En quelle année est tombé le mur de Berlin ?',['1989','1979','1991','1985'],0,25],
  ['Géographie','Quel fleuve traverse la ville de Budapest ?',['Le Danube','Le Rhin','La Volga','Le Dniepr'],0,20],
  ['Musique','Quel groupe a composé « Bohemian Rhapsody » ?',['Queen','The Beatles','Pink Floyd','ABBA'],0,18],
  ['Art','Qui a peint « La Nuit étoilée » ?',['Vincent van Gogh','Claude Monet','Paul Cézanne','Edvard Munch'],0,22],
  ['Cinéma','Quel film a remporté l’Oscar du meilleur film en 2024 ?',['Oppenheimer','Barbie','Anatomie d’une chute','Pauvres créatures'],0,40],
  ['Sciences','Quel est le symbole chimique de l’or ?',['Au','Ag','Fe','Or'],0,16],
  ['Littérature','Qui a écrit « Le Comte de Monte-Cristo » ?',['Alexandre Dumas','Victor Hugo','Émile Zola','Honoré de Balzac'],0,30],
  ['Sport','Dans quel pays sont nés les Jeux olympiques antiques ?',['Grèce','Italie','Égypte','Turquie'],0,24],
  ['Nature','Quel est le plus grand océan du monde ?',['Le Pacifique','L’Atlantique','L’Indien','L’Arctique'],0,28],
  ['Histoire','Quel traité a mis fin à la Première Guerre mondiale ?',['Le traité de Versailles','Le traité de Rome','Le traité de Maastricht','Le traité de Tordesillas'],0,45],
  ['Architecture','Quelle ville abrite la Sagrada Família ?',['Barcelone','Madrid','Séville','Valence'],0,26],
  ['Cuisine','De quel pays le sushi est-il originaire ?',['Japon','Chine','Corée du Sud','Thaïlande'],0,20],
  ['Philosophie','Qui a formulé « Je pense, donc je suis » ?',['René Descartes','Socrate','Spinoza','Jean-Paul Sartre'],0,52],
  ['Espace','Quelle planète est surnommée la planète rouge ?',['Mars','Vénus','Jupiter','Mercure'],0,14],
  ['Cinéma','Qui a réalisé le film « In the Mood for Love » ?',['Wong Kar-wai','Akira Kurosawa','Pedro Almodóvar','Park Chan-wook'],0,75],
  ['Géographie','Quel détroit sépare l’Espagne du Maroc ?',['Le détroit de Gibraltar','Le Bosphore','Le détroit de Béring','Le détroit de Magellan'],0,50],
  ['Musique','Quel compositeur a écrit les « Quatre Saisons » ?',['Antonio Vivaldi','Jean-Sébastien Bach','Wolfgang Mozart','Frédéric Chopin'],0,35],
  ['Art','À quel mouvement Salvador Dalí est-il associé ?',['Le surréalisme','Le cubisme','L’impressionnisme','Le fauvisme'],0,47],
  ['Sciences','Comment s’appelle l’unité de mesure de la résistance électrique ?',['L’ohm','Le volt','L’ampère','Le watt'],0,61],
  ['Littérature','Quel auteur a créé le personnage de Raskolnikov ?',['Fiodor Dostoïevski','Léon Tolstoï','Anton Tchekhov','Nicolas Gogol'],0,82]
];
let difficulty=1,index=0,score=0,activeQuestions=[];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const show=id=>{$$('.screen').forEach(x=>x.classList.remove('active'));$('#'+id).classList.add('active'); window.scrollTo(0,0); if(id==='scores') renderScores()};
$$('[data-screen]').forEach(b=>b.onclick=()=>show(b.dataset.screen));
$$('.difficulty-card').forEach(b=>b.onclick=()=>{difficulty=+b.dataset.difficulty;$$('.difficulty-card').forEach(x=>x.classList.toggle('selected',x===b))});
$('#start-btn').onclick=()=>{index=0;score=0;activeQuestions=[...questions]; show('quiz');renderQuestion()};
function renderQuestion(){let q=activeQuestions[index], choices=[q[3],...q[2].map((_,i)=>i).filter(i=>i!==q[3]).slice(0,difficulty)];$('#question-count').textContent=`QUESTION ${String(index+1).padStart(2,'0')} / 20`;$('#progress-bar').style.width=`${(index+1)/20*100}%`;$('#live-score').textContent=String(score).padStart(3,'0');$('#category').textContent=q[0].toUpperCase();$('#coefficient').textContent=`COEF. ${q[4]}`;$('#question-text').textContent=q[1];$('#answers').innerHTML=choices.map((choice,i)=>`<button class="answer" data-i="${choice}"><strong>${'ABCD'[i]}</strong>${q[2][choice]}</button>`).join('');$$('.answer').forEach(b=>b.onclick=()=>answer(+b.dataset.i));}
function answer(choice){let q=activeQuestions[index], btns=$$('.answer'), correct=choice===q[3]; btns.forEach(b=>{b.disabled=true;if(+b.dataset.i===q[3])b.classList.add('correct');if(+b.dataset.i===choice&&!correct)b.classList.add('wrong')});if(correct){score+=q[4];$('#live-score').textContent=String(score).padStart(3,'0')}setTimeout(()=>{index++;index<20?renderQuestion():finish()},700)}
function finish(){let max=questions.reduce((a,q)=>a+q[4],0);$('#final-score').textContent=score;$('#max-score').textContent=max;let ratio=score/max;$('#result-title').textContent=ratio>.75?'Impressionnant.':ratio>.45?'Belle traversée.':'La curiosité est lancée.';$('#result-copy').textContent=ratio>.75?'Votre connaissance du monde force l’admiration. Une très belle performance.':ratio>.45?'Vous avez parcouru les savoirs avec une belle curiosité. Prêt à repartir ?':'Chaque réponse est une porte ouverte. Revenez demain pour poursuivre le voyage.';show('result')}
const defaults=[['Camille R.',718],['Nora B.',682],['Thomas L.',645],['Sarah M.',602],['Jules P.',578]];
function getScores(){return JSON.parse(localStorage.getItem('atlas-scores')||'null')||defaults}function renderScores(){let data=getScores().sort((a,b)=>b[1]-a[1]);$('#podium').innerHTML=data.slice(0,3).map((s,i)=>`<div class="podium-card"><span class="place">0${i+1} — AUJOURD’HUI</span><strong>${s[0]}</strong><small>${s[1]} POINTS</small></div>`).join('');$('#ranking-list').innerHTML=data.map((s,i)=>`<div class="rank-row"><span>${String(i+1).padStart(2,'0')}</span><b>${s[0]}</b><span>${s[1]} PTS</span></div>`).join('')}
$('#save-score').onclick=()=>{$('#name-modal').classList.add('show');$('#player-name').focus()};$('.close-modal').onclick=()=>$('#name-modal').classList.remove('show');$('#confirm-score').onclick=()=>{let name=$('#player-name').value.trim()||'Anonyme', data=getScores();data.push([name,score]);localStorage.setItem('atlas-scores',JSON.stringify(data.sort((a,b)=>b[1]-a[1]).slice(0,10)));$('#name-modal').classList.remove('show');show('scores')};
