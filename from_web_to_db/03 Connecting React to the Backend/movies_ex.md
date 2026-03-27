---

# תרגיל: REST API של ספריית סרטים

## מטרה

לבנות שרת קטן עם **Express** עבור ספריית סרטים.

בתרגיל הזה נתרגל:

* `GET`
* `DELETE`
* `POST`
* `PUT`
* middlewares בסיסיים
* טיפול בשגיאות
* עבודה עם `route params`
* עבודה עם `query params`

> חשוב: הנתונים נשמרים רק במערך בזיכרון, לא במסד נתונים.

---

# הנתונים

השתמשו במערך הבא:

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

## 1. `GET /movies`

החזירו את כל הסרטים.

---

## 2. `GET /movies/:id`

החזירו סרט אחד לפי `id`.

---

## 3. `GET /movies?genre=...`

החזירו סרטים לפי ז׳אנר באמצעות **query parameter**.

### דוגמה:

```txt
GET /movies?genre=Animation
```

### שימו לב

פעם היינו מממשים את זה כך:

```txt
GET /movies/genre/:genre
```

אבל עכשיו צריך לשנות את זה ולעבוד עם:

```txt
GET /movies?genre=Animation
```

כלומר:

- לא דרך `route param`
- אלא דרך `query param`

---

## 4. `DELETE /movies/:id`

מחקו סרט לפי `id`.

---

## 5. `POST /movies`

הוסיפו סרט חדש למערך.

### המידע יגיע ב־body

לדוגמה:

```json
{
  "title": "Interstellar",
  "genre": "Sci-Fi",
  "year": 2014
}
```

### מה צריך לקרות

- לבדוק שכל השדות הדרושים קיימים
- ליצור `id` חדש
- להוסיף את הסרט למערך
- להחזיר תשובה עם סטטוס מתאים

---

## 6. `PUT /movies/:id`

עדכנו סרט קיים לפי `id`.

### המידע לעדכון יגיע ב־body

לדוגמה:

```json
{
  "title": "Shrek Forever",
  "genre": "Animation",
  "year": 2010
}
```

### מה צריך לקרות

- לבדוק שה־`id` תקין
- לבדוק שהסרט קיים
- לבדוק שהגיע body תקין
- לעדכן את הסרט
- להחזיר את הסרט המעודכן

---

# משימה נוספת נפרדת

## שינוי דרך הסינון לפי ז׳אנר

אם מימשתם קודם סינון כך:

```txt
GET /movies/genre/:genre
```

שנו את המימוש כך שיעבוד עם:

```txt
GET /movies?genre=Animation
```

### מה המטרה של המשימה?

להבין את ההבדל בין:

- `route params` → כשמדובר במשאב מסוים, למשל `:id`
- `query params` → כשמדובר בסינון, חיפוש או מיון

### רמז

- `id` בדרך כלל יהיה ב־route
- `genre` במקרה הזה יהיה ב־query

---

# Middlewares שצריך להוסיף

## 1. Logger middleware

middleware שמדפיס כל בקשה שנכנסת:

- method
- url

### דוגמה:

```txt
GET /movies
POST /movies
DELETE /movies/2
```

### מה התפקיד שלו?

לעזור לנו לראות אילו בקשות נכנסות לשרת.

---

## 2. Request time middleware

middleware שמוסיף ל־`req` שדה בשם:

```js
req.requestTime;
```

### מה התפקיד שלו?

להראות ש־middleware יכול גם להוסיף מידע לבקשה.

---

## 3. Authorization middleware

middleware שבודק אם הגיע header בשם:

```txt
authorization
```

והאם הערך שלו הוא:

```txt
movies-secret
```

אם לא:

- יש להחזיר `401`
- עם הודעה מתאימה

### מה התפקיד שלו?

להגן על ה־API לפני שמגיעים ל־routes עצמם.

---

## 4. Not found middleware

אם אין route מתאים:

- להחזיר `404`

### מה התפקיד שלו?

להחזיר תשובה מסודרת עבור כתובת שלא קיימת.

---

## 5. Error handling middleware

middleware מרכזי לטיפול בשגיאות.

### מה התפקיד שלו?

לרכז את הטיפול בשגיאות במקום אחד.

