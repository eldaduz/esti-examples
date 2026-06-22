

## 1. דלת חכמה

**רמה: קל**

כתבי מחלקה בשם `SmartDoor`.

המחלקה מקבלת ב־`constructor` קוד פתיחה.

הדלת מתחילה במצב נעול.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
unlock(code)
lock()
getStatus()
```

דרישות:

* `unlock(code)` פותחת את הדלת רק אם הקוד נכון.
* אם הקוד שגוי, יש להחזיר `"קוד שגוי"`.
* אם הקוד נכון, יש להחזיר `"הדלת נפתחה"`.
* `lock()` נועלת את הדלת ומחזירה `"הדלת ננעלה"`.
* `getStatus()` מחזירה `"פתוחה"` או `"נעולה"`.

### שימוש צפוי

```js
const door = new SmartDoor("1234");

console.log(door.unlock("0000"));
// "קוד שגוי"

console.log(door.unlock("1234"));
// "הדלת נפתחה"

console.log(door.getStatus());
// "פתוחה"

console.log(door.lock());
// "הדלת ננעלה"
```

---

## 2. מכונת קפה

**רמה: קל**

כתבי מחלקה בשם `CoffeeMachine`.

המחלקה מקבלת ב־`constructor` כמות התחלתית של מים במיליליטרים.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
makeCoffee(type)
refillWater(amount)
getWaterLevel()
```

דרישות:

* כל כוס קפה צורכת `150` מ״ל מים.
* `makeCoffee(type)` מקבלת סוג קפה, למשל `"אספרסו"` או `"לאטה"`.
* אם יש מספיק מים, יש להפחית 150 מ״ל ולהחזיר הודעה כמו:
  `"קפה מסוג לאטה מוכן"`.
* אם אין מספיק מים, יש להחזיר:
  `"אין מספיק מים להכנת קפה"`.
* `refillWater(amount)` מוסיפה מים למכונה.
* `getWaterLevel()` מחזירה את כמות המים הנוכחית.

### שימוש צפוי

```js
const machine = new CoffeeMachine(300);

console.log(machine.makeCoffee("אספרסו"));
// "קפה מסוג אספרסו מוכן"

console.log(machine.getWaterLevel());
// 150

machine.refillWater(200);

console.log(machine.getWaterLevel());
// 350
```

---

## 3. נגן מוזיקה

**רמה: קל**

כתבי מחלקה בשם `MusicPlayer`.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
play(songName)
pause()
stop()
getStatus()
```

דרישות:

* כשהנגן נוצר, אין שיר שמתנגן.
* `play(songName)` מתחילה לנגן את השיר ומחזירה:
  `"מנגן עכשיו: <שם השיר>"`.
* `pause()` עוצרת זמנית את הנגינה.
* אם אין שיר שמתנגן, `pause()` תחזיר:
  `"אין שיר לנגן או לעצור"`.
* `stop()` מפסיקה את השיר ומנקה את השיר הנוכחי.
* `getStatus()` מחזירה הודעה שמתארת מה מצב הנגן כרגע.

### שימוש צפוי

```js
const player = new MusicPlayer();

console.log(player.play("Flowers"));
// "מנגן עכשיו: Flowers"

console.log(player.pause());
// "השיר הושהה"

console.log(player.stop());
// "הנגינה הופסקה"
```

---


## 4. סל קניות ותשלום

**רמה: בינוני**

כתבי מחלקה בשם `ShoppingCart`.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
addItem(name, price)
removeItem(name)
getCartSummary()
checkout()
```

דרישות:

* סל הקניות מתחיל ריק.
* `addItem(name, price)` מוסיפה מוצר לסל.
* `removeItem(name)` מסירה את המוצר הראשון עם אותו שם.
* `getCartSummary()` מחזירה מידע על כל המוצרים ועל הסכום הכולל.
* `checkout()` מחזירה את הסכום הסופי לתשלום.
* אם הסכום הכולל קטן מ־100, יש להוסיף דמי משלוח של `20`.
* אם הסכום הכולל הוא 100 ומעלה, המשלוח חינם.
* אם הסל ריק, `checkout()` תחזיר:
  `"אין מוצרים בסל"`.

### שימוש צפוי

```js
const cart = new ShoppingCart();

cart.addItem("ספר", 50);
cart.addItem("מחברת", 20);

console.log(cart.checkout());
// 90

cart.addItem("תיק", 80);

console.log(cart.checkout());
// 150
```

