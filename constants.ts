import type { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Laser Notes 10 – 10 PKR per copie – Total 350 PKR', price: 350, description: 'A set of 10 high-quality laser-printed notes for collectors.', imageUrl: 'https://images.unsplash.com/photo-1639755498350-238b3443a2c9?w=400&q=80', status: 'available' },
  { id: 2, name: 'Laser Notes 20 – 20 PKR per copie – Total 550 PKR', price: 550, description: 'A set of 20 high-quality laser-printed notes for collectors.', imageUrl: 'https://images.unsplash.com/photo-1639755498350-238b3443a2c9?w=400&q=80&hue=120', status: 'available' },
  { id: 3, name: 'Laser Notes 50 – 50 PKR per copie – Total 1550 PKR', price: 1550, description: 'A set of 50 high-quality laser-printed notes for collectors.', imageUrl: 'https://images.unsplash.com/photo-1639755498350-238b3443a2c9?w=400&q=80&hue=50', status: 'available' },
  { id: 4, name: 'Laser Notes 100 – 100 PKR per copie – Total 1550 PKR', price: 1550, description: 'A set of 100 high-quality laser-printed notes for collectors.', imageUrl: 'https://images.unsplash.com/photo-1639755498350-238b3443a2c9?w=400&q=80&hue=270', status: 'available' },
  { id: 5, name: 'Laser Notes 500 – 500 PKR per copie – Total 5500 PKR', price: 5500, description: 'A bulk set of 500 high-quality laser-printed notes for collectors.', imageUrl: 'https://images.unsplash.com/photo-1639755498350-238b3443a2c9?w=400&q=80&hue=45&sat=100', status: 'available' },
  { 
    id: 8, 
    name: 'Money Gun – Cash Shooter – PKR 4,999', 
    price: 4999, 
    description: 'Money Gun ek high-quality prop device hai jo prop notes shoot karta hai — perfect for parties, TikTok videos, photo shoots, ya event decoration ke liye. Full plastic body, fast shooting mechanism, aur stylish black-golden design. Disclaimer: Prop purpose only. Real currency use na karein.', 
    imageUrl: 'https://images.unsplash.com/photo-1546522346-4a4b5a45213a?w=400&q=80', 
    status: 'available' 
  },
  {
    id: 9,
    name: 'Money Counter Machine – Mini – PKR 14,999',
    price: 14999,
    description: 'Compact automatic money counter jo real aur prop notes dono count kar sakta hai. Fast speed, digital display, aur error detection feature. Ideal for shops, events, ya collectors ke liye.',
    imageUrl: 'https://images.unsplash.com/photo-1580231947863-23a496f8303a?w=400&q=80',
    status: 'available',
  },
  {
    id: 10,
    name: 'UV Currency Detector Lamp – Portable – PKR 2,499',
    price: 2499,
    description: 'UV currency checker lamp — real aur prop note ke difference ko instantly detect karta hai. Portable design with magnifier lens, easy to carry aur reliable performance.',
    imageUrl: 'https://images.unsplash.com/photo-1621886292374-763459427f7a?w=400&q=80',
    status: 'available',
  },
  {
    id: 11,
    name: 'Gold Metal Credit Card – Boss Edition Replica – PKR 1,499',
    price: 1499,
    description: 'Luxury metallic “Boss Edition” replica credit card — stylish design for content creators aur collectors ke liye. Perfect prop for wallet shots, flat lays aur flex videos.',
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&q=80',
    status: 'available',
  },
  {
    id: 12,
    name: 'Mini Safe Box – Money Vault Toy – PKR 3,299',
    price: 3299,
    description: 'Electronic mini safe with password lock — apne cash, prop notes, ya secret items safe rakhne ke liye. Digital keypad aur alarm sound included. Perfect for home ya gifting use.',
    imageUrl: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&q=80',
    status: 'available',
  },
  {
    id: 13,
    name: 'Transparent Piggy Bank – Savings Jar – PKR 999',
    price: 999,
    description: 'Clear acrylic savings jar with digital counter lid — apni saving track karne ka modern way. Perfect for kids, creators, aur anyone building discipline.',
    imageUrl: 'https://images.unsplash.com/photo-1593135116893-41a4a441712a?w=400&q=80',
    status: 'available',
  },
  {
    id: 14,
    name: 'Luxury Cash Envelope – Gift Box – PKR 699',
    price: 699,
    description: 'Premium money envelope for gifting cash at weddings, birthdays, aur special events. Velvet touch finish with gold emboss design — elegant and classy.',
    imageUrl: 'https://images.unsplash.com/photo-1592614536349-45a133f0e0f8?w=400&q=80',
    status: 'available',
  },
  {
    id: 15,
    name: 'Fake Gold Bar – Prop – PKR 999',
    price: 999,
    description: 'Mini gold bar prop made of high-polish resin — perfect for display, shoots, or decorative purposes. Premium shine with engraved “999.9 GOLD” marking.',
    imageUrl: 'https://images.unsplash.com/photo-1582218433682-1bab16c5890c?w=400&q=80',
    status: 'available',
  },
  {
    id: 16,
    name: 'Creator Combo Kit – Money Gun + Notes + Gold Card – PKR 8,999',
    price: 8999,
    description: 'All-in-one Creator Combo Pack — includes 1x Money Gun, 1x Prop Currency Pack, and 1x Gold Credit Card Replica. Best value set for video creators aur event stylists ke liye.',
    imageUrl: 'https://images.unsplash.com/photo-152140592095-2ca05b651e58?w=400&q=80',
    status: 'available',
  },
  { id: 6, name: 'Laser Notes 1000 – 1000 PKR per copie – Status: Stock End', price: 0, description: 'This item is currently out of stock.', imageUrl: 'https://images.unsplash.com/photo-1639755498350-238b3443a2c9?w=400&q=80&hue=200', status: 'stock-end' },
  { id: 7, name: 'Laser Notes 5000 – 5000 PKR per copie – Status: Coming Soon', price: 0, description: 'This item will be available soon.', imageUrl: 'https://images.unsplash.com/photo-1639755498350-238b3443a2c9?w=400&q=80&hue=60', status: 'coming-soon' },
];

export const PAKISTANI_CITIES: string[] = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
];

export const DELIVERY_COMPANIES: string[] = [
  'TCS', 'Leopards Courier', 'M&P Courier', 'Pakistan Post', 'Call Courier'
];

export const REVIEWS: Review[] = [
    { productId: 1, author: 'Ahmed K.', rating: 5, text: 'Great quality copies, very detailed!' },
    { productId: 1, author: 'Fatima Z.', rating: 4, text: 'Good for collection, delivery was fast.' },
    { productId: 2, author: 'Bilal M.', rating: 5, text: 'Excellent value for the price. Highly recommend.' },
];