# חלק א׳ — Classes, Objects, Constructor ומתודות

## תרגיל 1 — תלמידה מציגה את עצמה

**רמה: קלה**

כתבי מחלקה בשם `Student`.

לכל תלמידה יהיו:

* `name`
* `grade`

המחלקה תקבל את הערכים האלה ב־`constructor`.

הוסיפי מתודה בשם `introduce` שמדפיסה:

```text
היי, קוראים לי דנה ואני בכיתה ח
```

### דוגמה

```js
const student1 = new Student("דנה", "ח");
student1.introduce();
```

פלט:

```text
היי, קוראים לי דנה ואני בכיתה ח
```

---

## תרגיל 2 — מוצר וחישוב מחיר אחרי הנחה

**רמה: קלה**

כתבי מחלקה בשם `Product`.

לכל מוצר יהיו:

* `name`
* `price`

הוסיפי מתודה בשם `getPriceAfterDiscount(discount)`.

המתודה מקבלת אחוז הנחה ומחזירה את המחיר לאחר ההנחה.

### דוגמאות

```js
const shirt = new Product("חולצה", 100);

console.log(shirt.getPriceAfterDiscount(20));
// 80
```

```js
const book = new Product("ספר", 50);

console.log(book.getPriceAfterDiscount(10));
// 45
```

אפשר להניח שההנחה תהיה בין `0` ל־`100`.

---

## תרגיל 3 — נורה

**רמה: קלה**

כתבי מחלקה בשם `LightBulb`.

לנורה יהיה מאפיין אחד:

```js
isOn
```

כשהנורה נוצרת, היא כבויה:

```js
isOn = false
```

הוסיפי שתי מתודות:

```js
turnOn()
turnOff()
```

כל מתודה משנה את מצב הנורה ומדפיסה הודעה מתאימה.

### דוגמה

```js
const light = new LightBulb();

light.turnOn();
// הנורה דולקת

light.turnOff();
// הנורה כבויה
```

---

## תרגיל 4 — חשבון משחק

**רמה: בינונית**

כתבי מחלקה בשם `GamePlayer`.

לכל שחקן יהיו:

* `name`
* `score`

כשהשחקן נוצר, הציון ההתחלתי שלו הוא `0`.

הוסיפי מתודות:

```js
addPoints(points)
showScore()
```

`addPoints(points)` מוסיפה נקודות לציון.

`showScore()` מדפיסה הודעה בפורמט:

```text
לנועה יש 15 נקודות
```

### דוגמה

```js
const player = new GamePlayer("נועה");

player.addPoints(10);
player.addPoints(5);
player.showScore();
```

פלט:

```text
לנועה יש 15 נקודות
```

---

## תרגיל 5 — רשימת משימות

**רמה: בינונית**

כתבי מחלקה בשם `TodoList`.

לכל רשימה יהיו:

* `title`
* `tasks` — מערך ריק בהתחלה

הוסיפי מתודות:

```js
addTask(task)
showTasks()
countTasks()
```

### דרישות

`addTask(task)` מוסיפה משימה למערך.

`showTasks()` מדפיסה את כל המשימות, כל משימה בשורה נפרדת.

`countTasks()` מחזירה כמה משימות קיימות ברשימה.

### דוגמה

```js
const myTasks = new TodoList("משימות ליום ראשון");

myTasks.addTask("ללמוד JavaScript");
myTasks.addTask("להגיש שיעורי בית");
myTasks.addTask("לצאת להליכה");

myTasks.showTasks();
```

פלט אפשרי:

```text
משימות ליום ראשון:
1. ללמוד JavaScript
2. להגיש שיעורי בית
3. לצאת להליכה
```

```js
console.log(myTasks.countTasks());
// 3
```

---

# חלק ב׳ — Encapsulation

בתרגילים הבאים צריך להשתמש במאפיינים פרטיים בעזרת `#`.

