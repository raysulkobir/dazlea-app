export interface Products {
  id: number
  name: string
  thumbnail_image: string | null
  image: string | null
  has_discount: boolean
  discount: string
  stroked_price: string
  main_price:string
  rating: number
}

export interface ProductData {
  data: Products[]
}

export interface ProductState {
  data: ProductData | null
  loading: boolean
  error: string | null,
}


export interface ProductsRootState {
  featuredProducts: ProductState
  bestSellingProducts: ProductState
  flashDeals: ProductState
}