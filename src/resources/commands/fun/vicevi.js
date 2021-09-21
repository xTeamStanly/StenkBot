const kategorije = [
    { ime: "top"      , value: "najbolji"    },
    { ime: "novo"     , value: "najnoviji"   },
    { ime: "babe"     , value: "babe"        },
    { ime: "chuck"    , value: "cak-noris"   },
    { ime: "ciga"     , value: "cigani"      },
    { ime: "crni"     , value: "crni-humor"  },
    { ime: "grafiti"  , value: "grafiti"     },
    { ime: "komp"     , value: "kompjuterski"},
    { ime: "mujo"     , value: "mujo-i-haso" },
    { ime: "narodi"   , value: "narodi"      },
    { ime: "oglasi"   , value: "oglasi"      },
    { ime: "perica"   , value: "perica"      },
    { ime: "pirot"    , value: "pirocanci"   },
    { ime: "plavuse"  , value: "plavuse"     },
    { ime: "policajci", value: "policajci"   },
    { ime: "politicki", value: "politicki"   },
    { ime: "sijalice" , value: "sijalice"    },
    { ime: "svasta"   , value: "svastara"    },
    { ime: "zemun"    , value: "zemunci"     },
    { ime: "zivotinje", value: "zivotinje"   }
];

//TODO
const kategorijeLista =
    "**Vic dana** - Ako ne navedete kategoriju\n" +
    "**Nasumicna Kategorija** - Pogresna kategorija\n\n" +
    "Korišćenje: vic <kategorija>\n" +
    "**• random** - Nasumicna kategorija\n" +
    "**• top** - Najbolji vicevi\n" +
    "**• novo** - Najnoviji vicevi\n" +
    "**• babe** - Vicevi o babama\n" +
    "**• chuck** - Vicevi o Cak Norisu\n" +
    "**• ciga** - Vicevi o Ciganima\n" +
    "**• crni** - Crni Humor\n" +
    "**• grafiti** - Grafiti\n" +
    "**• komp** - Kompjuterski vicevi\n" +
    "**• mujo** - Vicevi o Muji i Hasi\n" +
    "**• narodi** - Vicevi o narodima\n" +
    "**• oglasi** - Oglasi\n" +
    "**• perica** - Vicevi o Perici\n" +
    "**• pirot** - Vicevi o Pirocancima\n" +
    "**• plavuse** - Vicevi o plavusama\n" +
    "**• policajci** - Vicevi o policajcima\n" +
    "**• politicki** - Politicki vicevi\n" +
    "**• sijalice** - Sijalice\n" +
    "**• svasta** - Svastara\n" +
    "**• zemun** - Vicevi o Zemuncima\n" +
    "**• zivotinje** - Zivotinjski vicevi\n";

module.exports = { kategorije, kategorijeLista }