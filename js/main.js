const { createApp } = Vue

  createApp({
    data() {
      return {
        contacts,
        selected: 0,
        userMsg : '',
        msgBarPlaceholder : 'Scrivi un messaggio',
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
      }
    }
  }).mount('#app');