---

# רמזים לשגיאות אפשריות בכל endpoint

## `GET /movies`

שגיאות אפשריות:

- אין authorization
- שגיאה כללית בשרת

---

## `GET /movies/:id`

שגיאות אפשריות:

- `id` לא מספר
- לא נמצא סרט עם ה־id הזה
- אין authorization

---

## `GET /movies?genre=...`

שגיאות אפשריות:

- אין authorization
- לא נמצא אף סרט בז׳אנר הזה

### רמז

מה צריך לקרות אם שולחים:

```txt
GET /movies?genre=Horror
```

ואין סרטים כאלה?

---

## `DELETE /movies/:id`

שגיאות אפשריות:

- `id` לא מספר
- הסרט לא קיים
- אין authorization

---

## `POST /movies`

שגיאות אפשריות:

- אין authorization
- חסר אחד השדות: `title`, `genre`, `year`
- `year` אינו מספר
- body ריק

---

## `PUT /movies/:id`

שגיאות אפשריות:

- אין authorization
- `id` לא תקין
- הסרט לא קיים
- body ריק
- אחד השדות לא תקין
- `year` אינו מספר

---

# הסבר קצר על route param מול query param

## Route param

ערך שמופיע כחלק מהנתיב עצמו.

### דוגמה:

```txt
/movies/2
```

כאן `2` הוא ה־id של הסרט.

ב־Express ניגש אליו דרך:

```js
req.params.id;
```

---

## Query param

ערך שמופיע אחרי סימן שאלה ב־URL.

### דוגמה:

```txt
/movies?genre=Animation
```

כאן `genre=Animation` הוא תנאי סינון.

ב־Express ניגש אליו דרך:

```js
req.query.genre;
```

---

# מה צריך לזכור

## מתי משתמשים ב־route param?

כשמדובר בפריט מסוים.

### דוגמה:

- סרט לפי `id`
- משתמש לפי `id`

---

## מתי משתמשים ב־query param?

כשמדובר בסינון, חיפוש, מיון או pagination.

### דוגמה:

- סרטים לפי ז׳אנר
- סרטים לפי שנה
- סרטים לפי סדר מסוים

---

# דוגמאות לבקשות לבדיקה

## קבלת כל הסרטים

```txt
GET /movies
```

---

## קבלת סרט לפי id

```txt
GET /movies/2
```

---

## סינון לפי ז׳אנר

```txt
GET /movies?genre=Animation
```

---

## מחיקת סרט

```txt
DELETE /movies/2
```

---

## הוספת סרט

```txt
POST /movies
```

Body:

```json
{
  "title": "Interstellar",
  "genre": "Sci-Fi",
  "year": 2014
}
```

---

## עדכון סרט

```txt
PUT /movies/2
```

Body:

```json
{
  "title": "Shrek Forever",
  "genre": "Animation",
  "year": 2010
}
```

---

# שאלות חשיבה

1. למה `id` מתאים ל־route param אבל `genre` מתאים ל־query param?

2. מה ההבדל בין:

```txt
GET /movies/2
```

לבין:

```txt
GET /movies?genre=Animation
```

3. מה צריך לקרות אם ב־`POST /movies` חסר `title`?

4. מה צריך לקרות אם ב־`PUT /movies/:id` מנסים לעדכן סרט שלא קיים?

5. מה הסטטוס המתאים להחזרת סרט חדש שנוצר?

---

# בונוס

הוסיפו גם תמיכה ב־query param נוסף:

```txt
GET /movies?genre=Animation&year=2001
```

כלומר:

- גם סינון לפי ז׳אנר
- וגם סינון לפי שנה

---

# סדר מומלץ בקובץ

1. imports
2. data array
3. app creation
4. global middlewares
5. routes
6. not found middleware
7. error middleware
8. `app.listen(...)`

---

# מטרה סופית

בסוף התרגיל השרת שלכם צריך להדגים:

- REST API בסיסי
- CRUD כמעט מלא
- `GET`, `POST`, `PUT`, `DELETE`
- שימוש נכון ב־`route params`
- שימוש נכון ב־`query params`
- middleware flow
- טיפול מסודר בשגיאות

---
