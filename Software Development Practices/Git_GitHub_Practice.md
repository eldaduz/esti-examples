<div dir="rtl">

# תרגול מסכם - Git ו-GitHub

## סיכום קצר

### מהו Git?

Git הוא כלי לניהול גרסאות. הוא מאפשר לנו לעקוב אחרי שינויים בקוד, לשמור נקודות זמן משמעותיות, לעבוד בענפים נפרדים, לחזור לגרסאות קודמות ולשלב עבודה של כמה מפתחות.

### מהו GitHub?

GitHub היא פלטפורמה שמארחת Repositories מרוחקים. Git פועל על המחשב שלנו; GitHub מאפשר לשמור ולשתף את ה-Repository בענן, לעבוד בצוות, לצפות ב-commits ולנהל תהליכי Code Review.

### שלושת אזורי העבודה ב-Git

1. **Workspace** - הקבצים שאנחנו עורכות כרגע.
2. **Staging Area** - השינויים שבחרנו להכניס ל-commit הבא.
3. **Local Repository** - היסטוריית ה-commits שנשמרה במחשב.

המעבר בין האזורים:

```bash
git add filename
git commit -m "Meaningful message"
```

### הפקודות המרכזיות

```bash
git init -b main              # יצירת Repository מקומי
git status                    # בדיקת מצב הפרויקט
git add filename              # הוספת קובץ ל-Staging Area
git add .                     # הוספת כל השינויים הרלוונטיים
git commit -m "Message"      # יצירת commit
git log --oneline             # הצגת היסטוריית commits
git branch                    # הצגת ענפים
git switch -c branch-name     # יצירה ומעבר לענף חדש
git switch main               # מעבר לענף main
git merge branch-name         # מיזוג ענף לתוך הענף הפעיל
git remote -v                 # הצגת ה-Remotes
git push                      # העלאת commits ל-Remote
git pull                      # משיכת שינויים ושילובם
git fetch                     # הורדת מידע בלי לשנות את הקבצים
git merge --abort             # ביטול merge שנמצא באמצע
```

> חשוב: לפני `git add .`, לפני `commit`, ולפני `push`, הריצו `git status` ובדקו מה עומד לקרות.

---

# תרגיל 1 - הקמת Repository והיסטוריה מסודרת

## מטרה

להקים Repository מקומי מאפס, ליצור מבנה פרויקט, לבצע כמה commits קטנים ומשמעותיים ולקרוא את ההיסטוריה.

## משימה

1. צרו תיקייה בשם `book-store` והיכנסו אליה.
2. אתחלו Repository עם ענף ראשי בשם `main`.
3. צרו את המבנה הבא:

```text
book-store/
├── README.md
├── src/
│   └── app.js
└── docs/
    └── requirements.txt
```

4. הכניסו ל-`README.md` כותרת ותיאור קצר של הפרויקט.
5. הכניסו ל-`src/app.js` קוד שמדפיס:

```js
console.log("Book Store is running");
```

6. הכניסו ל-`docs/requirements.txt` לפחות שלוש דרישות למערכת.
7. צרו **שלושה commits נפרדים**:
   - הוספת README.
   - הוספת קוד האפליקציה.
   - הוספת מסמך הדרישות.
8. הציגו את היסטוריית ה-commits בשורה אחת לכל commit.

## שאלות חשיבה

1. למה עדיף שלושה commits ולא commit אחד גדול?
2. מה יופיע ב-`git status` אחרי יצירת קובץ ולפני `git add`?
3. מה יופיע אחרי `git add` ולפני `git commit`?
4. האם `git add` מעלה משהו ל-GitHub?

## צ'קליסט

- [ ] הענף הראשי נקרא `main`.
- [ ] קיימים שלושה commits לפחות.
- [ ] לכל commit יש הודעה ברורה.
- [ ] `git status` נקי בסיום.
- [ ] `git log --oneline` מציג את שלושת השינויים.

---

# תרגיל 2 - עבודה בענף של פיצ'ר

## מטרה

להבין כיצד Branch מאפשר לעבוד על פיצ'ר בלי לשנות מיד את `main`.