---

## 5. לוח מחוונים של רכב

**רמה: בינוני**

כתבי מחלקה בשם `CarDashboard`.

המחלקה מקבלת ב־`constructor` כמות דלק התחלתית.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
start()
drive(kilometers)
refuel(liters)
getStatus()
```

דרישות:

* רכב לא יכול לנסוע לפני שהתניע.
* התנעה דורשת לפחות ליטר דלק אחד.
* כל קילומטר נסיעה צורך ליטר דלק אחד.
* אם אין מספיק דלק לנסיעה המבוקשת, אין לבצע את הנסיעה.
* `refuel(liters)` מוסיפה דלק.
* `getStatus()` מחזירה את מצב המנוע ואת כמות הדלק הנותרת.

### שימוש צפוי

```js
const car = new CarDashboard(10);

console.log(car.start());
// "הרכב הותנע"

console.log(car.drive(4));
// "הרכב נסע 4 קילומטרים"

console.log(car.getStatus());
// למשל: "המנוע פועל, נשארו 6 ליטרים"
```

---

## 6. משחק שאלות

**רמה: בינוני**

כתבי מחלקה בשם `QuizGame`.

המחלקה מקבלת ב־`constructor` מערך שאלות. כל שאלה תכיל:

```js
{
  question: "מה בירת צרפת?",
  answer: "פריז"
}
```

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
start()
answerCurrentQuestion(answer)
getCurrentQuestion()
finish()
```

דרישות:

* `start()` מתחילה משחק חדש ומאפסת את הניקוד.
* `getCurrentQuestion()` מחזירה את השאלה הנוכחית.
* `answerCurrentQuestion(answer)` בודקת את התשובה, מעדכנת ניקוד אם צריך, ומתקדמת לשאלה הבאה.
* `finish()` מחזירה הודעה עם מספר התשובות הנכונות מתוך מספר השאלות הכולל.
* אם מנסים לענות לאחר שכל השאלות נגמרו, יש להחזיר:
  `"המשחק כבר הסתיים"`.

### שימוש צפוי

```js
const quiz = new QuizGame([
  { question: "כמה זה 2 + 2?", answer: "4" },
  { question: "מה בירת ישראל?", answer: "ירושלים" }
]);

quiz.start();

console.log(quiz.getCurrentQuestion());
// "כמה זה 2 + 2?"

console.log(quiz.answerCurrentQuestion("4"));
// "תשובה נכונה"

console.log(quiz.finish());
// למשל: "ענית נכון על 1 מתוך 2 שאלות"
```

---

## 7. חניון

**רמה: בינוני**

כתבי מחלקה בשם `ParkingLot`.

המחלקה מקבלת ב־`constructor` את מספר מקומות החניה הכולל.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
parkCar(licensePlate)
exitCar(licensePlate)
getAvailableSpots()
getParkedCars()
```

דרישות:

* בתחילת העבודה החניון ריק.
* `parkCar(licensePlate)` מכניסה רכב לחניון.
* אסור להכניס אותו רכב פעמיים.
* אם החניון מלא, יש להחזיר:
  `"החניון מלא"`.
* `exitCar(licensePlate)` מוציאה רכב מהחניון.
* אם הרכב לא נמצא, יש להחזיר:
  `"הרכב לא נמצא בחניון"`.
* `getAvailableSpots()` מחזירה כמה מקומות פנויים נשארו.
* `getParkedCars()` מחזירה את מספרי הרכב שנמצאים כרגע בחניון.

### שימוש צפוי

```js
const parking = new ParkingLot(2);

console.log(parking.parkCar("123-45-678"));
// "הרכב נכנס לחניון"

console.log(parking.parkCar("987-65-432"));
// "הרכב נכנס לחניון"

console.log(parking.getAvailableSpots());
// 0

console.log(parking.parkCar("111-22-333"));
// "החניון מלא"
```

---

## 8. מערכת הזמנות משלוחים

**רמה: קשה**

כתבי מחלקה בשם `FoodDeliveryOrder`.

המחלקה מקבלת ב־`constructor` שם לקוחה וכתובת למשלוח.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
addItem(name, price, quantity)
removeItem(name)
placeOrder()
updateStatus(status)
getOrderSummary()
```

דרישות:

