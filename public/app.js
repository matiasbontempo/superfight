// const ver = '1.0';

const $refresh = document.querySelector('#refresh');
const $hand = document.querySelector('#hand');

const init = () => {
  drawHand();
  $refresh.addEventListener('click', drawHand);
};

document.addEventListener('DOMContentLoaded', init, false);


const drawWhite = () => {
  const card = whiteDeck[random(whiteDeck.length)];
  $hand.append(whiteCardTemplate(card));
};

const drawBlack = () => {
  const card = blackDeck[random(blackDeck.length)];
  $hand.append(blackCardTemplate(card));
};

const drawHand = () => {
  $hand.innerHTML = null;
  $hand.classList.add('flash');
  drawWhite();
  drawBlack();
  drawBlack();

  setTimeout(showHand, 100);
};


const showHand = () => {
  $hand.classList.remove('flash');
  const hiddenCards = document.querySelectorAll('.hide');
  if (hiddenCards.length) {
    hiddenCards[0].classList.remove('hide');
    setTimeout(showHand, 200);
  }
};

const random = (num) => Math.floor(Math.random() * (num)) + 1;


/* Decks */

const whiteDeck = [
  'Señor malvavisco',
  'Samurai',
  'Bebe de basurero',
  'Pandilla de payasos desquiciados',
  'Dominatrix',
  'Velociraptor',
  'Terminator',
  'Campeon de pelea',
  'Clase de jardín de infantes',
  'Hombre de nieve',
  'Chimpancé',
  'La estatua de la libertad',
  'Madre adolescente',
  'Freddy',
  'Araña vampiro',
  'Jason',
  'Psíquico',
  'Angel',
  'Dragón',
  'Hechicero',
  'Bruce Lee',
  'Oso polar',
  'Dexter',
  'El Diablo',
  'Dementor',
  'Ent (árboles con vida)',
  'Obi Wan Kenobi',
  'El hombre pantufla',
  'Transformer',
  'Elfo doméstico',
  'Odalisca',
  'Frida Khalo',
  'Mona Lisa',
  'Cuasimodo',
  'Kenny',
  'Jony Bravo',
  'Domador de leones',
  'El hijo de Tarzan y Chita',
  'Un limón',
  'Jardinero',
  'Instalador de DirecTV',
  'Locutor',
  'Ingeniero',
  'Programador',
  'Vendedor de metanfetaminas',
  'Botella de moloko con Velocet',
  'Cucurucho de Crema del Espacio',
  'Krusty el payaso',
  'Willy el escoces',
  'El sol',
  'Zeus sin poderes',
  'Sansón rapado',
  'Hércules raquítico',
  'Cruela de Vil',
];

const blackDeck = [
  'Usa zapatos de cemento',
  'Debe crear una amistad con su enemigo antes de matarlo',
  'Usa anteojos de cerveza, literalmente',
  'Puede hacer aparecer cualquier producto de un supermercado',
  'Armado con un rayo congelador',
  'Tiene un ratón en su recto',
  'Con manos de jazz, literalmente',
  'Puede controlar a los animales',
  'Puede controlar a las máquinas',
  'Puede estirar y mover su lengua a voluntad',
  'Hecho de vidrio',
  'Es un bebé',
  'Respira fuego',
  'Usa un jetpack',
  'Tiene orgasmos constantemente',
  'Puede matar con un beso',
  'Control a todos los animales',
  'Controla el magnetismo',
  'Puede estirar y mover su bigote a voluntad',
  'Tiene pies en vez de manos',
  'Puede leer las mentes',
  'En un segway',
  'Super resistencia',
  'Rocía neurotoxinas',
  'Le tiene miedo a su propia sombra',
  'Lanza antigüedades',
  'Puede clonarse (Pero cada clon es la mitad de inteligente que el anterior)',
  'Hecho de ladrillos',
  'Armado con spray pimienta',
  'Controla el clima',
  'Hecho de madera',
  'Armado con una catapulta y municion infinita',
  'Telequinesis',
  'Puede volar cuando nadie mira',
  'Viste un exoesqueleto robótico',
  'Armado con un tridente',
  'Invisible',
  'Tiene una sola pierna',
  'Hecho de agua',
  'En un jetski',
  'Se mueve MUY lento',
  'Tiene piernas de gelatina',
  'Muere al moverse',
  'Puede encender televisores con la mente',
  'Invoca avestruces',
  'No tiene manos',
  'Habla francés',
  'En un helicóptero',
  'Controla un ejército de soldados de juguete',
  'Es transexual',
  'Huele a bebé',
  'Atraviesa paredes',
  'Eyaculador precoz',
];


const whiteCardTemplate = (card) => cardTemplate(card, 'white');
const blackCardTemplate = (card) => cardTemplate(card, 'black');

const cardTemplate = (card, type) => {
  const template = `
  <div class="card ${type} hide">
    <img
      src="./img/${type === 'white' ? 'character' : 'attribute'}.svg"
      alt="${type === 'white' ? 'Personaje' : 'Atributo'}:"
    />
    <span>${card}</span>
  </div>
  `;
  const parser = new DOMParser();
  const doc = parser.parseFromString(template, 'text/html');
  return doc.body.firstChild;
};
