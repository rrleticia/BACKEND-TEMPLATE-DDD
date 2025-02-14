// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: process.env.DB_HOST,
//         port: Number(process.env.DB_PORT),
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_USERNAME,
//         database: process.env.DB_PASSWORD,
//         entities: [__dirname + '/../**/*.typeorm.entity{.ts,.js}'],
//         synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
//         logging: process.env.TYPEORM_LOGGING === 'true',
//       });

//       return dataSource.initialize();
//     },
//   },
// ];
