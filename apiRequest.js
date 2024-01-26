const listProducts = require ("./apiData")


// API REQUEST

let min = 0
let max = 10000

let products = []

const distinctProducts = (responseProducts, productPool) => { ////filtering products by ID. Multiple products could have the same price, so I need to be sure all products are loaded with no duplicities
    const filteredNewProducts = responseProducts.filter(product => !productPool.some(item => item.product_id === product.product_id));
    console.log("added products", filteredNewProducts)
    return filteredNewProducts
}

const loadProducts = (minimalValue, maximalValue) => {
    const productApiResponse = listProducts(minimalValue, maximalValue)
    console.log("api count", productApiResponse.count, "api total", productApiResponse.total)

    if (productApiResponse.count == productApiResponse.total) { // if the product response count is the same as total amount of products I can return from the recursive function
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