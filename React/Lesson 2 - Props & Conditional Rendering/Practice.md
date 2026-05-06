

# תרגול React — Props, Conditional Rendering, Components

## מטרת התרגול

בתרגול הזה נתרגל בניית קומפוננטות ב־React עם Props, שימוש חוזר בקומפוננטות, העברת מידע בין רכיבים, ו־Conditional Rendering.
---

# חלק א׳ — תרגילי קומפוננטות עם Props

## תרגיל 1 — כרטיס מוצר

צרו קומפוננטה בשם `ProductCard`.

הקומפוננטה תקבל את ה־props הבאים:

```jsx
name
price
image
inStock
```

הקומפוננטה תציג:

שם מוצר
מחיר
תמונה
טקסט שמציג האם המוצר במלאי או לא

אם המוצר במלאי, הציגו:

```text
In Stock
```

אם המוצר לא במלאי, הציגו:

```text
Out of Stock
```

ב־`App.jsx` השתמשו בקומפוננטה לפחות שלוש פעמים עם מוצרים שונים.

בונוס: אם המוצר לא במלאי, אל תציגו כפתור קנייה.

---

## תרגיל 2 — כרטיס משתמש מתקדם

צרו קומפוננטה בשם `UserProfile`.

הקומפוננטה תקבל prop אחד בשם `user`.

ה־user יהיה אובייקט במבנה הבא:

```jsx
const user = {
  name: "Dana",
  age: 28,
  city: "Tel Aviv",
  isPremium: true
};
```

הקומפוננטה תציג:

שם
גיל
עיר
האם המשתמש הוא Premium או Regular

אם `isPremium` הוא `true`, הציגו:

```text
Premium User ⭐
```

אחרת הציגו:

```text
Regular User
```

ב־`App.jsx` צרו לפחות שני משתמשים שונים והציגו אותם בעזרת אותה קומפוננטה.

---

## תרגיל 3 — קומפוננטת הודעה לפי סוג

צרו קומפוננטה בשם `AlertMessage`.

הקומפוננטה תקבל:

```jsx
type
message
```

ה־type יכול להיות:

```jsx
"success"
"error"
"warning"
```

הקומפוננטה תציג הודעה מתאימה.

לדוגמה:

אם type הוא success, הציגו לפני ההודעה:

```text
✅ Success:
```

אם type הוא error:

```text
❌ Error:
```

אם type הוא warning:

```text
⚠️ Warning:
```

ב־`App.jsx` השתמשו בקומפוננטה שלוש פעמים, כל פעם עם type אחר.

בונוס: אם נשלח type לא מוכר, הציגו:

```text
Unknown message type
```

---

## תרגיל 4 — תיבת מידע עם children

צרו קומפוננטה בשם `InfoBox`.

הקומפוננטה תקבל:

```jsx
title
children
```

היא תציג כותרת, ומתחתיה את התוכן שנשלח בין תגיות הקומפוננטה.

דוגמה לשימוש:

```jsx
<InfoBox title="React Tip">
  <p>Components help us reuse UI logic.</p>
</InfoBox>
```

ב־`App.jsx` צרו שלוש תיבות מידע שונות.

שימו לב: זה תרגיל מתקדם יותר, כי `children` הוא prop מיוחד ב־React.

---

## תרגיל 5 — רשימת משימות לתצוגה בלבד

צרו קומפוננטה בשם `TaskList`.

הקומפוננטה תקבל prop בשם `tasks`.

המערך ייראה כך:

```jsx
const tasks = [
  { title: "Learn props", done: true },
  { title: "Practice components", done: false },
  { title: "Build a small app", done: false }
];
```

הקומפוננטה תציג רשימה של משימות.

ליד כל משימה הציגו:

אם done הוא true:

```text
✅
```

אם done הוא false:

```text
⬜
```

בונוס: הציגו מעל הרשימה כמה משימות בוצעו מתוך כלל המשימות.

לדוגמה:

