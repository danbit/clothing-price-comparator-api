import { regexHelper } from "../../src/helpers";

export default {
  store: 'TStore',
  initialUrl: 'http://tstore.com/plus-size',
  categoryPageParam: '?page=',
  maxPage: 1,
  categories: {
    listItem: 'ul.category li',
    data: {
      name: 'a',
      url: {
        selector: 'a',
        attr: 'href',
      },
    },
  },
  products: {
    listItem: '#listagemProdutos li.span3',
    data: {
      name: '.info-produto a.nome-produto',
      url: {
        selector: '.info-produto a.nome-produto',
        attr: 'href',
      },
      image: {
        selector: '.imagem-produto img',
        attr: 'src',
      },
      price: {
        selector: '.info-produto .preco-produto strong.preco-venda',
        convert: (p) =>
          p ? Number.parseFloat(regexHelper.matchPrice(p)) : 0.0,
      },
      pricePromotional: {
        selector: '.info-produto .preco-produto strong.preco-promocional',
        convert: (p) =>
          p ? Number.parseFloat(regexHelper.matchPrice(p)) : 0.0,
      }
    },
  },
  details: {
    description: {
      selector: '#descricao p',
      how: 'html',
    },
    sizes: {
      listItem: 'a.atributo-item span',
    },
  },
}

