const user = {
  name : 'Valerio',
  avatar : './img/avatar_io.jpg'
}
const contacts = [
  {
    name: 'Michele',
    avatar: './img/avatar_1.jpg',
    visible: true,
    messages: [
      {
        date: '10/01/2020 15:30:55',
        message: 'Hai portato a spasso il cane?',
        status: 'sent'
      },
      {
        date: '10/01/2020 15:50:00',
        message: 'Ricordati di stendere i panni',
        status: 'sent'
      },
      {
        date: '10/01/2020 16:15:22',
        message: 'Tutto fatto!',
        status: 'received'
      }
    ],
  },
  {
    name: 'Fabio',
    avatar: './img/avatar_2.jpg',
    visible: true,
    messages: [
      {
        date: '20/03/2020 16:30:00',
        message: 'Ciao come stai?',
        status: 'sent'
      },
      {
        date: '20/03/2020 16:30:55',
        message: 'Bene grazie! Stasera ci vediamo?',
        status: 'received'
      },
      {
        date: '20/03/2020 16:35:00',
        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
        status: 'sent'
      }
    ],
  },
  {
    name: 'Samuele',
    avatar: './img/avatar_3.jpg',
    visible: true,
    messages: [
      {
        date: '28/03/2020 10:10:40',
        message: 'La Marianna va in campagna',
        status: 'received'
      },
      {
        date: '28/03/2020 10:20:10',
        message: 'Sicuro di non aver sbagliato chat?',
        status: 'sent'
      },
      {
        date: '28/03/2020 16:15:22',
        message: 'Ah scusa!',
        status: 'received'
      }
    ],
  },
  {
    name: 'Alessandro B.',
    avatar: './img/avatar_4.jpg',
    visible: true,
    messages: [
      {
        date: '10/01/2020 15:30:55',
        message: 'Lo sai che ha aperto una nuova pizzeria?',
        status: 'sent'
      },
      {
        date: '10/01/2020 15:50:00',
        message: 'Si, ma preferirei andare al cinema',
        status: 'received'
      }
    ],
  },
  {
    name: 'Alessandro L.',
    avatar: './img/avatar_5.jpg',
    visible: true,
    messages: [
      {
        date: '10/01/2020 15:30:55',
        message: 'Ricordati di chiamare la nonna',
        status: 'sent'
      },
      {
        date: '10/01/2020 15:50:00',
        message: 'Va bene, stasera la sento',
        status: 'received'
      }
    ],
  },
  {
    name: 'Claudia',
    avatar: './img/avatar_6.jpg',
    visible: true,
    messages: [
      {
        date: '10/01/2020 15:30:55',
        message: 'Ciao Claudia, hai novità?',
        status: 'sent'
      },
      {
        date: '10/01/2020 15:50:00',
        message: 'Non ancora',
        status: 'received'
      },
      {
        date: '10/01/2020 15:51:00',
        message: 'Nessuna nuova, buona nuova',
        status: 'sent'
      }
    ],
  },
  {
    name: 'Federico',
    avatar: './img/avatar_7.jpg',
    visible: true,
    messages: [
      {
        date: '10/01/2020 15:30:55',
        message: 'Fai gli auguri a Martina che è il suo compleanno!',
        status: 'sent'
      },
      {
        date: '10/01/2020 15:50:00',
        message: 'Grazie per avermelo ricordato, le scrivo subito!',
        status: 'received'
      }
    ],
  },
  {
    name: 'Davide',
    avatar: './img/avatar_8.jpg',
    visible: true,
    messages: [
      {
        date: '10/01/2020 15:30:55',
        message: 'Ciao, andiamo a mangiare la pizza stasera?',
        status: 'received'
      },
      {
        date: '10/01/2020 15:50:00',
        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
        status: 'sent'
      },
      {
        date: '10/01/2020 15:51:00',
        message: 'OK!!',
        status: 'received'
      }
    ],
  },
  {
    name: 'chat GPT',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SGq5ryvPkabjn_1Zd0W8cqpOQsH2kzrO61_nyOa_pyzpYcUA7FrrbMixbVBDdsSEX50&usqp=CAU',
    visible: true,
    messages: []
  }
];

const randomReplies = {

  greeting: [
    'Ciao',
    'Hey',
    'Salve',
  ],
  answer: [
    'ok',
    'va bene',
    'no',
    'certo',
    'assolutamente no'
  ],
  randomSentence: [
    '“ Quando dici: << Ho scritto un programma che manda in crash Windows>>, la gente ti guarda stupita e ti dice: <<Hey, ce l\'ho nel sistema, *gratis* >> ”. \n Linus Torvalds.',
    '“Fare il debugging è doppiamente difficile rispetto a scrivere direttamente il codice. Quindi, se scrivi il codice nel miglior modo possibile, sei, per definizione, non abbastanza intelligente per fare il debug.” \n Brian Wilson Kernighan',
    '“I bravi programmatori sanno cosa scrivere. I migliori sanno cosa riscrivere.” \n Eric Steven Raymond',
    '“Dopo aver eseguito il download siete pregati di resettare il sistema premendo l\'apposito pulsante.” \n scritta nel bagno del dipartimento di matematica di Bologna',
    '“Essere in due posti contemporaneamente una volta era una prerogativa dei santi, ora lo fanno anche gli informatici.” \n Piero Angela'
  ]

};

const emojis = [
  0x1F600,
  0x1F601,
  0x1F602,
  0x1F603,
  0x1F604,
  0x1F605,
  0x1F606,
  0x1F607,
  0x1F608,
  0x1F609,
  0x1F60A,
  0x1F60B,
  0x1F60C,
  0x1F60D,
  0x1F60E,
  0x1F60F,
  0x1F610,
  0x1F611,
  0x1F612,
  0x1F613,
  0x1F614,
  0x1F615,
  0x1F616,
  0x1F617,
  0x1F618,
  0x1F619,
  0x1F61A,
  0x1F61B,
  0x1F61C,
  0x1F61D,
  0x1F61E,
  0x1F61F,
  0x1F620,
  0x1F621,
  0x1F622,
  0x1F623,
  0x1F624,
  0x1F625,
  0x1F626,
  0x1F627,
  0x1F628,
  0x1F629,
  0x1F62A,
  0x1F62B,
  0x1F62C,
  0x1F62D,
  0x1F62E,
  0x1F62F,
  0x1F630,
  0x1F631,
  0x1F632,
  0x1F633,
  0x1F634,
  0x1F635,
  0x1F636,
  0x1F637,
  0x1F641,
  0x1F642,
  0x1F643,
  0x1F644,
  0x1F910,
  0x1F911,
  0x1F912,
  0x1F913,
  0x1F914,
  0x1F915,
  0x1F920,
  0x1F921,
  0x1F922,
  0x1F923,
  0x1F924,
  0x1F925,
  0x1F927,
  0x1F928,
  0x1F929,
  0x1F92A,
  0x1F92B,
  0x1F92C,
  0x1F92D,
  0x1F92E,
  0x1F92F,
  0x1F9D0,
];