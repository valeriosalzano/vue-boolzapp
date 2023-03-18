const { createApp } = Vue

  createApp({
    data() {
      return {
        contacts,
        selected: 0,
        userMsg : '',
        msgBarPlaceholder : 'Scrivi un messaggio',
        searchBarInput : '' ,
        selectedMsg: -1,
        printDateLineVar : '000',
        printDateVar: '',
      }
    },
    methods: {
      // al click dell'utente cambia il contatto mostrato
      clickOnContact(index){
        this.selected = index;
      },
      // funzione che restituisce l'ultimo messaggio scambiato con un contatto
      getLastMsg(contact){
        return contact.messages[contact.messages.length -1];
      },
      // funzione che restituisce solo ora e minuti dalla stringa della data
      getMsgTime(message){
        return luxon.DateTime.fromFormat(message.date,'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
      },
      // funzione che gestisce l'invio di un messaggio
      sendMsg(){
        this.contacts[this.selected].messages.push(
          { 
          date: luxon.DateTime.now().toFormat('d/MM/yyyy HH:mm:ss'),
          message: this.userMsg,
          status: 'sent'
          }
        );
        this.userMsg = '';
        this.autoReply();
        this.goToLastMsg(200);

      },
      // funzione che fa rispondere dopo 1 secondo il contatto con "ok" quando si invia un messaggio
      autoReply(){
        // salvo il selected in una variabile per evitare che il timeout stampi su un contatto diverso
        let selected = this.selected;
        this.msgBarPlaceholder = `${this.contacts[selected].name} sta scrivendo...`;
        setTimeout(()=>{
          this.contacts[selected].messages.push(
            { 
            date: luxon.DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss') ,
            message: 'ok',
            status: 'received'
            }
          );
          this.msgBarPlaceholder = 'Scrivi un messaggio';
        },1000)
        this.goToLastMsg(1200);
      },
      // funzione che gestisce il funzionamento della search bar 
      onContactSearching(){
        if(!this.searchBarInput){
          // caso 1: campo vuoto, scorro tutti i contatti e li rendo visibili
          this.contacts.forEach( contact => contact.visible = true);
        } else {
          // caso 2: scorro la lista, il contatto è visibile se c'è un match nel nome
          this.contacts.forEach( contact => contact.visible = contact.name.match(new RegExp(`${this.searchBarInput}`,'i')))
        }
      },
      // funzione che recupera l'indice del messaggio su cui si clicca rendendo visibile il menu
      clickOnMsg(index){
        this.selectedMsg = index;
      },
      // funzione che elimina il messaggio al click
      clickOnDeleteMsg(index){
        this.contacts[this.selected].messages.splice(index,1);
        this.resetSelectedMsg();
      },
      // funzione che fa scomparire il menu del messaggio
      resetSelectedMsg(){
        this.selectedMsg = -1;
      },
      // funzione che evidenza l'ultimo messaggio scrollando fino a raggiungerlo
      goToLastMsg(timer){
        const lastMsgArray = document.querySelectorAll('.msg');
        const lastMsg =lastMsgArray[lastMsgArray.length-1];
        setTimeout( ()=>{
          lastMsg.scrollIntoView({behavior:"smooth"});
        },timer);
      },
      printDateLine(msg,index){
        if (index == 0){
          this.printDateLineVar = '000';
        }
        let msgDate = luxon.DateTime.fromFormat(msg.date,'dd/MM/yyyy HH:mm:ss').toFormat('dd-MM-yyyy');
        if( this.printDateLineVar != msgDate){
          this.printDateLineVar = msgDate
          return true
        } else {
          return false;
        }
      },
      printDate(msg){
        let date = luxon.DateTime.fromFormat(msg.date,'dd/MM/yyyy HH:mm:ss').toFormat('dd MMM yyyy');
        return date;
      }
    }
  }).mount('#app');