## משימה

המשיכו מה-Repository של תרגיל 1.

1. ודאו שאתן על `main` ושאין שינויים שלא נשמרו.
2. צרו ענף חדש בשם:

```text
feature/add-book
```

3. בענף החדש, צרו קובץ:

```text
src/books.js
```

4. הוסיפו לקובץ מערך של שלושה ספרים:

```js
const books = [
  { id: 1, title: "Clean Code" },
  { id: 2, title: "You Don't Know JS" },
  { id: 3, title: "The Pragmatic Programmer" },
];

console.log(books);
```

5. בצעו commit עם הודעה משמעותית.
6. ודאו שהקובץ קיים בענף הפיצ'ר.
7. עברו בחזרה ל-`main` ובדקו האם הקובץ קיים.
8. חזרו לענף הפיצ'ר והציגו את היסטוריית ה-commits של כל הענפים:

```bash
git log --oneline --graph --all
```

## שאלות חשיבה

1. למה `books.js` אינו מופיע ב-`main` לפני merge?
2. האם הקובץ נמחק כאשר עוברים ל-`main`?
3. לאיזה ענף יתווסף commit חדש?
4. מה מסמנת הכוכבית בפלט של `git branch`?

## צ'קליסט

- [ ] נוצר branch בשם `feature/add-book`.
- [ ] ה-commit של `books.js` שייך לענף הפיצ'ר.
- [ ] הקובץ אינו קיים ב-`main` לפני merge.
- [ ] הגרף מציג לפחות שני ענפים.

---

# תרגיל 3 - Merge והשלמת פיצ'ר

## מטרה

לשלב פיצ'ר שהושלם חזרה לענף הראשי ולבדוק את התוצאה.

## משימה

1. ודאו שבענף `feature/add-book` כל השינויים נשמרו ב-commit.
2. עברו ל-`main`.
3. מזגו את `feature/add-book` לתוך `main`.
4. בדקו ש-`src/books.js` קיים כעת ב-`main`.
5. הריצו את הקובץ עם Node.js.
6. הוסיפו ל-README סעיף בשם `Features`, ובו ציינו שהמערכת כוללת רשימת ספרים.
7. צרו commit נוסף ב-`main` עבור עדכון התיעוד.
8. הציגו את גרף ההיסטוריה.

## שאלות חשיבה

1. מאיזה ענף צריך להריץ את פקודת ה-merge כדי להכניס שינוי ל-`main`?
2. מה ההבדל בין מעבר לענף לבין מיזוג ענף?
3. האם merge תמיד יוצר commit חדש?
4. למה חשוב לבדוק `git status` לפני merge?

## צ'קליסט

- [ ] ה-merge בוצע כאשר `main` היה הענף הפעיל.
- [ ] `books.js` קיים ב-`main`.
- [ ] הקוד רץ ללא שגיאה.
- [ ] README עודכן ב-commit נפרד.
- [ ] `git status` נקי.

---

# תרגיל 4 - חיבור ל-GitHub, Push ו-Pull

## מטרה

לחבר Repository מקומי ל-Remote, להעלות commits, ליצור שינוי מרוחק ולמשוך אותו למחשב.

## משימה

1. צרו ב-GitHub Repository חדש וריק בשם `book-store`.
2. אל תיצרו בו README אוטומטי, משום שכבר יש לכן היסטוריה מקומית.
3. חברו את ה-Repository המקומי ל-Remote בשם `origin`.
4. בדקו את כתובת ה-Remote.
5. דחפו את `main` בפעם הראשונה והגדירו upstream.
6. בדקו ב-GitHub שהקבצים וה-commits מופיעים.
7. ערכו דרך GitHub את `README.md` והוסיפו שורה:

```text
This repository is connected to GitHub.
```

8. צרו commit דרך ממשק GitHub.
9. במחשב המקומי, הריצו קודם `git fetch`.
10. בדקו האם קובץ ה-README המקומי כבר השתנה.
11. הריצו `git pull` ובדקו שוב את הקובץ.

