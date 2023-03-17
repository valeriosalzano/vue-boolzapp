const { createApp } = Vue

  createApp({
    data() {
      return {
        contacts: contacts,
        selected: 0,
      }
    }
  }).mount('#app');