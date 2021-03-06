const people = [
	{ name: 'Војислав Шешељ', gender: 'm' },
	{ name: 'Александар Вучић', gender: 'm' },
	{ name: 'Томислав Николић', gender: 'm' },
	{ name: 'Небојша Човић', gender: 'm' },
	{ name: 'Слободан Милошевић', gender: 'm' },
	{ name: 'Млађан Динкић', gender: 'm' },
	{ name: 'Војислав Коштуница', gender: 'm' },
	{ name: 'Јосип Броз Тито', gender: 'm' },
	{ name: 'Мило Ђукановић', gender: 'm' },
	{ name: 'Момир Булатовић', gender: 'm' },
	{ name: 'Весли Кларк', gender: 'm' },
	{ name: 'Жак Ширак', gender: 'm' },
	{ name: 'Борис Тадић', gender: 'm' },
	{ name: 'Драган Ђилас', gender: 'm' },
	{ name: 'Џастин Бибер', gender: 'm' },
	{ name: 'Тејлор Свифт', gender: 'f' },
	{ name: 'Мадлен Олбрајт', gender: 'f' },
	{ name: 'Наташа Кандић', gender: 'f' },
	{ name: 'Весна Пешић', gender: 'f' },
	{ name: 'Карла Дел Понте', gender: 'f' },
	{ name: 'Маја Гојковић', gender: 'f' },
	{ name: 'Јелена Милић', gender: 'f' },
	{ name: 'Мариника Тепић', gender: 'f' },
	{ name: 'Ана Брнабић', gender: 'f' },
	{ name: 'Јоргованка Табаковић', gender: 'f' },
	{ name: 'Зорана Михајловић', gender: 'f' },
	{ name: 'Колинда Грабар-Китаровић', gender: 'f' },
	{ name: 'Јован Павле Други', gender: 'm' },
	{ name: 'Цане Суботић', gender: 'm' },
	{ name: 'Стипе Месић', gender: 'm' },
	{ name: 'Милорад Додик', gender: 'm' },
	{ name: 'Небојша Стефановић', gender: 'm' },
	{ name: 'Синиша Мали', gender: 'm' },
	{ name: 'Братислав Гашић', gender: 'm' },
	{ name: 'Теодор Мерон', gender: 'm' },
	{ name: 'Бил Клинтон', gender: 'm' },
	{ name: 'Зоран Бабић', gender: 'm' },
	{ name: 'Александар Мартиновић', gender: 'm' },
	{ name: 'Зоран Кесић', gender: 'm' },
	{ name: 'Сергеј Трифуновић', gender: 'm' },
	{ name: 'Саша Јанковић', gender: 'm' },
	{ name: 'Алија Изетбеговић', gender: 'm' },
	{ name: 'Фрањо Туђман', gender: 'm' },
	{ name: 'Саша Радуловић', gender: 'm' },
	{ name: 'Хавијер Солана', gender: 'm' },
	{ name: 'Тони Блер', gender: 'm' },
	{ name: 'Борис Јељцин', gender: 'm' },
	{ name: 'Хелмут Кол', gender: 'm' },
	{ name: 'Вук Драшковић', gender: 'm' },
	{ name: 'Алфонс Ори', gender: 'm' }
];

const titles = [
	{
		gendered: false,
		word_main: 'мудо',
		gender_main: 'n',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'курва',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'копиле',
		gender_main: 'n',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'шпијун',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: true,
		word_main: 'издајник',
		gender_main: 'm',
		word_alt: 'издајница',
		gender_alt: 'f'
	},
	{
		gendered: false,
		word_main: 'усташа',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: true,
		word_main: 'кагебеовац',
		gender_main: 'm',
		word_alt: 'кагебеовка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'провокатор',
		gender_main: 'm',
		word_alt: 'провокаторка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'вепар',
		gender_main: 'm',
		word_alt: 'крмача',
		gender_alt: 'f'
	},
	{
		gendered: false,
		word_main: 'говно',
		gender_main: 'n',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: true,
		word_main: 'пицопевац',
		gender_main: 'm',
		word_alt: 'пицопевка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'говнар',
		gender_main: 'm',
		word_alt: 'говнарка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'плаћеник',
		gender_main: 'm',
		word_alt: 'плаћеница',
		gender_alt: 'f'
	},
	{
		gendered: false,
		word_main: 'караконџула',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'масон',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'пичкица',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'утвара',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: true,
		word_main: 'гробар',
		gender_main: 'm',
		word_alt: 'гробарка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'педер',
		gender_main: 'm',
		word_alt: 'лезбејка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'лезбача',
		gender_main: 'f',
		word_alt: 'педерчина',
		gender_alt: 'f'
	},
	{
		gendered: false,
		word_main: 'хуља',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'љига',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'дупелизац',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'гмаз',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'дегенерик',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'протува',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'пудлица',
		gender_main: 'f',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'мамлаз',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: false,
		word_main: 'испрдак',
		gender_main: 'm',
		word_alt: '',
		gender_alt: ''
	},
	{
		gendered: true,
		word_main: 'сексуални манијак',
		gender_main: 'm',
		word_alt: 'нимфоманка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'пацов',
		gender_main: 'm',
		word_alt: 'пацовка',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'мајмун',
		gender_main: 'm',
		word_alt: 'мајмуница',
		gender_alt: 'f'
	},
	{
		gendered: true,
		word_main: 'ћуран',
		gender_main: 'm',
		word_alt: 'ћурка',
		gender_alt: 'f'
	},

    //! added
    {
        gendered: true,
        word_main: "магарац",
        gender_main: "m",
        word_alt: "магарица",
        gender_alt: "f"
    },
    {
        gendered: true,
        word_main: "во",
        gender_main: "m",
        word_alt: "крава",
        gender_alt: "f"
    },
    {
        gendered: true,
        word_main: "коњ",
        gender_main: "m",
        word_alt: "кобила",
        gender_alt: "f"
    },
    {
        gendered: true,
        word_main: "кер",
        gender_main: "m",
        word_alt: "керуша",
        gender_alt: "f"
    },
    {
        gendered: false,
        word_main: "куче",
        gender_main: "n",
        word_alt: "",
        gender_alt: ""
    }
];

