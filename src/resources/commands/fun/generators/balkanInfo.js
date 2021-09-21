const output = [
    "[grupa] su u [vek] [adjective] upali u [lokacija] i potpuno je očistili od [victims] ostavljajući za sobom samo [ostaci]!",
    "[vrstaLobija] lobi preti da [uradi] [kome].",
    "Moć [sila] opada, [jado] će biti nova svetska sila!",
    "[urucan] je u rukama [rucan] koji [staCe].",
    "[znalac] je znao istinu o [znanje] i zbog toga su ga ubili!",
    "Kod nas su [losUzor] uzor mladima, a za [dobarUzor] niko nije ni čuo!",
    "[zlocinac] je srpski heroj, a oni koji ga osporavaju [osporavaci]!",
    "Život u [mesto] me je naučio mnogo toga.",
    "Ratovi kakve poznajemo će nestati. U budućnosti će se ratovati za [plen]!",
    "[neki] su devedesetih bar imali [nauk] iz čega su mogli nešto da nauče. Danas imaju samo [nenauk].",
    "[mocni] žele da nas [nagrde]! Može nas zaštiti jedino [zastitnik]!"
];

const grupa = [
    "Lužički Srbi",
    "Hrvati",
    "Muslimani",
    "Migranti",
    "Komunisti",
    "Vanzemaljci",
    "Vampiri",
    "Šiptari",
    "Amerikanci",
    "Englezi",
    "Vlasi",
    "Turci",
    "Masoni",
    "Ustaše",
    "Bugari",
    "Mađari",
    "Satanisti",
    "Rotšildi",
    "Katolici",
    "Cincari",
    "Pederi",
    "Ljudi-gušteri",
    "Germani",
    "Sasi",
    "Demoni",
    "Jezuiti",
    "Dušmani",
    "Titovi partizani",
    "Džihadisti",
    "Milogorci",
    "Templari",
    "Ugari",
    "Drevne Maje",
    "Ratnici Atlantide",
    "Bunjevci",
    "Rusini",
    "Orci",
    "Lanisteri",
    "Dotraci",
    "Satanisti"
];

const lokacija = [
    "Srbiju",
    "Rašku",
    "Bosnu",
    "Hercegovinu",
    "Peštersku visoravan",
    "Šumadiju",
    "Vlašku",
    "Svetu zemlju",
    "Travuniju",
    "Zetu",
    "Crnu Goru",
    "Bukovicu",
    "Dalmaciju",
    "Ugarsku",
    "Bačku",
    "Lombardiju",
    "Transilvaniju",
    "Bosansku Krajinu",
    "Krajinu",
    "Kninsku Krajinu",
    "Negotinsku Krajinu",
    "Anadoliju",
    "Slavoniju",
    "Makedoniju",
    "Tesaliju",
    "Vizantiju",
    "Kosovsku Mitrovicu",
    "Rudnu Glavu",
    "Rusiju",
    "Kinu",
    "Italiju",
    "Grčku",
    "Staru Hercegovinu",
    "Malu Aziju",
    "Kosovsku dolinu",
    "Preševsku dolinu",
    "Panonsku niziju",
    "Antiohiju",
    "Metohiju",
    "Pomeraniju",
    "dolinu Neretve",
    "dolinu Velike Morave",
    "dolinu Ibra",
    "Istru",
    "dalmatinsku Zagoru"
];

const adjective = [
    "na prepad",
    "krvnički",
    "tajno",
    "pod okriljem noći",
    "iznenadno",
    "furiozno",
    "sa podrškom Zapada",
    "bez znanja Rusije",
    "uz pomoć Pape",
    "sa blagoslovom Pape",
    "bez odobrenja Crkve",
    "sa blagoslovom Pape",
    "sa odobrenjem Kominterne",
    "ubijajući sve pred sobom",
    "pljačkajući i paleći"
];

const victims = [
    "Srba",
    "pravoslavaca",
    "srpskog življa",
    "pravoslavnog življa",
    "hrišćana",
    "svih pravoslavnih naroda",
    "Rusa",
    "vernika",
    "pravoslavnog sveštenstva",
    "sveštenstva",
    "srpskih domaćina",
    "bogumila",
    "intelektualaca onog doba"
];

