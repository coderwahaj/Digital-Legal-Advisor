const { User, Query, ActivityLog, Dataset, sequelize } = require('../models');

async function seedAdminData() {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await sequelize. authenticate();

    // Get existing users
    const users = await User. findAll();
    
    if (users.length === 0) {
      console.log('⚠️ No users found.  Please create users first.');
      process.exit(1);
    }

    console.log(`📊 Found ${users.length} users in database`);

    // 1. Create sample queries with dates spread over last 30 days
    console. log('Creating queries.. .');
    const queries = [];
    
    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 30); // Random day in last 30 days
      const createdDate = new Date();
      createdDate. setDate(createdDate.getDate() - daysAgo);
      createdDate.setHours(Math.floor(Math. random() * 24)); // Random hour

      queries.push({
        userId: users[Math.floor(Math.random() * users.length)].id,
        queryText: `Legal query ${i + 1}:  What are the regulations regarding ${['criminal law', 'civil disputes', 'tax compliance', 'corporate governance'][Math.floor(Math.random() * 4)]}?`,
        queryType: ['criminal', 'civil', 'tax', 'corporate'][Math.floor(Math.random() * 4)],
        status: ['pending', 'answered', 'closed'][Math.floor(Math.random() * 3)],
        createdAt: createdDate,
        updatedAt: createdDate
      });
    }
    
    await Query.bulkCreate(queries);
    console.log('✅ Created 50 sample queries');

    // 2. Create activity logs
    console. log('Creating activity logs...');
    const now = Date.now();
    const logs = [
      {
        userId:  users[0].id,
        eventType: 'System Update Required',
        severity: 'info',
        details: 'Legal database needs to be updated to include recent regulatory changes.',
        createdAt: new Date(now - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        userId: users[1]?.id || users[0].id,
        eventType: 'High User Traffic',
        severity: 'warning',
        details: 'System experiencing higher than normal traffic.  All services operating normally.',
        createdAt: new Date(now - 5 * 60 * 60 * 1000) // 5 hours ago
      },
      {
        userId:  null, // System event
        eventType: 'Dataset Update Complete',
        severity: 'success',
        details: 'The latest Pakistan tax regulations have been successfully integrated.',
        createdAt: new Date(now - 24 * 60 * 60 * 1000) // Yesterday
      },
      {
        userId: users[2]?.id || users[0].id,
        eventType: 'User Registration',
        severity: 'info',
        details: 'New user registered successfully.',
        createdAt: new Date(now - 12 * 60 * 60 * 1000) // 12 hours ago
      },
      {
        userId: null,
        eventType: 'Database Backup',
        severity: 'success',
        details: 'Automated database backup completed successfully.',
        createdAt: new Date(now - 48 * 60 * 60 * 1000) // 2 days ago
      },
      {
        userId: users[3]?.id || users[0].id,
        eventType: 'Failed Login Attempt',
        severity: 'warning',
        details: 'Multiple failed login attempts detected from IP 192.168.1.100',
        createdAt: new Date(now - 6 * 60 * 60 * 1000) // 6 hours ago
      },
      {
        userId: null,
        eventType: 'System Maintenance',
        severity: 'info',
        details: 'Scheduled system maintenance completed successfully.',
        createdAt: new Date(now - 72 * 60 * 60 * 1000) // 3 days ago
      }
    ];
    
    await ActivityLog.bulkCreate(logs);
    console.log('✅ Created 7 activity logs');

    // 3. Create datasets
    console.log('Creating datasets...');
    const datasets = [
      {
        datasetType: 'statute',
        title: 'Pakistan Penal Code 1860',
        content: 'Complete text of Pakistan Penal Code with all amendments.',
        isActive: true,
        usageCount: 150,
        lastUpdated: new Date()
      },
      {
        datasetType: 'case_law',
        title: 'Supreme Court Judgments 2024',
        content: 'Collection of recent Supreme Court judgments and landmark cases.',
        isActive: true,
        usageCount:  85,
        lastUpdated: new Date()
      },
      {
        datasetType:  'regulation',
        title:  'Tax Regulations 2024',
        content: 'Latest tax regulations and amendments from FBR.',
        isActive: true,
        usageCount: 200,
        lastUpdated: new Date()
      },
      {
        datasetType: 'precedent',
        title: 'Contract Law Precedents',
        content: 'Important contract law precedents and case references.',
        isActive: false,
        usageCount: 0,
        lastUpdated: new Date()
      },
      {
        datasetType: 'statute',
        title: 'Companies Act 2017',
        content: 'Pakistan Companies Act with latest amendments.',
        isActive: true,
        usageCount: 45,
        lastUpdated: new Date()
      },
      {
        datasetType: 'regulation',
        title: 'SECP Regulations',
        content: 'Securities and Exchange Commission of Pakistan regulations.',
        isActive: true,
        usageCount:  60,
        lastUpdated: new Date()
      }
    ];
    
    await Dataset.bulkCreate(datasets);
    console.log('✅ Created 6 datasets');

    // 4. Update user login times (for active sessions)
    console.log('Updating user login times...');
    const loginUpdates = [];
    for (let i = 0; i < users. length; i++) {
      const hoursAgo = Math.random() * 24; // Random time in last 24 hours
      users[i].lastLogin = new Date(now - hoursAgo * 60 * 60 * 1000);
      loginUpdates.push(users[i].save());
    }
    await Promise.all(loginUpdates);
    console.log(`✅ Updated ${users.length} user login times`);

    console.log('\n🎉 Database seeding completed successfully! ');
    console.log('📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log('   - Queries: 50');
    console.log('   - Activity Logs: 7');
    console.log('   - Datasets: 6');
    
    await sequelize. close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

seedAdminData();