const adjectives = [
	{ m: 'кенгуров', f: 'кенгурова', n: 'кенгурово' },
	{ m: 'смежурани', f: 'смежурана', n: 'смежурано' },
	{ m: 'цијин', f: 'цијина', n: 'цијино' },
	{ m: 'мосадов', f: 'мосадова', n: 'мосадово' },
	{ m: 'комунистички', f: 'комунистичка', n: 'комунистичко' },
	{ m: 'издајнички', f: 'издајничка', n: 'издајничко' },
	{ m: 'масонски', f: 'масонска', n: 'масонско' },
	{ m: 'мафијашки', f: 'мафијашка', n: 'мафијашко' },
	{ m: 'римокатолички', f: 'римокатоличка', n: 'римокатоличко' },
	{ m: 'хрватски', f: 'хрватска', n: 'хрватско' },
	{ m: 'балијски', f: 'балијска', n: 'балијско' },
	{ m: 'ватикански', f: 'ватиканска', n: 'ватиканско' },
	{ m: 'дубокодржавни', f: 'дубокодржавна', n: 'дубокодржавно' },
	{ m: 'амерички', f: 'америчка', n: 'америчко' },
	{ m: 'империјалистички', f: 'империјалистичка', n: 'империјалистичко' },
	{ m: 'пропали', f: 'пропала', n: 'пропало' },
	{ m: 'распали', f: 'распала', n: 'распало' },
	{ m: 'смрдљиви', f: 'смрдљива', n: 'смрдљиво' },
	{ m: 'шугави', f: 'шугава', n: 'шугаво' },
	{ m: 'белосветски', f: 'белосветска', n: 'белосветско' },
	{ m: 'недојебани', f: 'недојебана', n: 'недојебано' },
	{ m: 'секташки', f: 'секташка', n: 'секташко' },
	{ m: 'злочиначки', f: 'злочиначка', n: 'злочиначко' },
	{ m: 'подмукли', f: 'подмукла', n: 'подмукло' },
	{ m: 'корумпирани', f: 'корумпирана', n: 'корумпирано' },
	{ m: 'очерупани', f: 'очерупана', n: 'очерупано' },
	{ m: 'нарогушени', f: 'нарогушена', n: 'нарогушено' },
	{ m: 'вашљиви', f: 'вашљива', n: 'вашљиво' },

    //! added
    { m: "мајмунски", f: "мајмунска", n: "мајмунско" },
    { m: "пичкарски", f: "пичкарска", n: "пичкарско" },
    { m: "брзоброђански", f: "брзоброђанска", n: "брзоброђанско" },
    { m: "српски", f: "српска", n: "српско" },
    { m: "блатњави", f: "блатњава", n: "блатњаво" },
    { m: "пичкарасти", f: "пичкараста", n: "пичкарасто" },
    { m: "свемирски", f: "свемирска", n: "свемирско" },
    { m: "овоземаљски", f: "овоземаљска", n: "овоземаљско" }
];

const image = [
	"https://i.imgur.com/iIJIFGu.png",
	"https://i.imgur.com/g5iQUIK.jpg",
	"https://i.imgur.com/LZ5H2yz.png",
	"https://i.imgur.com/TMh5nUk.jpg",
	"https://i.imgur.com/pgWECGh.png",
	"https://i.imgur.com/RKfYFzd.jpg",
	"https://i.imgur.com/JJMvsIL.jpg",
	"https://i.imgur.com/rXCQb27.jpg",
	"https://i.imgur.com/gIgyjbf.jpg",
	"https://i.imgur.com/mN1IIol.png"
];

module.exports = { people, titles, adjectives, image };