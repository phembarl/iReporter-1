// export default [
//   {
//     id: 101,
//     createdOn: new Date().toString(),
//     createdBy: 1,
//     type: 'red-flag',
//     location: '0.463062, 2.901245.',
//     status: 'Draft',
//     Images: ['image1', 'image2'],
//     Videos: ['video1', 'video2'],
//     comment: 'Our roads here at Kpukpuru community are bad, yet government reports
//  show they have been fixed',
//   },
//   {
//     id: 102,
//     createdOn: new Date().toString(),
//     createdBy: 2,
//     type: 'red-flag',
//     location: '1.946493, 5.657392',
//     status: 'Rejected',
//     Images: ['image1', 'image2'],
//     Videos: ['video1', 'video2'],
//     comment: 'When will the schools promised to us be built?',
//   },
//   {
//     id: 103,
//     createdOn: new Date().toString(),
//     createdBy: 3,
//     type: 'red-flag',
//     location: '7.026452, 9.028346',
//     status: 'Under Investigation',
//     Images: ['image1', 'image2'],
//     Videos: ['video1', 'video2'],
//     comment: 'There is a massive wave of corruption among public school lecturers',
//   },
//   {
//     id: 104,
//     createdOn: new Date().toString(),
//     createdBy: 4,
//     type: 'red-flag',
//     location: '2.037562, 8.309372',
//     status: 'Rejected',
//     Images: ['image1', 'image2'],
//     Videos: ['video1', 'video2'],
//     comment: 'Something needs to be done about our hospitals',
//   },
//   {
//     id: 105,
//     createdOn: new Date().toString(),
//     createdBy: 5,
//     type: 'red-flag',
//     location: '5.394649, 4.024642',
//     status: 'Rejected',
//     Images: ['image1', 'image2'],
//     Videos: ['video1', 'video2'],
//     comment: 'We need more roads as promised',
//   }];

const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:andela1@localhost:5432/ireporter';
// const connectionString = 'postgres://urglkuhjqtlwak:ed26195ed5964f4e17170d1fe7b2e269b38f3227d1cece67b1f80899ae7efb87@ec2-54-243-238-46.compute-1.amazonaws.com:5432/d383hu30aurddq';

const db = new Pool({
  connectionString,
});

export default db;
