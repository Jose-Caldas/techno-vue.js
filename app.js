const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
  },
  filters: {
    formatPrice(valor) {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
  },
  computed: {
    carrinhoTotal() {
      let total = 0
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.preco
          console.log(item)
        })
      }
      return total
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
    adicionarItem() {
      this.produto.estoque--
      const { id, nome, preco } = this.produto
      this.carrinho.push({ id, nome, preco })
    },
    removerItem(index) {
      this.carrinho.splice(index, 1)
    },
  },
  created() {
    this.fetchProdutos()
  },
})
