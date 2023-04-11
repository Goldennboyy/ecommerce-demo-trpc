import { Prisma, PrismaClient } from "@prisma/client";

// Instantiate your Prisma client
const prisma = new PrismaClient();

// const categories: Array<Categories> = [
//   "Electronics",
//   "Toys",
//   "Grocery",
//   "Food",
//   "Movies",
//   "Health",
//   "Garden",
//   "Clothes",
// ];

// // Define a function to seed the Category model
// async function seedCategories() {
//   try {
//     for (const category of categories) {
//       await prisma.category.create({
//         data: {
//           category: category,
//         },
//       });
//     }

//     console.log(`Category has been created`);
//   } catch (err) {
//     console.error(err);
//   }

// async function seedElectronics() {
//   for (let i = 1; i <= 20; i++) {
//     const foodNames: Array<string> = [
//       "Smartphone",
//       "Tablet",
//       "Laptop",
//       "Smartwatch",
//       "Fitness Tracker",
//       "Headphones",
//       "Wireless Earbuds",
//       "Bluetooth Speaker",
//       "Smart Speaker",
//       "Streaming Device",
//       "Virtual Reality Headset",
//       "Drones",
//       "Camera",
//       "Monitor",
//       "Gaming Console",
//       "Gaming PC",
//       "External Hard Drive",
//       "Router",
//       "Modem",
//       "Printer",
//       "Scanner",
//       "Smart Home Hub",
//       "Security Camera",
//       "Action Camera",
//       "Portable Charger",
//     ];

//     await prisma.product.create({
//       data: {
//         name: foodNames[i] as string,
//         price: Math.floor(Math.random() * 1000) + 1,
//         description: `This is the description ${foodNames[i] as string}`,
//         featured: Math.random() < 8,
//         category: {
//           connect: {
//             id: "clg9dfoya00002df7hohplwqt",
//           },
//         },
//         stock: {
//           create: {
//             noStock: Math.floor(Math.random() * 100) + 1,
//           },
//         },
//       },
//     });
//   }
// }

// // Define a function to seed the Product model
// // async function seedProducts() {
// //   try {
// //     await prisma.product.create({
// //       data: {
// //         name: "test",
// //         price: 20.0,
// //         description: "test description",
// //         featured: true,
// //         category: {
// //           connect: {
// //             id: "clg9dfpep00062df7u9tofe3a",
// //           },
// //         },
// //         stock: {
// //           create: {
// //             noStock: 20,
// //           },
// //         },
// //       },
// //     });

// //     console.log(`Products have been created`);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // }

async function seedFood() {
  for (let i = 1; i <= 20; i++) {
    const foodNames: Array<string> = [
      "Pizza",
      "Burger",
      "Sushi",
      "Tacos",
      "Pasta",
      "Salmon",
      "Fajitas",
      "Chicken Teriyaki",
      "Pho",
      "Ramen",
      "Pad Thai",
      "Curry",
      "Biryani",
      "Gumbo",
      "Lasagna",
      "Ceviche",
      "Empanadas",
      "Enchiladas",
      "Falafel",
      "Hummus",
      "Kebab",
      "Moussaka",
      "Paella",
      "Shawarma",
      "Tandoori Chicken",
    ];

    await prisma.product.create({
      data: {
        name: foodNames[i] as string,
        price: Math.floor(Math.random() * 50) + 1,
        description: `This is the description ${foodNames[i] as string}`,
        featured: Math.random() < 10,
        category: {
          connect: {
            id: "clg9dfpep00062df7u9tofe3a",
          },
        },
        stock: {
          create: {
            noStock: Math.floor(Math.random() * 50) + 1,
          },
        },
      },
    });
  }
}

// Define a function to seed the Product model
// async function seedProducts() {
//   try {
//     await prisma.product.create({
//       data: {
//         name: "test",
//         price: 20.0,
//         description: "test description",
//         featured: true,
//         category: {
//           connect: {
//             id: "clg9dfpep00062df7u9tofe3a",
//           },
//         },
//         stock: {
//           create: {
//             noStock: 20,
//           },
//         },
//       },
//     });

//     console.log(`Products have been created`);
//   } catch (err) {
//     console.error(err);
//   }
// }

seedFood().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});

// Call the function to seed the Category model
// seedProducts().catch(async (e) => {
//   console.error(e);
//   await prisma.$disconnect();
//   process.exit(1);
// });
