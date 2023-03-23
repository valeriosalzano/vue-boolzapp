const { createApp } = Vue

  createApp({
    data() {
      return {
        user,
        contacts,
        randomReplies,
        selected:-1,
        userMsg : '',
        msgBarPlaceholder : 'Scrivi un messaggio',
        searchBarInput : '' ,
        OPENAI_API_KEY : "",
        screenWidth : window.screen.availWidth
      }
    },
    mounted(){
      this.hideSplashPage();
    },

    methods: {
      hideSplashPage(){
        const splashPage = document.getElementById('splash-page');
        setTimeout(()=> splashPage.classList.add('d-none'), 1000);
      },
      // al click dell'utente cambia il contatto mostrato
      clickOnContact(index){
        this.selected = index;
        this.resetMsgBarPlaceholder();

        // extra controlli per mobile
        this.screenWidth = window.screen.availWidth;
        if(this.screenWidth < 750){
          this.changePanel()
        }
      },
      changePanel(){
        const left = document.getElementById('left-container');
        const right = document.getElementById('right-container');

        left.classList.toggle('mobile-d-none');
        right.classList.toggle('mobile-d-none');
      },
      // funzione che restituisce la data dell'ultimo accesso
      setLastAccessTime(){
        let index = this.contacts[this.selected].messages.length;
        if (index){
          let message;
          do {
            index --;
            let msg = this.contacts[this.selected].messages[index];
            msg.status == 'received' ? message = msg : ''
          } while ( index > 0)

          if (message){
            let newDate = luxon.DateTime.fromFormat(message.date,'dd/MM/yyyy HH:mm:ss');
            this.contacts[this.selected].lastAccess= `Ultimo accesso ${newDate.toRelativeCalendar()} alle ${newDate.toFormat('HH:mm')}`;
          } else {
            this.contacts[this.selected].lastAccess = 'Ultimo accesso molto tempo fa'
          }
        } else {
          this.contactLastAccess = 'Offline'
        }
      },
      // funzione che restituisce l'ultimo messaggio scambiato con un contatto
      getLastMsg(contact){
        return contact.messages[contact.messages.length -1];
      },
      // funzione che restituisce solo ora e minuti di un messaggio
      getMsgTime(message){
        return luxon.DateTime.fromFormat(message.date,'dd/MM/yyyy HH:mm:ss').toFormat('HH:mm');
      },
      // funzione che restituisce la data completa di un messaggio
      getMsgDate(message){
        return luxon.DateTime.fromFormat(message.date,'dd/MM/yyyy HH:mm:ss').toFormat('dd/MM/yyyy HH:mm');
      },
      // funzione che gestisce l'invio di un messaggio
      sendMsg(){
        if(this.userMsg.trim()){
          if(this.contacts[this.selected].name == 'chat GPT'){
            this.sendMsgToGPT();
            return;
          }
          this.contacts[this.selected].messages.push(
            { 
            date: luxon.DateTime.now().toFormat('d/MM/yyyy HH:mm:ss'),
            message: this.userMsg,
            status: 'sent'
            }
          );
          this.autoReply();
          this.userMsg = '';
          this.goToLastMsg(200);
        }
      },
      // funzione che fa rispondere dopo "reqTime" secondi il contatto con un messaggio randomico quando si invia un messaggio
      autoReply(){
        // salvo il selected in una variabile per evitare che il timeout stampi su un contatto diverso
        let selected = this.selected;

        this.contacts[selected].lastAccess = `${this.contacts[selected].name} sta scrivendo...`;
        this.msgBarPlaceholder = `${this.contacts[selected].name} sta scrivendo...`;
        
        let firstMsgOfTheDay = this.printDateLine(this.contacts[selected].messages[this.contacts[selected].messages.length-1],this.contacts[selected].messages.length-1);
        let isQuestion = this.userMsg.match(/\?$/mg);
        let replyMsg = '';
        // tempo di risposta variabile
        let reqTime = 1;

        // stiamo inviando il primo messaggio del giorno, riceviamo prima un saluto 
        if (firstMsgOfTheDay){
          replyMsg += this.randomReplies.greeting[this.randomNumber(0,2)]+' '+this.user.name;
          reqTime ++;
        };
        // caso 1: abbiamo fatto una domanda ("?" alla fine), riceviamo una risposta randomica
        if (isQuestion){
          replyMsg == '' ? '' : replyMsg+= ', ';
          replyMsg += this.randomReplies.answer[this.randomNumber(0,4)];
          reqTime ++;
        } else {
          // caso 2: frase randomica
          replyMsg == '' ? '' : replyMsg+= '. ';
          replyMsg += 'Senti questa: '
          replyMsg += this.randomReplies.randomSentence[this.randomNumber(0,4)]
          reqTime += 3;
        }

        setTimeout(()=>{
          // la risposta viene stampata nello storico
          this.contacts[selected].messages.push(
            { 
            date: luxon.DateTime.now().toFormat('dd/MM/yyyy HH:mm:ss') ,
            message: replyMsg,
            status: 'received'
            }
          );

          // scorriamo al messaggio ricevuto
          this.goToLastMsg(200)

          // resettiamo il "sta scrivendo..." dopo aver ricevuto risposta e "online" per 2 secondi
          this.msgBarPlaceholder = 'Scrivi un messaggio';
          this.contacts[this.selected].lastAccess = 'online'

          // dopo 2 secondi il contatto non sarà più online
          setTimeout(()=>{
            let newDate = luxon.DateTime.now();
            this.contacts[selected].lastAccess = `Ultimo accesso ${newDate.toRelativeCalendar()} alle ${newDate.toFormat('HH:mm')}`;
          },2000)
        },1000*this.randomNumber(1,reqTime));
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
      // funzione che elimina il messaggio al click
      clickOnDeleteMsg(index){
        this.contacts[this.selected].messages.splice(index,1);
        this.toggleDropdown('messageMenu','close',index);
      },
      /* 
        funzione che mostra/nasconde un menu con classe "menuClass"
        i mouseleave avranno "action" = "close"
        menu su più elementi hanno un "index" per determinare quale dei menu verrà aperto
      */
      toggleDropdown(menuClass,action,index){
        !index ? index = 0 : '';
        const menuArray = document.querySelectorAll(`.${menuClass} .menu`);
        const menu = menuArray[index];
        if(action == 'close'){
          menu.classList.add('d-none')
        } else {
          menu.classList.toggle('d-none');
        }
      },
      // funzione che al click cancella tutti i messaggi scambiati con il contatto
      clickOnDeleteAllMessages(){
        this.contacts[this.selected].messages = [];
        this.toggleDropdown('contactOptionsMenu');
      },
      // funzione che al click cancella i dati della chat e del contatto
      clickOnDeleteContact(){
        this.contacts.splice(this.selected,1);
        // gestione casi limite primo contatto o ultimo eliminato
        this.selected == 0 ? '' : this.selected --;
        this.toggleDropdown('contactOptionsMenu');

        // extra controlli per mobile
        let screenWidth = window.screen.availWidth;
        if(screenWidth < 750){
          this.changePanel()
        }
      },
      // funzione che gestisce l'inserimento di un nuovo contatto
      clickOnAddContact(){
        const name = document.getElementById('newContactName');
        const link = document.getElementById('newContactLink');
        if (name.value.trim()){
          let avatar = link.value.trim()? link.value : './img/unknown.png';
          this.contacts.push(
            {
              name: name.value,
              avatar,
              visible: true,
              messages: []
            }
          )
          name.value = '';
          link.value = '';
          this.toggleDropdown('newContactMenu')
        }
      },
      // funzione che resetta il placeholder per la #msg-bar
      resetMsgBarPlaceholder(){
        this.msgBarPlaceholder = 'Scrivi un messaggio';
      },
      // funzione che evidenzia l'ultimo messaggio scrollando fino a raggiungerlo
      goToLastMsg(timer){
        setTimeout( ()=>{
          const lastMsgArray = document.querySelectorAll('.msg');
          const lastMsg =lastMsgArray[lastMsgArray.length-1];
          lastMsg.scrollIntoView({behavior:"smooth"});
        },timer);
      },
      // funzione che determina se è il primo messaggio del giorno per stamparne sopra la data
      printDateLine(msg,index){
        let msgDate = luxon.DateTime.fromFormat(msg.date,'dd/MM/yyyy HH:mm:ss').toFormat('dd-MM-yyyy');
        if (index == 0){
          return true;
        }
        let prevMsg = this.contacts[this.selected].messages[index-1];
        let prevMsgDate = luxon.DateTime.fromFormat(prevMsg.date,'dd/MM/yyyy HH:mm:ss').toFormat('dd-MM-yyyy');
        return prevMsgDate != msgDate;
      },
      // funzione che stampa la data di un "message" in formato giorno/mese/anno
      printDate(message){
        let date = luxon.DateTime.fromFormat(message.date,'dd/MM/yyyy HH:mm:ss').setLocale('it').toFormat('dd MMMM yyyy');
        return date;
      },
      // funzione che restituisce un numero randomico compreso tra min e max
      randomNumber(min,max){
        return Math.floor(Math.random()*(max - min +1)+min);
      },
      // funzione per lo scambio di messaggi con chat gpt
      sendMsgToGPT() {
        let that = this;
        var sQuestion = this.userMsg;

        // stampo il messaggio che ho inviato a chat gpt
        this.contacts[this.selected].messages.push(
          { 
          date: luxon.DateTime.now().toFormat('d/MM/yyyy HH:mm:ss'),
          message: this.userMsg,
          status: 'sent'
          }
        );
        this.userMsg = '';

        // se manca l'api key indico cosa fare all'user
        if (this.OPENAI_API_KEY == ''){
          this.contacts[this.selected].messages.push(
            { 
            date: luxon.DateTime.now().toFormat('d/MM/yyyy HH:mm:ss'),
            message: 'Per utilizzare questa chat inserisci la tua OPENAI_API_KEY nella variabile corrispondente.',
            status: 'received'
            }
          );
          return;
        }

        // variabile d'appogggio per testo AI
        let txtOutput = '';

        let oHttp = new XMLHttpRequest();
        oHttp.open("POST", "https://api.openai.com/v1/completions");
        oHttp.setRequestHeader("Accept", "application/json");
        oHttp.setRequestHeader("Content-Type", "application/json");
        oHttp.setRequestHeader("Authorization", "Bearer " + this.OPENAI_API_KEY);
    
        oHttp.onreadystatechange = function () {
          if (oHttp.readyState === 4) {
              //console.log(oHttp.status);
              let oJson = {}
              if (txtOutput != "") txtOutput += "\n";
  
              try {
                  oJson = JSON.parse(oHttp.responseText);
              } catch (ex) {
                  txtOutput += "Error: " + ex.message
              }
  
              if (oJson.error && oJson.error.message) {
                  txtOutput += "Error: " + oJson.error.message;
              } else if (oJson.choices && oJson.choices[0].text) {
                  let s = oJson.choices[0].text;
                  let a = s.split("?\n");
                  
                  if (a.length == 2) {
                      s = a[1];
                  }

                  if (s == "") s = "No response";
                  
                  txtOutput += s;

                  // stampiamo quel che ha detto GPT
                  that.contacts[that.selected].messages.push(
                    { 
                    date: luxon.DateTime.now().toFormat('d/MM/yyyy HH:mm:ss'),
                    message: txtOutput,
                    status: 'received'
                    }
                  );
                }            
          }
        };
    
        let sModel = 'text-davinci-003';// "text-davinci-003";
        let iMaxTokens = 2048;
        let sUserId = "1";
        let dTemperature = 0.5;    
    
        let data = {
            model: sModel,
            prompt: sQuestion,
            max_tokens: iMaxTokens,
            user: sUserId,
            temperature:  dTemperature,
            frequency_penalty: 0.0, //Number between -2.0 and 2.0  
                                    //Positive values decrease the model's likelihood 
                                    //to repeat the same line verbatim.
            presence_penalty: 0.0,  //Number between -2.0 and 2.0. 
                                    //Positive values increase the model's likelihood 
                                    //to talk about new topics.
            stop: ["#", ";"]        //Up to 4 sequences where the API will stop 
                                    //generating further tokens. The returned text 
                                    //will not contain the stop sequence.
        }
    
        oHttp.send(JSON.stringify(data));
      }
    }
  }).mount('#app');