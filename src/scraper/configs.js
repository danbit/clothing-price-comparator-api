import { regexHelper } from '../helpers'

export default [
  {
    store: 'vkmodaplussize',
    initialUrl: 'https://www.vkmodaplussize.com.br/plus-size/',
    categoryPageParam: '?page=',
    maxPage: 1,
    timeoutDetails: 500,
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
    store: 'distritomoda',
    initialUrl: 'https://www.distritomoda.com.br/plus-size',
    categoryPageParam: '?pagina=',
    maxPage: 1,
    timeoutDetails: 500,
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
  },
  {
    store: 'posthaus',
    initialUrl: 'https://www.posthaus.com.br/plus-size-feminino',
    homeUrl: 'https://www.posthaus.com.br',
    categoryPageParam: '?pag=',
    maxPage: 1,
    timeoutDetails: 500,
    categories: {
      listItem: 'a.sc-evWYkj.jyOlXC',
      data: {
        name: 'div',
        url: {
          attr: 'href',
        },
      },
    },
    products: {
      listItem: '.sc-eSePXt.gkGqKy',
      data: {
        name: 'h4',
        url: {
          selector: 'a',
          attr: 'href',
        },
        image: {
          selector: '.sc-btzYZH.ehewdO',
          attr: 'src',
          convert: (img) => img ? img : null,
        },
        price: {
          selector:
            'label',
          convert: (p) =>
            p ? Number.parseFloat(regexHelper.matchPrice(p)) : 0.0,
        },
      },
    },
    details: {
      description: 'p',
      sizes: {
        listItem:
          '.sc-fnwBNb.cLizgy',
      },
    },
  },
]
