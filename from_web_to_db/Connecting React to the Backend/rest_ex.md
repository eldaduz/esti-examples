# תרגיל: REST API של ספריית סרטים

אתם בונים שרת קטן לניהול ספריית סרטים.

יש לכם מערך סרטים בזיכרון, ואתם צריכים לממש כמה endpoints לקריאה ומחיקה, יחד עם כמה middlewares בסיסיים.

## הנתונים

לשרת יהיה מערך סרטים כזה:

```js
let movies = [
  { id: 1, title: "Titanic", genre: "Drama", year: 1997 },
  { id: 2, title: "Shrek", genre: "Animation", year: 2001 },
  { id: 3, title: "Inception", genre: "Sci-Fi", year: 2010 },
  { id: 4, title: "Frozen", genre: "Animation", year: 2013 },
];
```

---

# מה צריך לממש

## Endpoints

### 1. `GET /movies`

מחזיר את כל הסרטים.

---

### 2. `GET /movies/:id`

מחזיר סרט אחד לפי `id`.

---

### 3. `GET /movies/genre/:genre`

מחזיר את כל הסרטים מז׳אנר מסוים.

לדוגמה:

```txt
GET /movies/genre/Animation
```

---

### 4. `DELETE /movies/:id`

מוחק סרט לפי `id`.

---

# Middlewares שצריך להוסיף

## 1. middleware ללוג

שידפיס כל בקשה שנכנסת:

- method
- url

---

## 2. middleware שמוסיף זמן לבקשה

יוסיף ל־`req` שדה בשם `requestTime`.

---

## 3. middleware של בדיקת מפתח גישה

השרת יבדוק אם הגיע header בשם:

```txt
authorization
```

אם הערך שלו אינו:

```txt
movies-secret
```

יש להחזיר:

```txt
401 Unauthorized
```

---

## 4. middleware לנתיב שלא קיים

אם אין route מתאים — להחזיר `404`.

---

## 5. middleware מרכזי לטיפול בשגיאות

אם יש שגיאה בשרת, להחזיר תשובה מסודרת עם:

- message
- status code מתאים

---

# רמזים לשגיאות אפשריות בכל endpoint

## `GET /movies`

שגיאות אפשריות:

- אם אין authorization מתאים
- אם משהו כללי בשרת נשבר

---

## `GET /movies/:id`

שגיאות אפשריות:

- `id` לא מספר
- לא נמצא סרט עם ה־id הזה
- אין authorization

---

## `GET /movies/genre/:genre`

שגיאות אפשריות:

- לא נמצא אף סרט בז׳אנר הזה
- אין authorization

---

## `DELETE /movies/:id`

שגיאות אפשריות:

- `id` לא מספר
- הסרט לא קיים
- אין authorization

---

# מה כל middleware עושה

## middleware 1 — לוג

תפקידו להדפיס לקונסול איזו בקשה נכנסה.

דוגמה:

```txt
GET /movies
DELETE /movies/2
```

### למה זה טוב?

כדי לעקוב אחרי בקשות שנכנסות לשרת.

---

## middleware 2 — זמן בקשה

תפקידו להוסיף מידע לבקשה, למשל מתי היא הגיעה.

### למה זה טוב?

כדי להראות לתלמידים ש־middleware יכול גם להוסיף מידע ל־`req`, לא רק לבדוק משהו.

---

## middleware 3 — authorization

תפקידו לבדוק אם המשתמש שלח header מתאים.

### למה זה טוב?

כדי להראות איך אפשר להגן על routes לפני שמגיעים אליהם בכלל.

---

## middleware 4 — route not found

אם אף endpoint לא מתאים, middleware זה מחזיר `404`.

### למה זה טוב?

כדי שתמיד תהיה תשובה מסודרת גם לכתובת לא קיימת.

---

## middleware 5 — error handler

תפקידו לרכז את כל השגיאות במקום אחד.

### למה זה טוב?

במקום לטפל בכל שגיאה בנפרד בכל route, אפשר להעביר שגיאות ל־middleware הזה.

---

# הוראות לתלמידים

ממשו את השרת כך ש:

- כל בקשה תעבור קודם ב־middlewares
- אם יש בעיית authorization, השרת יחזיר `401`
- אם `id` לא תקין, תיווצר שגיאה מתאימה
- אם לא נמצא סרט, תחזור תשובת `404`
- אם הכול תקין, תחזור תשובה מתאימה ב־JSON

---

# בונוס לחשיבה

נסו לחשוב:

- מה יקרה אם המשתמש שולח:

```txt
GET /movies/abc
```

- מה יקרה אם המשתמש שולח:

```txt
GET /movies/genre/Horror
```

- מה יקרה אם המשתמש שולח בקשה בלי header של authorization
