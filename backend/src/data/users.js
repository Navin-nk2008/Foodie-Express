/**
 * In-memory User Data Store
 */
const users = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    phone: '+91 98765 43210',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    addresses: [
      {
        id: 'addr-1',
        title: 'Home',
        addressLine: 'Flat 402, Oakwood Heights, Evergreen St',
        area: 'Midtown',
        city: 'Chennai',
        isDefault: true,
        note: 'Leave with security guard',
      },
      {
        id: 'addr-2',
        title: 'Office',
        addressLine: 'Tech Park Tower B, 5th Floor, OMR',
        area: 'Sholinganallur',
        city: 'Chennai',
        isDefault: false,
        note: 'Call upon arrival at reception',
      },
    ],
    favorites: [1, 2],
  },
];

module.exports = users;
