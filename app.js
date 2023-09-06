const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
  },
  filters: {
    formatPrice(valor) {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
  methods: {
    fetchProdutos() {
      fetch('./api/produtos.json').then((res) =>
        res.json().then((json) => {
          this.produtos = json
        })
      )
    },
  },
  created() {
    this.fetchProdutos()
  },
})
