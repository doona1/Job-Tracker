const mongoose = require('mongoose');
const Item = require('../models/Item');
require('dotenv').config();

const sampleItems = Array.from({ length: 100 }, (_, i) => ({
    companyName: `Company ${i + 1}`,
    hrContact: `hr${i + 1}@example.com`,
    role: ['Frontend Developer', 'Backend Engineer', 'Fullstack Dev'][i % 3],
    status: ['Applied', 'Interviewing', 'Offer', 'Rejected'][i % 4],
    applicationLink: `https://careers.company${i + 1}.com/job/${i + 1000}`,
    applied: i % 2 === 0
}));

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Item.deleteMany({});
        await Item.insertMany(sampleItems);
        console.log('✅ Seeded job application data');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
