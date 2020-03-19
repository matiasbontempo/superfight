
var db = openDatabase("deck", "1.0", "Mazos de Cartas.", 2 * 1024 * 1024);
var ver = "1.0";

$(document).ready(Init());


function Init() {
	if(!localStorage.getItem("installed")) Install();
	else if(localStorage.getItem("installed") != ver) Reinstall();
	else {
		console.log("App initialized. Lastest version installed (v"+ver+")");
		DrawHand();
	}
	$("header .right").on("click", function(){
		DrawHand();
	});
}

function Install() {

	if(!localStorage.getItem("installed")) {

		console.log("Installing App...");

		var whiteDeck = [
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
			'Cruela de Vil'
		];
		localStorage.setItem("whiteDeckLength", whiteDeck.length);

		var blackDeck = [
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
			"Se mueve MUY lento",
			"Tiene piernas de gelatina",
			"Muere al moverse",
			"Puede encender televisores con la mente",
			"Invoca avestruces",
			"No tiene manos",
			"Habla francés",
			"En un helicóptero",
			"Controla un ejército de soldados de juguete",
			"Es transexual",
			"Huele a bebé",
			"Atraviesa paredes",
			"Eyaculador precoz"
		];
		localStorage.setItem("blackDeckLength", blackDeck.length);

		db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS whiteDeck (id INTEGER PRIMARY KEY, text)");
			tx.executeSql("CREATE TABLE IF NOT EXISTS blackDeck (id INTEGER PRIMARY KEY, text)");

			for(var i = 0; i < whiteDeck.length; i++) {
				tx.executeSql("INSERT INTO whiteDeck (text) VALUES ('"+whiteDeck[i]+"')");
			}

			for(var i = 0; i < blackDeck.length; i++) {
				tx.executeSql("INSERT INTO blackDeck (text) VALUES ('"+blackDeck[i]+"')");
			}

		});

	//	localStorage.setItem("whiteDeck", JSON.stringify(whiteDeck));
		localStorage.setItem("installed", ver);

		console.log("Installed!");

	} else {
		console.warn("App is already installed.");
	}
}

function Uninstall() {
	if(!localStorage.getItem("installed")) {
		console.warn("Can't uninstall. App is not installed.");
		return;
	}
	db.transaction(function(tx){
		console.log("Uninstalling App...");
		tx.executeSql("DROP TABLE IF EXISTS whiteDeck");
		tx.executeSql("DROP TABLE IF EXISTS blackDeck");
		localStorage.removeItem("whiteDeckLength");
		localStorage.removeItem("blackDeckLength");
		localStorage.removeItem("installed");
		console.log("Uninstalled!");
	});
}

function Reinstall() {
	console.warn("New version detected. Reinstalling...");
	Uninstall();
	setTimeout(Install, 500);
}

function GetWhiteCards() {
	if(!localStorage.getItem("installed")) {
		console.warn("App is not installed.");
		return;
	}
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM whiteDeck", [], function(tx, results){
			for (var i = 0; i < results.rows.length; i++) {
				console.log(results.rows.item(i).text);
			}
		}, null);
	});
}

function GetBlackCards() {
	if(!localStorage.getItem("installed")) {
		console.warn("App is not installed.");
		return;
	}
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM blackDeck", [], function(tx, results){
			for (var i = 0; i < results.rows.length; i++) {
				console.log(results.rows.item(i).text);
			}
		}, null);
	});
}

function GetWhite() {
	if(!localStorage.getItem("installed")) {
		console.warn("App is not installed.");
		return;
	}
	db.transaction(function(tx){
		var rndID = Random(localStorage.getItem("whiteDeckLength"));
		tx.executeSql("SELECT * FROM whiteDeck WHERE id = '"+rndID+"'", [], function(tx, r){
			$('.mano').append('<div class="carta blanca hide"><i class="logo personaje"></i>'+r.rows.item(0).text+'</div>');
			console.log(r.rows.item(0).text);
		});
	});
}

function GetBlack() {
	if(!localStorage.getItem("installed")) {
		console.warn("App is not installed.");
		return;
	}
	db.transaction(function(tx){
		var rndID = Random(localStorage.getItem("blackDeckLength"));
		tx.executeSql("SELECT * FROM blackDeck WHERE id = '"+rndID+"'", [], function(tx, r){
			$('.mano').append('<div class="carta negra hide"><i class="logo atributo"></i>'+r.rows.item(0).text+'</div>');
			console.log(r.rows.item(0).text);
		});
	});
}

function DrawHand() {
	$('.mano').empty().addClass("flash");
	GetWhite();
	GetBlack();
	GetBlack();

	setTimeout(ShowHand, 100);
}

function ShowHand() {
	if ($(".carta").hasClass("hide")) {
		setTimeout(ShowHand, 200);
	}
	$(".hide").first().removeClass("hide");
	$(".flash").removeClass("flash");
}

function Random(num) {

	return Math.floor(Math.random()*(num)) + 1;
}