* ההזמנה מתחילה ריקה ובסטטוס `"טיוטה"`.
* `addItem(name, price, quantity)` מוסיפה מוצר להזמנה.
* `removeItem(name)` מסירה את המוצר הראשון עם אותו שם.
* `placeOrder()` יכולה להתבצע רק אם יש לפחות מוצר אחד.
* כאשר מזמינים:

  * אם סכום המוצרים קטן מ־80, יש להוסיף דמי משלוח של `15`.
  * אם סכום המוצרים הוא 80 ומעלה, המשלוח חינם.
  * יש לשנות את סטטוס ההזמנה ל־`"הוזמנה"`.
* `updateStatus(status)` משנה סטטוס רק אם ההזמנה כבר בוצעה.
* `getOrderSummary()` מחזירה סיכום שכולל את שם הלקוחה, הכתובת, המוצרים, הסכום הכולל והסטטוס.

### שימוש צפוי

```js
const order = new FoodDeliveryOrder("דנה", "רחוב הפרחים 10");

order.addItem("פיצה", 60, 1);
order.addItem("שתייה", 10, 2);

console.log(order.placeOrder());
// למשל: "ההזמנה בוצעה בהצלחה. לתשלום: 95"

order.updateStatus("בדרך");

console.log(order.getOrderSummary());
```

---

## 9. ארנק דיגיטלי עם היסטוריית פעולות

**רמה: קשה**

כתבי מחלקה בשם `DigitalWallet`.

המחלקה מקבלת ב־`constructor` בעלים ויתרה התחלתית.

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
deposit(amount, description)
withdraw(amount, description)
getBalance()
getTransactions()
getTransactionCount()
```

דרישות:

* היתרה והיסטוריית הפעולות לא יהיו נגישות ישירות מחוץ למחלקה.
* `deposit(amount, description)` מוסיפה כסף ליתרה ושומרת פעולה בהיסטוריה.
* `withdraw(amount, description)` מורידה כסף רק אם יש מספיק כסף.
* סכום שלילי או אפס אינו חוקי.
* כל פעולה בהיסטוריה צריכה לכלול:

  * סוג פעולה: `"הפקדה"` או `"משיכה"`
  * סכום
  * תיאור
  * יתרה לאחר הפעולה
* `getTransactions()` מחזירה את כל הפעולות שבוצעו.
* `getTransactionCount()` מחזירה כמה פעולות בוצעו.

### שימוש צפוי

```js
const wallet = new DigitalWallet("נועה", 100);

wallet.deposit(50, "מתנה");
wallet.withdraw(30, "קניית ספר");

console.log(wallet.getBalance());
// 120

console.log(wallet.getTransactionCount());
// 2

console.log(wallet.getTransactions());
```

---

## 10. מערכת קורס דיגיטלית

**רמה: קשה**

כתבי מחלקה בשם `OnlineCourse`.

המחלקה מקבלת ב־`constructor` שם קורס ומערך של שיעורים.

כל שיעור יהיה אובייקט בפורמט:

```js
{
  title: "מבוא ל־JavaScript",
  duration: 30
}
```

המחלקה צריכה לכלול את המתודות הציבוריות:

```js
enrollStudent(studentName)
completeLesson(studentName, lessonTitle)
getStudentProgress(studentName)
getCourseSummary()
```

דרישות:

* ניתן לרשום תלמידה לקורס פעם אחת בלבד.
* תלמידה מתחילה עם 0 שיעורים שהושלמו.
* `completeLesson(studentName, lessonTitle)` מסמנת שיעור כהושלם עבור התלמידה.
* אסור לסמן שיעור שלא קיים בקורס.
* אסור לסמן את אותו שיעור פעמיים עבור אותה תלמידה.
* `getStudentProgress(studentName)` מחזירה:

  * מספר שיעורים שהושלמו
  * מספר שיעורים כולל
  * אחוז התקדמות
* אם תלמידה השלימה את כל השיעורים, יש להוסיף לסיכום שלה:
  `"הקורס הושלם"`.

### שימוש צפוי

```js
const course = new OnlineCourse("JavaScript למתחילות", [
  { title: "משתנים", duration: 20 },
  { title: "תנאים", duration: 30 },
  { title: "לולאות", duration: 40 }
]);

course.enrollStudent("רוני");

course.completeLesson("רוני", "משתנים");
course.completeLesson("רוני", "תנאים");

console.log(course.getStudentProgress("רוני"));
// למשל: "2 מתוך 3 שיעורים הושלמו — 66.67%"
```
