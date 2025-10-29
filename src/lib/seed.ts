import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 检查是否已存在数据
  const existingMemorials = await prisma.memorial.count();
  
  if (existingMemorials === 0) {
    console.log('Seeding initial data...');
    
    const initialMemorials = [
      { title: '太祖', name: '韩晨超', description: '创始人，奠定基石' },
      { title: '高宗', name: '邵涧泽', description: '继任者，开疆拓土' },
      { title: '太宗', name: '韩天昂', description: '中兴之主，再创辉煌' },
      { title: '仁宗', name: '李嘉俊', description: '仁德之君，惠及众人' },
      { title: '宪宗', name: '张硕航', description: '制度建设，规范发展' },
    ];

    for (const memorial of initialMemorials) {
      await prisma.memorial.create({
        data: memorial
      });
    }

    console.log('Successfully seeded initial data');
  } else {
    console.log('Database already contains data, skipping seed');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