```text
Completed: 1 / 3
```

---

## תרגיל 6 — קומפוננטת כפתור כללית

צרו קומפוננטה בשם `ActionButton`.

הקומפוננטה תקבל:

```jsx
label
variant
disabled
```

ה־variant יכול להיות:

```jsx
"primary"
"danger"
"secondary"
```

הקומפוננטה תציג כפתור עם הטקסט שהתקבל ב־label.

אם `disabled` הוא true, הכפתור צריך להיות disabled.

בונוס: הציגו טקסט קטן מתחת לכפתור:

אם הכפתור disabled:

```text
This action is currently unavailable
```

אחרת:

```text
You can click this button
```

---

## תרגיל 7 — תצוגת קורס

צרו קומפוננטה בשם `CourseCard`.

הקומפוננטה תקבל prop בשם `course`.

מבנה הקורס:

```jsx
const course = {
  title: "React Basics",
  level: "beginner",
  lessons: 12,
  isOpen: true
};
```

הקומפוננטה תציג:

שם הקורס
רמה
מספר שיעורים
האם ההרשמה פתוחה או סגורה

אם `isOpen` הוא true, הציגו כפתור:

```text
Join Course
```

אם לא, הציגו:

```text
Registration Closed
```

ב־`App.jsx` הציגו לפחות שלושה קורסים שונים.

---

## תרגיל 8 — קומפוננטת דירוג

צרו קומפוננטה בשם `Rating`.

הקומפוננטה תקבל prop בשם `score`.

ה־score יהיה מספר בין 1 ל־5.

הקומפוננטה תציג כוכבים לפי המספר.

לדוגמה:

אם score הוא 3, הציגו:

```text
⭐⭐⭐
```

אם score הוא 5, הציגו:

```text
⭐⭐⭐⭐⭐
```

אין צורך להשתמש בלולאה. אפשר להשתמש ב־conditional rendering.

בונוס: אם score קטן מ־1 או גדול מ־5, הציגו:

```text
Invalid rating
```

---

## תרגיל 9 — קומפוננטת Dashboard קטנה

צרו קומפוננטה בשם `DashboardCard`.

היא תקבל:

```jsx
title
value
description
status
```

ה־status יכול להיות:

```jsx
"good"
"bad"
"neutral"
```

הקומפוננטה תציג כרטיס נתון, למשל:

```text
Users
1,240
Active users this month
Status: good
```

ב־`App.jsx` צרו Dashboard עם לפחות ארבעה כרטיסים:

Users
Revenue
Errors
New Signups

בונוס: לפי הסטטוס, הציגו אייקון שונה:

good → ✅
bad → ❌
neutral → ➖

---

## תרגיל 10 — קומפוננטת Article Preview

צרו קומפוננטה בשם `ArticlePreview`.

היא תקבל prop בשם `article`.

מבנה article:

```jsx
const article = {
  title: "Why React is Popular",
  author: "Dana Levi",
  views: 1200,
  isFeatured: true
};
```

הקומפוננטה תציג:

כותרת
מחבר
מספר צפיות
האם המאמר מומלץ

אם `isFeatured` הוא true, הציגו:

```text
Featured Article ⭐
```

אם מספר הצפיות גדול מ־1000, הציגו גם:

```text
Popular Article
```

---
# חלק ב׳ — תרגילים ברמה גבוהה יותר

## תרגיל 11 — תצוגת הרשאות

צרו קומפוננטה בשם `PermissionPanel`.

היא תקבל:

```jsx
userName
role
```

ה־role יכול להיות:

```jsx
"admin"
"editor"
"viewer"
```

הציגו הודעה שונה לכל role:

admin:

```text
You can manage users and settings
```

editor:

```text
You can edit content
```

viewer:

```text
You can only view content
```

אם role לא מוכר, הציגו:

```text
Unknown role
```

בונוס: צרו קומפוננטות נפרדות:

```jsx
AdminPanel
EditorPanel
ViewerPanel
```

