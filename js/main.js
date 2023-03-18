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
        let msgTime = message.date;
        return msgTime.substring(msgTime.length - 8, msgTime.length - 3);
      },
      sendMsg(){
        this.contacts[this.selected].messages.push(
          { 
          date: '10/01/2020 15:30:55',
          message: this.userMsg,
          status: 'sent'
          }
        );
        this.userMsg = '';
        this.autoReply();
      },
      autoReply(){
        // salvo il selected in una variabile per evitare che il timeout stampi su un contatto diverso
        let selected = this.selected;
        this.msgBarPlaceholder = `${this.contacts[selected].name} sta scrivendo...`;
        setTimeout(()=>{
          this.contacts[selected].messages.push(
            { 
            date: '10/01/2020 15:30:55',
            message: 'ok',
            status: 'received'
            }
          );
          this.msgBarPlaceholder = 'Scrivi un messaggio';
        },1000)
      },
      onContactSearching(){
        if(!this.searchBarInput){
          // caso 1: campo vuoto, scorro tutti i contatti e li rendo visibili
          this.contacts.forEach( contact => contact.visible = true);
        } else {
          // caso 2: scorro la lista, il contatto è visibile se c'è un match nel nome
          this.contacts.forEach( contact => contact.visible = contact.name.match(new RegExp(`${this.searchBarInput}`,'i')))
        }
      },
      clickOnMsg(index){
        this.selectedMsg = index;
      },
      clickOnDeleteMsg(index){
        this.contacts[this.selected].messages.splice(index,1);
        this.resetSelectedMsg();
      },
      resetSelectedMsg(){
        this.selectedMsg = -1;
      }
    }
  }).mount('#app');