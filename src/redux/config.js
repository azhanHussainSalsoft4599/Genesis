export const urls = {
  v1: `https://loziermotorsllc.com/wp-json/wc/v3/`,
  customUrl: 'https://loziermotorsllc.com/wp-json/api/',
  bannerUrl: 'https://loziermotorsllc.com/wp-json/api/',
};
// Client Key: ck_6d923b3757e5c6a337d6f177f30219c74dae577f
// Client Secret: cs_4001c4fbd32050f8faccea034f0305b5e25acf3f

export const consumer_secret = 'cs_8f016617318c0c9f4b3eb6fc45b18efdfa1645cb';
export const consumer_key = 'ck_9b48f9b39a45802eb9bcf95a52545b6dfe4bfdf9';


// https://armarioperfecto.uk//wp-json/wc/v3/orders/?consumer_key=ck_e4f41079f801ca7b905b763829c38695aedf59b8&consumer_secret=cs_d7c276c98fc0c58f33966d2a1b131b2213b9ab04

export const base_url = urls.v1;
export const custom_url = urls.customUrl;
export const banner_url = urls.bannerUrl;
export const endpoints = {
  auth: {
    signup: 'customers',
    login: 'login',
    about: 'about_us',
    forgotPasswordMail: 'forgot_password',
    resetPassword: 'reset_password',
    termsConditions: 'terms_conditions',
    privacyPolicy: 'privacy_policy',
    registration: 'registration',
  },

  products: {
    getProducts: 'products',
    getProductsCategories: 'products/categories',
    getProductDetails: 'products/',
    getRelatedProducts: 'products',
    getRelatedProductsInclude: 'include=',
    getSearchedProduct: '/products?search=',
    getCoupon: 'coupons',
    entertainment: 'entertainment',
  },

  reviews: {
    createReview: 'products/reviews',
  },

  homeData: {
    banner: 'home_banner',
  },

  checkout: {
    createOrder: 'orders',
    makePayment: 'charge_payment',
  },

  contact: {
    contactUs: 'contact_us',
  },

  orders: {
    orders: 'orders',
  },
};

const configs = {
  endpoints: endpoints,
  base_url: base_url,
  custom_url: custom_url,
  consumer_secret: consumer_secret,
  consumer_key: consumer_key,
};

export default configs;