const vek = [
    "1. veku",
    "2. veku",
    "3. veku",
    "4. veku",
    "5. veku",
    "6. veku",
    "7. veku",
    "8. veku",
    "9. veku",
    "10. veku",
    "11. veku",
    "12. veku",
    "13. veku",
    "14. veku",
    "srednjem veku",
    "1. veku pre nove ere",
    "2. veku pre nove ere",
    "3. veku pre nove ere",
    "4. veku pre nove ere",
    "5. veku pre nove ere",
    "doba krstaških ratova",
    "doba turske invazije na Balkan",
    "između dva rata",
    "vreme Seobe naroda",
    "tokom 2. svetskog rata",
    "tokom 1. svetskog rata",
    "tokom rata u Jugoslaviji",
    "vreme revolucije u Rusiji",
    "vreme francuske revolucije"
];

const ostaci = [
    "kosti žrtava",
    "plač udovica",
    "plač unesrećenih majki",
    "bol",
    "patnju",
    "bol i patnju",
    "pepeo",
    "pepeo i dim",
    "krvave tragove",
    "nesreću",
    "tragove zločina",
    "smrt",
    "smrad leševa",
    "tugu"
];

const vrstaLobija = [
    "Soroševski",
    "Masonski",
    "Gej",
    "Jezuitski",
    "Migrantski",
    "Šiptarski",
    "Neokomunistički",
    "Neoboljševički",
    "Klintonov",
    "Vakserski",
    "Vakcinaški",
    "Korona",
    "Pandemijski",
    "Gejtsov",
    "Udbaški",
    "Judeomasonski",
    "Malinarski",
    "Albanski",
    "Vučićev",
    "Đilasov",
    "Tačijev",
    "Hotijev",
    "Kosovski",
    "Kominternin",
    "Islamistički",
    "Jevrejski",
    "Bošnjački",
    "Satanistički",
    "Pedofilski",
    "Eko-fašistički",
    "Feministički",
    "Femi-nacistički",
    "Milogorski",
    "Reptilski",
    "Rijaliti",
    "Vatikanski",
    "Vanzemaljski",
    "Autošovinistički"
];

const uradi = [
    "uništi",
    "porazi",
    "pregazi",
    "potrese",
    "zgazi",
    "zatruje",
    "satre",
    "potpuno poremeti",
    "onesposobi",
    "destabilizuje",
    "zapali",
    "proguta"
];

const kome = [
    "planetu",
    "Evropu",
    "belu civilizaciju",
    "belu Evropu",
    "Evropu kakvu poznajemo",
    "svet kakav poznajemo",
    "pravoslavlje",
    "hrišćanstvo",
    "hrišćanski svet",
    "pravoslavni svet",
    "hrišćansku civilizaciju",
    "Srbiju",
    "Rusiju",
    "Vladimira Putina",
    "Aleksandra Vučića",
    "slovenski svet",
    "slovensku dušu",
    "svetski mir",
    "mir na Balkanu",
    "čovečanstvo",
    "državu",
    "čitav svet",
    "istinu",
    "Republiku Srpsku",
    "srpski narod",
    "srpski rod",
    "sve Srbe",
    "Srbe širom sveta",
    "srpsku dijasporu"
];

const urucan = [
    "Planeta",
    "SAD",
    "EU",
    "Bivša Jugoslavija",
    "Evropa",
    "Civilizovana Evropa",
    "Srbija",
    "Rusija",
    "Država",
    "Republika Srpska",
    "BiH",
    "Srpska dijaspora"
];

const rucan = [
    "Amerikanaca",
    "svetskih moćnika",
    "Sataninih slugu",
    "satanista",
    "duboke države",
    "bogataša",
    "milionera",
    "komunista",
    "zlobnika",
    "nevernika",
    "ateista",
    "filozofa",
    "antihrista",
    "boljševika",
    "neprijatelja",
    "Lenjinovih sledbenika",
    "sila tame",
    "sila zla",
    "udbaških sinova",
    "homoseksualaca",
    "Klintonovih",
    "Jevreja",
    "judeomasona",
    "hipstera",
    "mondijalista",
    "feminista"
];

const sila = [
    "SAD",
    "Amerike",
    "Rusije",
    "EU",
    "Velike Britanije",
    "NATO-a",
    "Zapada",
    "naftaša",
    "masona",
    "Vatikana"
];

