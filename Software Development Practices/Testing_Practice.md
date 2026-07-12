<div dir="rtl">

# תרגול Testing ב־JavaScript

## Node Test Runner, Assertions, Mocks ושגיאות

הקובץ הזה מרכז תרגול מעשי על הנושאים שלמדנו בשיעור:

- כתיבת Unit Tests ב־JavaScript
- שימוש ב־`node:test`
- שימוש ב־`node:assert/strict`
- בדיקת ערכים, מערכים ואובייקטים
- שימוש ב־Mock
- בדיקת מספר הקריאות ל־Mock
- בדיקת פונקציה שזורקת שגיאה
- כתיבת טסטים לפי Arrange, Act, Assert

---

# חלק א — סיכום קצר

## מהו Unit Test?

Unit Test היא בדיקה של יחידה קטנה ומבודדת בקוד.

למשל:

- פונקציה
- מתודה
- מחלקה קטנה
- מודול

המטרה היא לבדוק התנהגות אחת ברורה בכל טסט.

לדוגמה:

```js
function add(a, b) {
  return a + b;
}
```

נוכל לבדוק שהפונקציה מחזירה `5` כאשר מעבירים לה `2` ו־`3`.

---

## מבנה בסיסי של טסט

```js
const test = require('node:test');
const assert = require('node:assert/strict');

test('description of the expected behavior', () => {
  // Arrange
  const input = 2;

  // Act
  const result = input * 2;

  // Assert
  assert.strictEqual(result, 4);
});
```

---

## Arrange, Act, Assert

### Arrange — הכנה

מכינות את הנתונים, הקלטים והתלויות.

### Act — פעולה

מפעילות את הפונקציה או המתודה שאותה בודקות.

### Assert — בדיקה

משוות בין התוצאה בפועל לתוצאה הצפויה.

---

# חלק ב — פקודות שימושיות

## בדיקת גרסת Node

```bash
node --version
```

## יצירת פרויקט

```bash
mkdir testing-practice
cd testing-practice
npm init -y
```

## יצירת קובץ בדיקה

```bash
touch math.test.js
```

## הרצת קובץ בדיקה מסוים

```bash
node --test math.test.js
```

## הרצת כל קובצי הבדיקות בפרויקט

```bash
node --test
```

## הרצת בדיקות במצב Watch

```bash
node --test --watch
```

---

# חלק ג — Assertions

## strictEqual

מתאים בעיקר לערכים פשוטים כמו מספרים, מחרוזות, בוליאנים, `null` ו־`undefined`.

```js
assert.strictEqual(actual, expected);
```

דוגמה:

```js
assert.strictEqual(2 + 3, 5);
```

## notStrictEqual

בודק ששני ערכים אינם זהים.

```js
assert.notStrictEqual(actual, unexpected);
```

## deepStrictEqual

מתאים להשוואת מערכים ואובייקטים.

```js
assert.deepStrictEqual(actual, expected);
```

## ok

בודק שערך הוא Truthy.

```js
assert.ok(value);
```

## throws

בודק שפונקציה זורקת שגיאה.

```js
assert.throws(
  () => functionUnderTest(),
  Error
);
```

חשוב להעביר פונקציה ל־`assert.throws`, ולא להפעיל אותה מראש.

נכון:

```js
assert.throws(
  () => divide(10, 0),
  Error
);
```

לא נכון:

```js
assert.throws(
  divide(10, 0),
  Error
);
```

---

# חלק ד — Mocks

Mock הוא תחליף לתלות אמיתית בזמן בדיקה.

למשל, במקום לקרוא באמת קובץ, API, מסד נתונים או שירות חיצוני, אפשר להחליף את הפונקציה בתוצאה צפויה.

```js
const { mock } = require('node:test');

const service = {
  fetch() {
    return ['real value'];
  },
};

const fetchMock = mock.method(
  service,
  'fetch',
  () => ['fake value']
);
```

בדיקת מספר הקריאות:

```js
assert.strictEqual(
  fetchMock.mock.callCount(),
  1
);
```

---

# תרגיל 1 — פונקציות חשבון ו־assert

## מטרה

לתרגל `strictEqual`, כתיבת כמה טסטים והפרדה בין קוד המערכת לקוד הבדיקות.

## דרישות

צרו שני קבצים:

```text
math.js
math.test.js
```

בקובץ `math.js` כתבו את הפונקציות:

```js
add(a, b)
subtract(a, b)
multiply(a, b)
```

בקובץ `math.test.js` כתבו טסט נפרד לכל פונקציה.

בדקו לפחות:

