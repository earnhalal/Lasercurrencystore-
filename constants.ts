import type { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Laser Notes 10 – Standard Series', price: 35, description: 'High-quality 10 PKR denomination laser-printed replica. Perfect for film production and tactical training.', imageUrl: '', status: 'available' },
  { id: 2, name: 'Laser Notes 20 – Economy Series', price: 27, description: 'Budget-friendly 20 PKR replica set. Clear markings and standard paper weight.', imageUrl: '', status: 'available' },
  { id: 3, name: 'Laser Notes 50 – Mid-Range Series', price: 31, description: 'Detailed 50 PKR replicas with enhanced color depth and micro-printing simulation.', imageUrl: '', status: 'available' },
  { id: 4, name: 'Laser Notes 100 – Professional Series', price: 15, description: 'Our most popular 100 PKR denomination. High-definition laser prints with authentic texture.', imageUrl: '', status: 'available' },
  { id: 5, name: 'Laser Notes 500 – High-Value Series', price: 11, description: 'Bulk 500 PKR denomination replicas. Designed for high-volume cinematic use.', imageUrl: '', status: 'available' },
  { 
    id: 8, 
    name: 'Money Gun – Elite Cash Shooter', 
    price: 4999, 
    description: 'Prop device for cinematic distribution of notes. Features high-velocity motor and gold-plated accents.', 
    imageUrl: '', 
    status: 'available' 
  },
  {
    id: 9,
    name: 'Money Counter Machine – Mini Desktop', 
    price: 14999,
    description: 'Compact automatic counter for high-volume inventory management. Compatible with all laser series.',
    imageUrl: '',
    status: 'available',
  },
  {
    id: 10,
    name: 'Verification Lamp – UV Portable',
    price: 2499,
    description: 'Professional UV detector for verifying prop and authentic currency differences.',
    imageUrl: '',
    status: 'available',
  },
  {
    id: 11,
    name: 'Metallic Replica Card – Boss Edition',
    price: 1499,
    description: 'Luxury metal composite credit card replica. Gold-embossed design for creators.',
    imageUrl: '',
    status: 'available',
  },
  { id: 6, name: 'Laser Notes 1000 – Premium Series', price: 0, description: 'The 1000 PKR denomination is currently out of stock.', imageUrl: '', status: 'stock-end' },
  { id: 7, name: 'Laser Notes 5000 – Ultimate Series', price: 0, description: 'The 5000 PKR denomination will be available in the next cycle.', imageUrl: '', status: 'coming-soon' },
];

export const PAKISTANI_CITIES: string[] = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
];

export const DELIVERY_COMPANIES: string[] = [
  'Pakistan Post', 'Local Transport Bus'
];

export const REVIEWS: Review[] = [
    { productId: 1, author: 'Ahmed K.', rating: 5, text: 'Great quality copies, very detailed!' },
    { productId: 1, author: 'Fatima Z.', rating: 4, text: 'Good for collection, delivery was fast.' },
    { productId: 4, author: 'Bilal M.', rating: 5, text: 'Excellent value for the professional series. Highly recommend.' },
];