## פקודות עזר

```bash
git remote add origin git@github.com:USERNAME/book-store.git
git remote -v
git push -u origin main
git fetch
git pull
```

## שאלות חשיבה

1. מה ההבדל בין Git לבין GitHub?
2. למה השינוי מ-GitHub לא מופיע מיד במחשב?
3. מה ההבדל בין `fetch` לבין `pull`?
4. האם `push` מעלה שינויים שלא נכנסו ל-commit?
5. מהו `origin`?

## צ'קליסט

- [ ] קיים Remote בשם `origin`.
- [ ] כל ה-commits המקומיים מופיעים ב-GitHub.
- [ ] `fetch` לא שינה את קובץ העבודה.
- [ ] `pull` עדכן את הקובץ המקומי.
- [ ] `main` המקומי והמרוחק מסונכרנים.

---

# תרגיל 5 - יצירה ופתרון של Merge Conflict

## מטרה

ליצור conflict באופן מבוקר, לקרוא את הסימונים, לפתור את הסתירה ולהשלים merge.

## משימה

1. ודאו שאתן על `main` ושמצב ה-Repository נקי.
2. צרו קובץ בשם `config.txt` עם התוכן:

```text
mode=development
```

3. שמרו אותו ב-commit ב-`main`.
4. צרו ענף חדש בשם `feature/production-mode`.
5. בענף החדש שנו את אותה שורה ל:

```text
mode=production
```

6. צרו commit.
7. חזרו ל-`main` ושנו את אותה שורה ל:

```text
mode=test
```

8. צרו commit נוסף.
9. נסו למזג את `feature/production-mode` לתוך `main`.
10. הציגו את הקובץ וקראו את סימוני ה-conflict.
11. פתרו את הסתירה כך שהתוכן הסופי יהיה:

```text
mode=production
fallback=test
```

12. מחקו את כל סימוני ה-conflict.
13. הוסיפו את הקובץ ל-Staging Area וצרו commit שמסיים את המיזוג.
14. הציגו את גרף ההיסטוריה.

## סימונים צפויים בקובץ

```text
<<<<<<< HEAD
mode=test
=======
mode=production
>>>>>>> feature/production-mode
```

## שאלות חשיבה

1. למה Git לא בחרה בעצמה בין `test` ל-`production`?
2. למה conflict אינו בהכרח שגיאה של המפתחת?
3. מה מייצג `HEAD` בסימוני ה-conflict?
4. אילו שורות חייבות להימחק לפני סיום המיזוג?
5. מה עושה `git merge --abort`?
6. למה צריך `git add` לאחר פתרון conflict?

## צ'קליסט

- [ ] נוצר conflict אמיתי.
- [ ] סימוני ה-conflict הוסרו מהקובץ.
- [ ] התוכן הסופי כולל שתי שורות תקינות.
- [ ] נוצר commit שמסיים את ה-merge.
- [ ] `git status` נקי.
- [ ] `git log --oneline --graph --all` מציג את שני הענפים והמיזוג.

---

# שאלות סיכום

1. מה ההבדל בין Workspace, Staging Area ו-Repository?
2. מה ההבדל בין `git add`, `git commit` ו-`git push`?
3. למה משתמשים ב-branches?
4. מה ההבדל בין `git switch -c` לבין `git branch`?
5. מה ההבדל בין Repository מקומי ל-Remote Repository?
6. מה ההבדל בין `git fetch` ל-`git pull`?
7. מהו merge conflict וכיצד פותרים אותו?
8. מדוע הודעת commit טובה צריכה להסביר את מטרת השינוי?

# צ'קליסט עבודה מומלץ עם Git

```bash
git status
git pull
git switch -c feature/my-feature
# עבודה על הקוד
git status
git add <relevant-files>
git commit -m "Clear and meaningful message"
git switch main
git pull
git merge feature/my-feature
git push
```

> אין להריץ את הרצף באופן עיוור. בכל שלב יש להבין באיזה branch נמצאים, אילו קבצים השתנו ומה עומד להיכנס ל-commit או ל-Remote.

</div>
