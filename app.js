const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
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
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`).then((res) =>
        res.json().then((json) => {
          this.produto = json
        })
      )
    },
    abrirModal(id) {
      this.fetchProduto(id)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    fecharModal({ target, currentTarget }) {
      if (target === currentTarget) this.produto = false
    },
  },
  created() {
    this.fetchProdutos()
  },
})
