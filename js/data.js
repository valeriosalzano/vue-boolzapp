const user = {
  name : 'Sofia',
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
    'Ehy',
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