כלומר, הנתון הפנימי של האובייקט לא אמור להשתנות ישירות מבחוץ, אלא רק דרך מתודות מסודרות.

---

## תרגיל 6 — מונה פרטי

**רמה: בינונית**

כתבי מחלקה בשם `Counter`.

למחלקה יהיה מאפיין פרטי:

```js
#count
```

כשהמונה נוצר, הערך שלו מתחיל ב־`0`.

הוסיפי מתודות:

```js
increment()
decrement()
getCount()
```

### דרישות

`increment()` מגדילה את המונה ב־1.

`decrement()` מקטינה את המונה ב־1, אבל אסור שהמונה יהיה שלילי.

אם מנסים להקטין כשהמונה כבר `0`, יש להדפיס:

```text
אי אפשר לרדת מתחת ל־0
```

`getCount()` מחזירה את הערך הנוכחי.

### דוגמה

```js
const counter = new Counter();

counter.increment();
counter.increment();

console.log(counter.getCount());
// 2

counter.decrement();

console.log(counter.getCount());
// 1
```

---

## תרגיל 7 — ארנק דיגיטלי

**רמה: בינונית**

כתבי מחלקה בשם `Wallet`.

לארנק יהיה מאפיין פרטי:

```js
#balance
```

כשהארנק נוצר, אפשר לקבל סכום התחלתי. אם לא התקבל סכום, היתרה מתחילה מ־`0`.

הוסיפי מתודות:

```js
addMoney(amount)
spendMoney(amount)
getBalance()
```

### דרישות

`addMoney(amount)` מוסיפה כסף לארנק.

אם `amount` קטן או שווה ל־0, הדפיסי:

```text
סכום ההוספה חייב להיות גדול מ־0
```

`spendMoney(amount)` מורידה כסף מהארנק.

אם הסכום קטן או שווה ל־0, הדפיסי:

```text
סכום ההוצאה חייב להיות גדול מ־0
```

אם אין מספיק כסף בארנק, הדפיסי:

```text
אין מספיק כסף בארנק
```

`getBalance()` מחזירה את היתרה.

### דוגמה

```js
const wallet = new Wallet(100);

wallet.addMoney(50);
wallet.spendMoney(80);

console.log(wallet.getBalance());
// 70
```

```js
wallet.spendMoney(100);
// אין מספיק כסף בארנק
```

---

## תרגיל 8 — חשבון ספרייה

**רמה: בינונית**

כתבי מחלקה בשם `LibraryAccount`.

לכל חשבון יהיו:

* `ownerName` — מאפיין רגיל וציבורי
* `#borrowedBooks` — מערך פרטי של ספרים מושאלים

כשהחשבון נוצר, מערך הספרים צריך להתחיל ריק.

הוסיפי מתודות:

```js
borrowBook(bookName)
returnBook(bookName)
getBorrowedBooks()
getBorrowedBooksCount()
```

### דרישות

`borrowBook(bookName)` מוסיפה ספר לרשימת הספרים המושאלים.

אסור להשאיל את אותו ספר פעמיים. במקרה כזה הדפיסי:

```text
הספר כבר מושאל לחשבון הזה
```

`returnBook(bookName)` מחזירה ספר, כלומר מסירה אותו מהמערך.

אם הספר לא נמצא ברשימה, הדפיסי:

```text
הספר לא נמצא בחשבון
```

`getBorrowedBooks()` מחזירה מערך עם הספרים המושאלים.

`getBorrowedBooksCount()` מחזירה כמה ספרים מושאלים כרגע.

### דוגמה

```js
const account = new LibraryAccount("דני");

account.borrowBook("Harry Potter");
account.borrowBook("The Hobbit");

console.log(account.getBorrowedBooksCount());
// 2

console.log(account.getBorrowedBooks());
// ["Harry Potter", "The Hobbit"]

account.returnBook("Harry Potter");

console.log(account.getBorrowedBooks());
// ["The Hobbit"]
```
