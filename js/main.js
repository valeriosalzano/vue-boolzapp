const { createApp } = Vue

  createApp({
    data() {
      return {
        contacts: {...contacts},
        selected: 0,
      }
    },
    methods: {
      clickOnContact(index){
        this.selected = index;
      },
      getMsgTime(message){
        // data in dd/mm/yyyy bisogna riordinare per ottenere mm/dd/yyyy
        let msgDate = message.date;
        msgDate = msgDate.split('/');
        msgDate = msgDate[1]+'/'+msgDate[0]+'/'+msgDate[2];
        // data riordinata
        msgDate = new Date (msgDate);
        msgDate = msgDate.getHours()+':'+msgDate.getMinutes();
        return msgDate;
      },
      getLastMsgTime(index){
        let msg = contacts[index].messages[this.contacts[index].messages.length-1];
        return this.getMsgTime(msg);
      },
    }
  }).mount('#app');