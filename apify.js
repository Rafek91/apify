const apiData = [{
      product_id: 706,
      price: 5075
},
{
      product_id: 460,
      price: 5920
},
{
      product_id: 495,
      price: 4626
},
{
      product_id: 100,
      price: 5859
},
{
      product_id: 877,
      price: 592
},
{
      product_id: 170,
      price: 8068
},
{
      product_id: 493,
      price: 3669
},
{
      product_id: 294,
      price: 222
},
{
      product_id: 750,
      price: 2857
},
{
      product_id: 640,
      price: 5770
},
{
      product_id: 626,
      price: 2380
},
{
      product_id: 64,
      price: 2686
},
{
      product_id: 213,
      price: 9355
},
{
      product_id: 173,
      price: 25
},
{
      product_id: 660,
      price: 3017
},
{
      product_id: 189,
      price: 2517
},
{
      product_id: 123,
      price: 6588
},
{
      product_id: 573,
      price: 5539
},
{
      product_id: 778,
      price: 12
},
{
      product_id: 523,
      price: 7347
},
{
      product_id: 288,
      price: 9636
},
{
      product_id: 861,
      price: 188
},
{
      product_id: 703,
      price: 9060
},
{
      product_id: 116,
      price: 2
},
{
      product_id: 282,
      price: 655
},
{
      product_id: 915,
      price: 3464
},
{
      product_id: 589,
      price: 7875
},
{
      product_id: 424,
      price: 6664
},
{
      product_id: 717,
      price: 342
},
{
      product_id: 951,
      price: 3319
},
{
      product_id: 390,
      price: 7882
},
{
      product_id: 138,
      price: 9332
},
{
      product_id: 532,
      price: 2829
},
{
      product_id: 621,
      price: 554
},
{
      product_id: 472,
      price: 88
},
{
      product_id: 864,
      price: 88
},
{
      product_id: 501,
      price: 88
},
{
      product_id: 59,
      price: 4883
},
{
      product_id: 752,
      price: 1056
},
{
      product_id: 343,
      price: 8727
},
{
      product_id: 412,
      price: 309
}
]

// API

const apiRequest = (min, max) => {
    console.log("api min", min, "api max", max)

    const filterData = apiData.filter(item => {
        if (item.price >= min && item.price <= max) {
                return item
        }
    }).sort((a, b) => a.price - b.price) // response data have to be sorted by a price

    console.log("filter data", filterData)

    if (filterData.length > 5) {
        return {
                total: filterData.length,
                count: 5,
                products: filterData.slice(0, 5)
        }
    } else {
        return {
                total: filterData.length,
                count: filterData.length,
                products: filterData
        }
    }
}

// API REQUEST

let min = 0
let max = 10000

let products = []

const distinctProducts = (responseProducts, productPool) => {
    const filteredNewProducts = responseProducts.filter(product => !productPool.some(item => item.product_id === product.product_id));
    console.log("added products", filteredNewProducts)
    return filteredNewProducts
}

const loadProducts = (minimalValue, maximalValue) => {
    const productApiResponse = apiRequest(minimalValue, maximalValue)
    console.log("api count", productApiResponse.count, "api total", productApiResponse.total)

    if (productApiResponse.count == productApiResponse.total) {
        const fetchedProducts = productApiResponse.products
        products = [...products, ...distinctProducts(fetchedProducts, products)]
        return products
    }

    const responseStructure = productApiResponse.products.map(product => product.price)
    min = Math.max(...responseStructure) // new minimal value for next data load

    console.log("fetched productsIN", productApiResponse.products)
    console.log("products pool", products)

    const fetchedProducts = productApiResponse.products
    products = [...products, ...distinctProducts(fetchedProducts, products)]

    return loadProducts(min, maximalValue)
}

const fetchAllProducts = loadProducts(min, max)

console.log("fetched products", fetchAllProducts)