ו־`PermissionPanel` יחליט איזו מהן להציג.

---

## תרגיל 12 — קומפוננטת Empty State

צרו קומפוננטה בשם `ItemsView`.

היא תקבל prop בשם `items`.

אם המערך ריק, הציגו:

```text
No items to display
```

אם יש פריטים, הציגו אותם ברשימה.

דוגמה:

```jsx
<ItemsView items={[]} />
<ItemsView items={["Apple", "Banana", "Orange"]} />
```

בונוס: הוסיפו prop בשם `emptyMessage`, כך שאפשר יהיה לשלוט בטקסט שמוצג כשהרשימה ריקה.

---

## תרגיל 13 — קומפוננטת User Badge

צרו קומפוננטה בשם `UserBadge`.

היא תקבל:

```jsx
name
isOnline
unreadMessages
```

הציגו:

שם משתמש
סטטוס online/offline
מספר הודעות שלא נקראו

אם המשתמש מחובר, הציגו:

```text
🟢 Online
```

אם לא:

```text
⚫ Offline
```

אם `unreadMessages` גדול מ־0, הציגו:

```text
You have X unread messages
```

אם אין הודעות:

```text
No new messages
```

---

## תרגיל 14 — קומפוננטת Pricing Plan

צרו קומפוננטה בשם `PricingPlan`.

היא תקבל:

```jsx
name
price
features
isRecommended
```

כאשר `features` הוא מערך של טקסטים.

הציגו:

שם המסלול
מחיר
רשימת פיצ׳רים
אם המסלול מומלץ, הציגו:

```text
Recommended ⭐
```

ב־`App.jsx` צרו שלושה מסלולים:

Basic
Pro
Enterprise

---

# חלק ג׳ — שאלות חשיבה

## שאלה 1

יש לנו קומפוננטה `Button` שמקבלת prop בשם `text`.

```jsx
function Button({ text }) {
  return <button>{text}</button>;
}
```

מה יקרה אם נשתמש בה כך?

```jsx
<Button label="Save" />
```

---

## שאלה 2

מה ההבדל בין שתי השורות?

```jsx
<User name="Dana" />
<User name={userName} />
```

---

## שאלה 3

למה זה לא נכון?

```jsx
function User({ name }) {
  name = "New Name";
  return <h1>{name}</h1>;
}
```

---

## שאלה 4

מתי כדאי לשלוח אובייקט כ־prop במקום כמה props נפרדים?

---

## שאלה 5

מה היתרון של קומפוננטה כללית כמו `Card`?

---

## שאלה 6

למה Conditional Rendering חשוב באפליקציות אמיתיות?

---

## שאלה 7

מה ההבדל בין:

```jsx
{isAdmin ? <AdminPanel /> : <UserPanel />}
```

לבין:

```jsx
<AdminPanel />
<UserPanel />
```

---

# תשובות — חלק ג׳

## תשובה 1

הכפתור יוצג ריק, כי הקומפוננטה מחפשת prop בשם `text`, אבל קיבלה prop בשם `label`.

---

## תשובה 2

בשורה הראשונה שולחים מחרוזת קבועה בשם `"Dana"`.

בשורה השנייה שולחים ערך מתוך משתנה JavaScript בשם `userName`.

---

## תשובה 3

כי props לא אמורים להשתנות בתוך הקומפוננטה.
קומפוננטה צריכה להתייחס ל־props כאל מידע שמגיע מבחוץ לקריאה בלבד.

---

## תשובה 4

כאשר הערכים שייכים לאותה ישות.

לדוגמה, פרטי משתמש:

```jsx
<User details={userInfo} />
```

יותר הגיוני מאשר לשלוח הרבה props נפרדים אם יש הרבה שדות.

---

## תשובה 5

אפשר להשתמש בה להרבה מטרות שונות: מוצר, משתמש, מאמר, קורס ועוד.
כך נמנעים משכפול קוד ושומרים על מבנה אחיד.

