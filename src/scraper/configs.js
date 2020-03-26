import { regexHelper } from '../helpers'

export default [
  {
    initialUrl: 'https://www.vkmodaplussize.com.br/plus-size/',
    categoryPageParam: '?page=',
    maxPage: 3,
    categories: {
      listItem: '.filterBox li.LastChild',
      data: {
        name: 'a',
        url: {
          selector: 'a',
          attr: 'href',
        },
      },
    },
    products: {
      listItem: '.ProductItem',
      data: {
        name: '.ProductDetails h2 a',
        url: {
          selector: '.ProductDetails h2 a',
          attr: 'href',
        },
        image: {
          selector: '.ProductImageContent a img',
          attr: 'data-original',
        },
        price: {
          selector:
            '.ProductPrices .prod_valor .prod_valor_preco .ValorProduto',
          convert: (p) =>
            p ? Number.parseFloat(regexHelper.matchPrice(p)) : 0.0,
        },
        sizes: {
          listItem:
            '.onHover.t-store .productVariations .options.option_tamanho li',
          attr: 'title',
        },
      },
    },
    details: {
      description: {
        selector: '#ProductDescription p',
        how: 'html',
      },
    },
  },
  {
    initialUrl: 'https://www.distritomoda.com.br/plus-size',
    categoryPageParam: '?pagina=',
    maxPage: 3,
    categories: {
      listItem: '.menu.lateral .nivel-um ul.nivel-dois li',
      data: {
        name: {
          selector: 'a',
          attr: 'title',
        },
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
        pricePromotional:
          '.info-produto .preco-produto strong.preco-promocional',
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
  },
]