const jado = [
    "Srbija",
    "Crna Gora",
    "Velika Albanija",
    "Kosovo",
    "Rumunija",
    "Bugarska",
    "Surinam",
    "Jermenija",
    "Republika Srpska",
    "srpska Crna Gora",
    "Farska Ostrva",
    "Tanzanija",
    "Zajednica pravoslavnih država",
    "Kraljevina Srbija",
    "Albanija",
    "Togo",
    "Fidži",
    "Belorusija",
    "Severna Koreja",
    "Pakistan",
    "obnovljeno Rimsko carstvo",
    "obnovljena Vizantija",
    "obnovljena RSK"
];

const staCe = [
    "joj ne žele dobro",
    "prete da je unište",
    "nemaju dobre namere",
    "ne smeraju ništa plemenito",
    "nemaju nameru da se zaustave",
    "će joj doći glave",
    "se moraju zaustaviti"
];

const znalac = [
    "Nikola Tesla",
    "Slobodan Milošević",
    "Kralj Aleksandar",
    "Knez Mihajlo",
    "Čiča Draža",
    "Đani Versaće",
    "Ljubiša Stojanović Luis",
    "Arkan",
    "Knele",
    "Krcun",
    "Džemal Bijedić",
    "Dragiša Kašiković",
    "Zoran Đinđić",
    "Džej",
    "Ivan Stambolić",
    "Slavko Ćuruvija",
    "Če Gevara",
    "Mustafa Golubić",
    "Apis",
    "Stinger Bell",
    "Lord Džon Erin",
    "Moamer Gadafi",
    "Gandi"
];

const znanje = [
    "zlatnoj milijardi",
    "bosanskim piramidama",
    "bunga-bunga žurkama",
    "putovanju na Mesec",
    "putovanju kroz vreme",
    "crnom Papi",
    "slučaju Gajdobra",
    "pravom Josipu Brozu",
    "Isusovoj ruci",
    "vanzemaljskim civilizacijama",
    "tajnim bazama na Antarktiku",
    "ravnoj Zemlji",
    "svetom gralu",
    "lažnoj teoriji evolucije",
    "tajni sibirske katastrofe",
    "Teslinim zracima smrti",
    "Hitlerovom tajnom oružju",
    "Longinovom koplju",
    "vremenskim kapijama",
    "tragovima u žitu",
    "propasti majanske civilizacije",
    "večnom životu Dragoljuba Mićunovića",
    "Bermudskom trouglu",
    "Atlantidi",
    "Titovom svemirskom programu",
    "mutantima iz Černobilja",
    "tajnom ratu na Antarktiku",
    "tajnama planine Rtanj",
    "tajnom životu biljaka"
];

const losUzor = [
    "sponzoruše",
    "splavarke",
    "rijaliti zvezde",
    "elitne prostitutke",
    "kriminalci",
    "satanizovane lezbejke",
    "homoseksualci",
    "gej-lobisti",
    "zvezde Parova i Zadruge",
    "preplaćeni fudbaleri",
    "sisate pevaljke",
    "kladioničari",
    "narko trafikanti",
    "vođe navijača koje prodaju drogu",
    "žene od sultana",
    "Buba i Jala",
    "YouTube-eri"
];

const dobarUzor = [
    "Njegoša",
    "Marka Miljanova",
    "Karađorđa",
    "ravnogorske borce",
    "junake sa Košara",
    "junaštvo Miloša Obilića",
    "akciju Koridor",
    "majora Tepića",
    "Gorski Vijenac",
    "Luču Mikrokozma",
    "Desanku Maksimović",
    "Vlada Šipčića",
    "vladiku Nikolaja Velimirovića",
    "Svetog Justina Ćelijskog",
    "kosovski zavet",
    "Nevenu Božović",
    "Hilandar",
    "Gračanicu",
    "Đurđeve Stupove",
    "Studenicu",
    "Žiču",
    "Manasiju",
    "Svetog Savu",
    "Nemanjiće",
    "svetu lozu Nemanjića",
    "govor majora Gavrilovića",
    "kosovske junake",
    "Beogradski sindikat",
    "mlade matematičare",
    "mlade fizičare",
    "mlade šahiste",
    "čojstvo i junaštvo",
    "silazak Hrvata sa postolja '95",
    "Saletovu trojku Hrvatima"
];