1. חיבור של שני מספרים חיוביים
2. חיסור
3. כפל
4. חיבור מספר שלילי
5. כפל ב־0

<details>
<summary>פתרון אפשרי</summary>

### math.js

```js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  add,
  subtract,
  multiply,
};
```

### math.test.js

```js
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  add,
  subtract,
  multiply,
} = require('./math');

test('add should add two positive numbers', () => {
  assert.strictEqual(add(2, 3), 5);
});

test('subtract should return the difference', () => {
  assert.strictEqual(subtract(10, 4), 6);
});

test('multiply should multiply two numbers', () => {
  assert.strictEqual(multiply(3, 4), 12);
});

test('add should support negative numbers', () => {
  assert.strictEqual(add(-2, 5), 3);
});

test('multiply by zero should return zero', () => {
  assert.strictEqual(multiply(100, 0), 0);
});
```

</details>

---

# תרגיל 2 — עבודה עם מערכים ואובייקטים

## מטרה

לתרגל `deepStrictEqual`, `ok`, טסטים על מערכים וטסטים על אובייקטים.

## דרישות

צרו פונקציה:

```js
getActiveUsers(users)
```

הפונקציה מקבלת מערך משתמשים ומחזירה רק משתמשים שעבורם `isActive === true`.

כתבו בדיקות שבודקות:

1. מוחזרים רק משתמשים פעילים
2. מערך ריק מחזיר מערך ריק
3. אם אין משתמשים פעילים, מוחזר מערך ריק
4. התוצאה היא מערך
5. כל המשתמשים בתוצאה באמת פעילים

<details>
<summary>פתרון אפשרי</summary>

### users.js

```js
function getActiveUsers(users) {
  return users.filter((user) => user.isActive === true);
}

module.exports = {
  getActiveUsers,
};
```

### users.test.js

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { getActiveUsers } = require('./users');

test('should return only active users', () => {
  const users = [
    { id: 1, name: 'Dana', isActive: true },
    { id: 2, name: 'Noa', isActive: false },
    { id: 3, name: 'Roni', isActive: true },
  ];

  const result = getActiveUsers(users);

  assert.deepStrictEqual(result, [
    { id: 1, name: 'Dana', isActive: true },
    { id: 3, name: 'Roni', isActive: true },
  ]);
});

test('empty array should return an empty array', () => {
  assert.deepStrictEqual(getActiveUsers([]), []);
});

test('result should be an array', () => {
  assert.ok(Array.isArray(getActiveUsers([])));
});
```

</details>

---

# תרגיל 3 — פונקציה שזורקת שגיאה

## מטרה

לתרגל `assert.throws`, בדיקת סוג שגיאה, בדיקת הודעת שגיאה ומקרי קצה.

## דרישות

צרו פונקציה:

```js
divide(a, b)
```

הפונקציה צריכה:

1. להחזיר תוצאת חילוק רגילה
2. לזרוק `RangeError` כאשר `b === 0`
3. הודעת השגיאה צריכה להיות `Cannot divide by zero`

כתבו בדיקות שבודקות:

1. חילוק תקין
2. חילוק עם מספר שלילי
3. חלוקה ב־0 זורקת שגיאה
4. סוג השגיאה הוא `RangeError`
5. הודעת השגיאה נכונה

<details>
<summary>פתרון אפשרי</summary>

### calculator.js

```js
function divide(a, b) {
  if (b === 0) {
    throw new RangeError('Cannot divide by zero');
  }

  return a / b;
}

module.exports = {
  divide,
};
```

### calculator.test.js

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { divide } = require('./calculator');

test('divide should divide two numbers', () => {
  assert.strictEqual(divide(10, 2), 5);
});

test('divide should support a negative divisor', () => {
  assert.strictEqual(divide(10, -2), -5);
});

test('divide should throw the correct error', () => {
  assert.throws(
    () => divide(10, 0),
    {
      name: 'RangeError',
      message: 'Cannot divide by zero',
    }
  );
});
```

</details>

---

# תרגיל 4 — Mock של פונקציית fetch

## מטרה

לתרגל Mock, החלפת מתודה, בדיקת תוצאה ובדיקת מספר קריאות.

## דרישות

צרו אובייקט `listService` עם שתי מתודות:

```js
fetch()
decorateFetchedList()
```

המימוש המקורי של `fetch` יחזיר:

```js
[1, 2, 3]
```

`decorateFetchedList` צריכה להפעיל את `fetch` ולהחזיר כל ערך עטוף בכוכביות.

בטסט:

