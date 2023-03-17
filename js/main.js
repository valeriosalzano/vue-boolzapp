const { createApp } = Vue

  createApp({
    data() {
      return {
        contacts: contacts,
        selected: 0,
      }
    },
    methods: {
      clickOnContact(index){
        this.selected = index;
      }
    }
  }).mount('#app');