// Profile: userName, age, lastLogin

// const order1 = { date: "ssss", id: "a", items: [1, 2, 3] };
// const order3 = { date: "ssss", id: "c", items: [1, 2, 3] };
// const order2 = { date: "ssss", id: "b", items: [1, 2, 3] };

// const profile1 = {
//     userName: "Matan",
//     age: 25,
//     lastLogin: "9.1.26, 10:30",
//     ordersHistory: [order1, order2, order3]
//     // orderHistory: { b: order2, a: order1, c: order3 }
// }

// const profile2 = {
//     id: "1",
//     userName: "Matan",
//     age: 25,
//     lastLogin: "9.1.26, 10:30",
//     // ordersHistory: [order1, order2, order3]
//     orderHistory: { a: order1, b: order2, c: order3 },
//     welcome: () => console.log('Hello ' + profile2.userName + " your order list is " + profile2.orderHistory)
// }

// profile2.welcome();


// const users = [profile1, profile2]

// console.log('order b: ', profile.orderHistory["b"]);

// const array2 = [{ date: "ssss", id: "ssss", items: [1, 2, 3] },
//     { date: "DD-MM-YYYY", id: "test", items: [1, 2, 3] }]
// console.log('array2', array2);

// console.log('profile: ', profile);


// Get properties
// console.log("userName", profile.userName);
// console.log('age:', profile["age"]);
// console.log('profile: ', profile);

// profile.age = 20;

// console.log('profile: ', profile);

//Adding address - first approach
// profile.street = "123 Dror";
// profile.city = "Zichron Ya'akov";
// profile["country"] = "Israel"

// // console.log('profile: ', profile);

//Adding address - seconde approach
// profile.address = {
//     street: "123 Dror",
//     city: "Zichron Ya'akov",
//     country: "Israel"
// }
// console.log('profile: ', profile);
// console.log('street:', profile.address.street);


// Change property with typo (new property created)
// // profile.ag = 25;

// // console.log('profile: ', profile);

// // Profile: userName, age, lastLogin

// const order1 = { date: "ssss", id: "a", items: [1, 2, 3] };
// const order3 = { date: "ssss", id: "c", items: [1, 2, 3] };
// const order2 = { date: "ssss", id: "b", items: [1, 2, 3] };

// // [001, 002, 003]

// const profileA = {
//     userName: "Matan",
//     age: 25,
//     lastLogin: "9.1.26, 10:30",
//     ordersHistory: [order1, order2, order3]
//     // orderHistory: { b: order2, a: order1, c: order3 }
// }

// const profileB = {
//     id: "fsdgzxccbhfdg",
//     userName: "Eric",
//     age: 25,
//     lastLogin: "9.1.26, 10:30",
//     // ordersHistory: [order1, order2, order3]
//     orderHistory: { a: order1, b: order2, c: order3 },
//     welcome: () => console.log('Hello ' + profile2.userName + " your order list is " + profile2.orderHistory)
// // }

// // profileA = profileB; // NOT VALID

// profileA.newAge = 22;

// console.log('profileA: ', profileA);


// class Profile {
//     constructor(userName, age, lastLogin) {
//         console.log('building profile...');
//         this.userName = userName;
//         this.age = age;
//         this.lastLogin = lastLogin;
//     };
//     isAdmin = false;
//     welcome() {
//         console.log('Welcome : ' + this.userName);

//     }
// }

// const profile1 = new Profile("Matan", 25, "9.1.26, 10:30");
// const profile2 = new Profile("Eldad", 30, "9.1.26, 10:30");

// console.log('profile1: ', profile1);
// console.log('profile2: ', profile2);
// profile1.isAdmin = true;
// profile1.nickName = "Mati!"

// console.log('profile1: ', profile1);
// console.log('profile2: ', profile2);
// // profile1.welcome();


// // profile1.age = 35;
// // console.log('profile1: ', profile1);


// // const now = new Date();
// // console.log('now: ', now);
// // const nowDay = now.getDay();
// // console.log('day:', nowDay);

// console.log(now.getMinutes());
// console.log(now.getMonth()+1);