const zlocinac = [
    "Ratko Mladić",
    "Radovan Karadžić",
    "Slobodan Milošević",
    "General Pavković",
    "Legija",
    "Arkan",
    "Kapetan Dragan",
    "Mika Aleksić",
    "Knele",
    "Branislav Lečić",
    "Dragan Marković Palma",
    "Skenderbeg"
];

const osporavaci = [
    "mu nisu ni do kolena",
    "su bili i ostali ništarije",
    "su kukavice",
    "nisu vredni pomena",
    "nisu vredni koliko njegov nokat",
    "su izdajnici ovog naroda",
    "su plaćenici bez duše",
    "kriju svoju ulogu u svemu",
    "pokušavaju da operu svoje ruke",
    "će dočekati da im Bog sudi",
    "će dočekati da im narod sudi"
];

const mesto = [
    "Amazoniji",
    "manastiru",
    "Hilandaru",
    "Africi",
    "Sibiru",
    "zatvoru",
    "rijalitiju",
    "džungli",
    "Americi",
    "kolumbijskom zatvoru",
    "pustinji Gobi",
    "Sahari",
    "polarnom krugu",
    "u Legiji Stranaca",
    "sa bivšim agentima KGB",
    "u paklu droge",
    "u kandžama sekte"
];

const plen = [
    "lajkove",
    "subscribe-ere",
    "litijum",
    "vodu",
    "experience poene",
    "vakcine",
    "vazduh",
    "kafu",
    "čokoladu",
    "kesten pire",
    "pesak",
    "bodove na Evroviziji",
    "struju"
];

const neki = [
    "Mladi",
    "Ljudi",
    "Mladi ljudi",
    "Srednjoškolci",
    "Klinci"
];

const nauk = [
    "ratove",
    "sankcije",
    "hiper-inflaciju",
    "Esmeraldu",
    "Ljovisnu",
    "Kasandru",
    "ZAM",
    "Mandine emisije",
    "TV duele Šešelja i Vuka",
    "dens muziku",
    "muziku Ivana Gavrilovića",
    "dokumentarac \"Vidimo se u čitulji\""
];

const neNauk = [
    "rijalitije",
    "Parove",
    "Zadrugu",
    "Zadrugu i Parove",
    "Instagram i TikTok",
    "Jalu i Bubu",
    "Jutjubere"
];

const nagrde = [
    "sve vakcinišu",
    "čipuju",
    "svedu na zlatnu milijardu",
    "drže u zabludi",
    "pretvore u robove",
    "presele u gradove pod zemljom",
    "presele na Antarktik",
    "isele u Saharsku pustinju",
    "siluju ili iskoriste na druge načine"
];

const zastitnik = [
    "Rusija",
    "Putin",
    "Bog",
    "Isus Hrist",
    "vera u Boga",
    "pravoslavlje",
    "vladika Irinej",
    "povratak veri",
    "povratak slovenskim božanstvima",
    "povratak hrišćanstvu",
    "povratak prirodi",
    "Donald Tramp",
    "okretanje pravoslavlju",
    "novi Mesija",
    "potpuno pokoravanje Gospodu",
    "Crkva",
    "formiranje novih četničkih jedinica",
    "restauracija monarhije",
    "vraćanje monarhije",
    "vraćanje Kralja na čelo zemlje",
    "savez sa Rusijom",
    "Viktor Orban"
];

const mocni = [
    "Moćnici",
    "Satanisti",
    "Masoni",
    "Vođe Svetske Vlade",
    "Globalisti"
];

const image = "https://drive.google.com/uc?export=view&id=1bXYEQmPcKc_pgPlHZTYKYkg2Wh17that";

module.exports = {
    output,
    grupa,
    lokacija,
    adjective,
    victims,
    vek,
    ostaci,
    vrstaLobija,
    uradi,
    kome,
    urucan,
    rucan,
    sila,
    jado,
    staCe,
    znalac,
    znanje,
    losUzor,
    dobarUzor,
    zlocinac,
    osporavaci,
    mesto,
    plen,
    neki,
    nauk,
    neNauk,
    nagrde,
    zastitnik,
    mocni,
    image
};