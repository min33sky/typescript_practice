interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// ? Partial: 특정 타입의 부분 집합을 만족하는 타입을 정의
type MayHaveProduct = Partial<Product>;

const me: MayHaveProduct = {};
const you: MayHaveProduct = { name: 'chulsu' };

let products: Product[] = [{ id: 1, name: '참치김밥', price: 3000, brand: '김가네', stock: 3 }];

// ? Pick: 특정 타입에서 지정한 속성으로 구성된 타입
type ProductInfo = Pick<Product, 'id' | 'name' | 'price'>;

function displayProduct(productInfo: ProductInfo) {
  // ...
}

// ? Omit: 특정 타입에서 지정된 속성을 제거한 타입
type ProductInfoByOmit = Omit<Product, 'stock'>;

// #1 - Partial
type Subset<T> = {
  [K in keyof T]?: T[K];
};

const productDetail: Subset<Product> = {
  id: 1,
};

// #2 - Pick
type PickFewThings<T, K extends keyof T> = {
  [P in K]: T[P];
};

const productName: PickFewThings<Product, 'name'> = {
  name: 'Ddahyoni',
};
const productNameWithPrice: PickFewThings<Product, 'name' | 'price'> = {
  name: 'chul9',
  price: 2000,
};