---

## תשובה 6

כי ממשק משתמש משתנה לפי מצב:

משתמש מחובר / לא מחובר
מוצר במלאי / לא במלאי
רשימה ריקה / מלאה
טעינה / הצלחה / שגיאה

---

## תשובה 7

בגרסה הראשונה מוצג רק רכיב אחד לפי התנאי.
בגרסה השנייה שני הרכיבים מוצגים תמיד.


# חלק ד׳ — שאלות נפוצות מראיונות

## שאלה 1 — מה זה Props ב־React?

Props הם הדרך להעביר מידע מקומפוננטת אב לקומפוננטת ילד.
הם דומים לפרמטרים של פונקציה, אבל ב־React הם מגיעים כאובייקט אחד שמכיל את כל הערכים שנשלחו לרכיב.

---

## שאלה 2 — האם אפשר לשנות Props בתוך קומפוננטה?

לא.
Props נחשבים לקריאה בלבד.
הרכיב יכול להשתמש בהם ולהציג אותם, אבל לא אמור לשנות אותם.

---

## שאלה 3 — מה ההבדל בין העברת מחרוזת לבין העברת משתנה כ־prop?

כאשר מעבירים מחרוזת קבועה, משתמשים בגרשיים:

```jsx id="cjlwmh"
<User name="Dana" />
```

כאשר מעבירים משתנה JavaScript, משתמשים בסוגריים מסולסלים:

```jsx id="tqicxy"
<User name={userName} />
```

---

## שאלה 4 — מה זה Prop Drilling?

זה מצב שבו מעבירים props דרך כמה קומפוננטות בדרך, גם אם חלק מהקומפוננטות באמצע בכלל לא צריכות את המידע.

כלומר, רכיבים מסוימים רק “מעבירים הלאה” את ה־props לרכיבים עמוקים יותר.

---

## שאלה 5 — למה Prop Drilling בעייתי?

כי הוא יוצר קוד פחות ברור ופחות נוח לתחזוקה.

רכיבים באמצע הופכים תלויים במידע שהם בכלל לא משתמשים בו, רק כדי להעביר אותו הלאה.

באפליקציות גדולות זה עלול ליצור שרשראות ארוכות ומבלבלות של props.

---

## שאלה 6 — מה זה Conditional Rendering?

זה מצב שבו React מציגה JSX שונה לפי תנאי מסוים.

לדוגמה:

```jsx id="sggjgs"
{isLoggedIn ? <Dashboard /> : <Login />}
```

אם המשתמש מחובר — יוצג Dashboard.
אם לא — יוצג Login.

---

## שאלה 7 — מה יקרה אם לא נעביר prop שהקומפוננטה מצפה לקבל?

הערך יהיה `undefined`.

לפעמים זה לא ישבור את האפליקציה, אבל זה עלול לגרום לתצוגה ריקה או אפילו לשגיאה.

לדוגמה:

```jsx id="b38jyl"
function User({ user }) {
  return <h1>{user.name}</h1>;
}
```

אם לא נשלח `user`, תהיה שגיאה כי אי אפשר לגשת ל־`name` מתוך `undefined`.

---

## שאלה 8 — איך אפשר לתת ערך ברירת מחדל ל־prop?

אפשר להגדיר ערך ברירת מחדל בתוך ה־destructuring:

```jsx id="zcmk7l"
function Button({ text = "Click me" }) {
  return <button>{text}</button>;
}
```

אם לא יישלח `text`, הכפתור יציג:

```text id="m6b55p"
Click me
```

---

## שאלה 9 — מה היתרון של קומפוננטות קטנות?

קומפוננטות קטנות קלות יותר להבנה, בדיקה ותחזוקה.

בנוסף, אפשר להשתמש בהן שוב במקומות שונים באפליקציה, במקום לשכפל קוד.

בדרך כלל עדיף שכל קומפוננטה תהיה אחראית על דבר אחד ברור וממוקד.

