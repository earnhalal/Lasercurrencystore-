import type { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: '10 Rupee Wedding Bundle', 
    price: 35, 
    description: 'Perfect for showering the groom! High-quality prints that fly beautifully in the air. 100 notes per pack.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 2, 
    name: '20 Rupee Event Pack', 
    price: 27, 
    description: 'Clean and crisp 20 PKR bundles. Very popular for Mehndi and Sangeet nights.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 3, 
    name: '50 Rupee "Vail" Special', 
    price: 31, 
    description: 'Special 50 PKR notes for "Vail" at weddings. Thick paper feel and bright colors.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 4, 
    name: '100 Rupee Luxury Bundle', 
    price: 15, 
    description: 'Our premium 100 PKR series. Ideal for close family members and special stage appearances.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 5, 
    name: '500 Rupee Grand Entry Pack', 
    price: 11, 
    description: 'High-value look for grand wedding entries. Great for large ceremonies.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 8, 
    name: 'Electric Money Gun (Gold)', 
    price: 4999, 
    description: 'Automatic money shooter. Shower the stage with cash instantly! Battery operated.', 
    imageUrl: '', 
    status: 'available' 
  },
  {
    id: 9,
    name: 'Mini Cash Counter', 
    price: 14999,
    description: 'Portable counting machine. Quickly manage your bundles at the event desk.',
    imageUrl: '',
    status: 'available',
  },
  {
    id: 11,
    name: 'Gold Wedding Gift Card',
    price: 1499,
    description: 'Gold-themed metal card for luxury gift presentations at the wedding.',
    imageUrl: '',
    status: 'available',
  },
  { id: 6, name: '1000 Rupee Bundle', price: 0, description: 'Currently out of stock. Will be available next week.', imageUrl: '', status: 'stock-end' },
  { id: 7, name: '5000 Rupee Royal Series', price: 0, description: 'Coming soon for the peak wedding season.', imageUrl: '', status: 'coming-soon' },
];

export const PAKISTANI_CITIES: string[] = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
];

export const DELIVERY_COMPANIES: string[] = [
  'Pakistan Post', 'Local Transport Bus'
];

export const REVIEWS: Review[] = [
    { productId: 1, author: 'Hassan Ali', rating: 5, text: 'The quality is amazing. Used them for my cousin\'s Barat, everyone thought they were real in photos!' },
    { productId: 4, author: 'Ayesha Khan', rating: 5, text: 'Very fast delivery via bus service. Highly recommended for wedding season.' },
];