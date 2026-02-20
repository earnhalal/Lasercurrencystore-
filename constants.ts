import type { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: '10 Rupee - Signature Series', 
    price: 399, 
    description: 'The definitive choice for "Shadi Showering". These lightweight laser-cut notes are designed for maximum hang-time in the air, creating a majestic green-and-gold rain effect.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 2, 
    name: '20 Rupee - Festive Pack', 
    price: 799, 
    description: 'Crisp, high-density prints for Mehndi ceremonies. These notes feature a special anti-glare coating that looks perfect under cinematic party lighting.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 3, 
    name: '50 Rupee - Elite Vail Bundle', 
    price: 1399, 
    description: 'Premium 50 PKR replicas for traditional "Vail". Crafted on bond-quality paper with a realistic texture and micro-printed detailing.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 4, 
    name: '100 Rupee - Luxury VIP Pack', 
    price: 1499, 
    description: 'Our most sought-after series for Barat entries. These high-fidelity replicas are indistinguishable from authentic notes in professional 4K videography.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 5, 
    name: '500 Rupee - Royal Grand Series', 
    price: 3565, 
    description: 'Unmatched luxury for grand stage appearances. These high-denomination replicas add a touch of royal grandeur to any celebration.', 
    imageUrl: '', 
    status: 'available' 
  },
  { 
    id: 8, 
    name: 'Golden Money Shooter - Pro', 
    price: 4999, 
    description: 'High-velocity electric money gun in a shimmering gold finish. Guaranteed to shower the stage with a continuous stream of celebration.', 
    imageUrl: '', 
    status: 'available' 
  },
  {
    id: 9,
    name: 'Automatic Bundle Counter', 
    price: 14500,
    description: 'Portable desktop currency counter. Essential for wedding planners to quickly verify bundle counts before the event begins.',
    imageUrl: '',
    status: 'available',
  },
  {
    id: 11,
    name: 'Metal "Boss" Presentation Card',
    price: 2499,
    description: 'A heavy-weight metal replica card for luxury gift presentations and high-end photography sets.',
    imageUrl: '',
    status: 'available',
  },
  { id: 6, name: '1000 Rupee Bundle', price: 0, description: 'Sold out for the current wedding season. Restocking expected in early winter.', imageUrl: '', status: 'stock-end' },
  { id: 7, name: '5000 Rupee Ultimate Series', price: 0, description: 'Limited Edition. Only released for the peak celebration months (December-January).', imageUrl: '', status: 'coming-soon' },
];

export const PAKISTANI_CITIES: string[] = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
];

export const DELIVERY_COMPANIES: string[] = [
  'Pakistan Post', 'Local Transport Bus'
];

export const REVIEWS: Review[] = [
    { productId: 1, author: 'Zeeshan Malik', rating: 5, text: 'Used these for my brother wedding in Lahore. The bus delivery was so fast and the quality is top-notch!' },
    { productId: 4, author: 'Amna Tariq', rating: 5, text: 'The 100 PKR notes look absolutely real in the wedding video. Best investment for the stage entry.' },
];