1. החליפו את `fetch` ב־Mock
2. ה־Mock תחזיר `['a', 'b', 'c']`
3. בדקו שהתוצאה היא `['*a*', '*b*', '*c*']`
4. בדקו ש־`fetch` הופעלה פעם אחת

<details>
<summary>פתרון אפשרי</summary>

### list-service.js

```js
const listService = {
  fetch() {
    return [1, 2, 3];
  },

  decorateFetchedList() {
    const input = this.fetch();
    return input.map((value) => `*${value}*`);
  },
};

module.exports = {
  listService,
};
```

### list-service.test.js

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { mock } = require('node:test');
const { listService } = require('./list-service');

test('decorateFetchedList should use the mocked fetch result', () => {
  const fetchMock = mock.method(
    listService,
    'fetch',
    () => ['a', 'b', 'c']
  );

  const result = listService.decorateFetchedList();

  assert.deepStrictEqual(result, ['*a*', '*b*', '*c*']);
  assert.strictEqual(fetchMock.mock.callCount(), 1);
});
```

</details>

---

# תרגיל 5 — שירות משתמשים עם Mock ושגיאה

## מטרה

לשלב `assert`, Mock, בדיקת קריאות, פונקציה שזורקת שגיאה ו־Dependency Injection.

## תיאור

ניצור מחלקה בשם `UserService`.

המחלקה תקבל ב־constructor אובייקט בשם `userRepository`.

ל־repository יש מתודה:

```js
findById(id)
```

המתודה של השירות:

```js
getUserName(id)
```

צריכה:

1. לקרוא ל־`userRepository.findById(id)`
2. אם המשתמש נמצא, להחזיר את השם שלו
3. אם המשתמש לא נמצא, לזרוק `new Error('User not found')`

## דרישות בדיקה

1. מוחזר שם המשתמש
2. ה־repository נקרא בדיוק פעם אחת
3. ה־repository נקרא עם ה־ID הנכון
4. אם ה־repository מחזיר `null`, נזרקת שגיאה
5. הודעת השגיאה היא `User not found`

<details>
<summary>פתרון אפשרי</summary>

### user-service.js

```js
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  getUserName(id) {
    const user = this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user.name;
  }
}

module.exports = UserService;
```

### user-service.test.js

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { mock } = require('node:test');
const UserService = require('./user-service');

test('getUserName should return the user name', () => {
  const userRepository = {
    findById() {
      return null;
    },
  };

  const findByIdMock = mock.method(
    userRepository,
    'findById',
    () => ({ id: 7, name: 'Dana' })
  );

  const userService = new UserService(userRepository);
  const result = userService.getUserName(7);

  assert.strictEqual(result, 'Dana');
  assert.strictEqual(findByIdMock.mock.callCount(), 1);
  assert.deepStrictEqual(findByIdMock.mock.calls[0].arguments, [7]);
});

test('getUserName should throw when the user does not exist', () => {
  const userRepository = {
    findById() {
      return null;
    },
  };

  const findByIdMock = mock.method(
    userRepository,
    'findById',
    () => null
  );

  const userService = new UserService(userRepository);

  assert.throws(
    () => userService.getUserName(100),
    {
      name: 'Error',
      message: 'User not found',
    }
  );

  assert.strictEqual(findByIdMock.mock.callCount(), 1);
  assert.deepStrictEqual(findByIdMock.mock.calls[0].arguments, [100]);
});
```

</details>

---

# שאלות חזרה

1. מהו Assertion?
2. מתי משתמשים ב־`strictEqual`?
3. מתי משתמשים ב־`deepStrictEqual`?
4. מהו Mock?
5. למה משתמשים ב־Mock?
6. מה בודק `callCount()`?
7. למה משתמשים ב־`assert.throws`?
8. למה חייבים להעביר פונקציה ל־`assert.throws`?
9. מה ההבדל בין Unit Test ל־Integration Test?
10. למה כדאי לכתוב טסט נפרד לכל התנהגות?

---

# צ'קליסט

- [ ] יצרתי פרויקט Node
- [ ] יצרתי קובצי `.test.js`
- [ ] השתמשתי ב־`node:test`
- [ ] השתמשתי ב־`node:assert/strict`
- [ ] כתבתי בדיקות עם `strictEqual`
- [ ] כתבתי בדיקות עם `deepStrictEqual`
- [ ] כתבתי בדיקה עם `ok`
- [ ] כתבתי בדיקה עם `assert.throws`
- [ ] יצרתי Mock
- [ ] בדקתי את מספר הקריאות ל־Mock
- [ ] בדקתי את הפרמטרים שהועברו ל־Mock
- [ ] הרצתי את כל הבדיקות עם `node --test`

</div>
