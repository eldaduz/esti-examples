/**
 * הנושאים בקובץ:
 * 1. Basic Logs
 * 2. Calculator with Logs
 * 3. Structured Logs
 * 4. Calculator with Structured Logs
 * 5. Traces with Higher-Order Functions
 * 6. Conditional Traces
 * 7. Metrics
 * 8. Monitoring & Alerting
 *
 * הרצה:
 * node observability-lesson-code.js
 */

/* ============================================================
   1. BASIC LOGS
   הדפסות בסיסיות ב-JavaScript באמצעות console
   ============================================================ */

console.log('\n==================== 1. BASIC LOGS ====================\n');

console.info('console.info() - general informational message');
console.debug('console.debug() - debug message for development');
console.warn('console.warn() - warning message');
console.error('console.error() - error message');
console.log('console.log() - regular log message');

/**
 * הסבר קצר:
 * console.log   - הודעה כללית
 * console.info  - מידע רגיל על מה שקורה במערכת
 * console.warn  - אזהרה: משהו חשוד, אבל לא בהכרח תקלה
 * console.error - שגיאה: משהו לא תקין קרה
 * console.debug - מידע מפורט יותר, בעיקר בזמן פיתוח
 */


/* ============================================================
   2. CALCULATOR WITH BASIC LOGS
   מחשבון בסיסי שמדפיס logs על פעולות ותקלות
   ============================================================ */

console.log('\n==================== 2. CALCULATOR WITH BASIC LOGS ====================\n');

function calculateWithBasicLogs(a, b, operator) {
  let result;

  if (operator === '+') {
    result = a + b;
  } else if (operator === '-') {
    result = a - b;
  } else if (operator === '*') {
    result = a * b;
  } else if (operator === '/') {
    if (b === 0) {
      console.error(`Invalid operation: cannot divide ${a} by zero.`);
      return null;
    }

    result = a / b;
  } else {
    console.error(`Invalid operator: ${operator}`);
    return null;
  }

  console.info(
    `Received operands ${a} and ${b} with operator ${operator}. The result is ${result}.`
  );

  return result;
}

calculateWithBasicLogs(10, 5, '+');
calculateWithBasicLogs(10, 5, '-');
calculateWithBasicLogs(10, 5, '*');
calculateWithBasicLogs(10, 5, '/');
calculateWithBasicLogs(10, 0, '/');
calculateWithBasicLogs(10, 5, '%');


/* ============================================================
   3. STRUCTURED LOGS
   לוגים מובנים בפורמט JSON
   ============================================================ */

console.log('\n==================== 3. STRUCTURED LOGS ====================\n');

/**
 * פונקציה כללית להדפסת log מובנה.
 *
 * level   - רמת חומרה: INFO / WARNING / ERROR / ALERT וכו'
 * message - תיאור מילולי קצר של האירוע
 * details - אובייקט עם מידע נוסף על האירוע
 */
function log(level, message, details = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...details,
  };

  console.log(JSON.stringify(logEntry));
}

log('INFO', 'Program started', {
  service: 'calculator',
});

log('INFO', 'Calculation completed', {
  service: 'calculator',
  operator: '+',
  operands: [10, 5],
  result: 15,
});

log('ERROR', 'Invalid operator', {
  service: 'calculator',
  operator: '%',
});

/**
 * למה Structured Logs?
 *
 * במקום הודעה חופשית כמו:
 * "User 123 failed login"
 *
 * נעדיף:
 * {
 *   "level": "ERROR",
 *   "message": "Login failed",
 *   "userId": 123
 * }
 *
 * כך אפשר לחפש לפי שדות:
 * level = ERROR
 * userId = 123
 * service = calculator
 */


/* ============================================================
   4. CALCULATOR WITH STRUCTURED LOGS
   מחשבון שמשתמש בפונקציית log ומדפיס JSON
   ============================================================ */

console.log('\n==================== 4. CALCULATOR WITH STRUCTURED LOGS ====================\n');

const structuredOperations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }

    return a / b;
  },
};

function calculateWithStructuredLogs(a, b, operator) {
  const operation = structuredOperations[operator];

  if (!operation) {
    log('ERROR', 'Invalid operator', {
      operator,
      operands: [a, b],
    });

    return null;
  }

  try {
    const result = operation(a, b);

    log('INFO', 'Calculation completed', {
      operator,
      operands: [a, b],
      result,
    });

    return result;
  } catch (error) {
    log('ERROR', 'Calculation failed', {
      operator,
      operands: [a, b],
      error: error.message,
    });

    return null;
  }
}

calculateWithStructuredLogs(10, 5, '+');
calculateWithStructuredLogs(10, 0, '/');
calculateWithStructuredLogs(10, 5, '%');


/* ============================================================
   5. TRACES WITH HIGHER-ORDER FUNCTIONS
   Trace בסיסי באמצעות פונקציה שמקבלת פונקציה ומחזירה פונקציה
   ============================================================ */

console.log('\n==================== 5. TRACES WITH HIGHER-ORDER FUNCTIONS ====================\n');

/**
 * Higher-Order Function:
 * פונקציה שמקבלת פונקציה אחרת כפרמטר,
 * או מחזירה פונקציה אחרת.
 *
 * כאן trace מקבלת פונקציה מקורית,
 * ומחזירה פונקציה חדשה שעוטפת אותה:
 * - לפני הקריאה נדפיס את שם הפונקציה והפרמטרים
 * - נפעיל את הפונקציה המקורית
 * - אחרי הקריאה נדפיס את התוצאה
 */
function trace(func) {
  return function(...args) {
    console.log(`Calling ${func.name || 'anonymous'} with args: ${JSON.stringify(args)}`);

    try {
      const result = func(...args);

      console.log(`${func.name || 'anonymous'} returned: ${JSON.stringify(result)}`);

      return result;
    } catch (error) {
      console.error(`${func.name || 'anonymous'} threw an error: ${error.message}`);
      throw error;
    }
  };
}

const addWithTrace = trace(function add(x, y) {
  return x + y;
});

const greetWithTrace = trace(function greet(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
});

const addResult = addWithTrace(5, 3);
const greetResult = greetWithTrace('Alice', 'Hi');

console.log({ addResult, greetResult });


/* ============================================================
   6. CONDITIONAL TRACES
   Trace שמדפיס רק בתנאים מסוימים
   ============================================================ */

console.log('\n==================== 6. CONDITIONAL TRACES ====================\n');

/**
 * הדרישה מהתרגיל:
 * להדפיס trace רק אם:
 * 1. הפונקציה קיבלה בדיוק 2 פרמטרים
 * או
 * 2. כל הפרמטרים הם מספרים גדולים מ-0
 */
function shouldTrace(args) {
  const hasExactlyTwoArguments = args.length === 2;

  const allArgumentsArePositiveNumbers =
    args.length > 0 &&
    args.every((arg) => typeof arg === 'number' && arg > 0);

  return hasExactlyTwoArguments || allArgumentsArePositiveNumbers;
}

function conditionalTrace(func) {
  return function(...args) {
    if (!shouldTrace(args)) {
      return func(...args);
    }

    console.log(`Calling ${func.name || 'anonymous'} with args: ${JSON.stringify(args)}`);

    const result = func(...args);

    console.log(`${func.name || 'anonymous'} returned: ${JSON.stringify(result)}`);

    return result;
  };
}

const addConditionalTrace = conditionalTrace(function add(x, y) {
  return x + y;
});

const multiplyThreeNumbersConditionalTrace = conditionalTrace(
  function multiplyThreeNumbers(a, b, c) {
    return a * b * c;
  }
);

const sayHelloConditionalTrace = conditionalTrace(function sayHello(name) {
  return `Hello, ${name}`;
});

addConditionalTrace(2, 3);
// יודפס trace כי יש בדיוק 2 פרמטרים

multiplyThreeNumbersConditionalTrace(2, 3, 4);
// יודפס trace כי כל הפרמטרים מספרים חיוביים

sayHelloConditionalTrace('Dana');
// לא יודפס trace כי יש פרמטר אחד והוא לא מספר חיובי


/* ============================================================
   7. METRICS
   מדדים מספריים על הפעולות של המחשבון
   ============================================================ */

console.log('\n==================== 7. METRICS ====================\n');

/**
 * metrics הוא אובייקט ששומר מדדים על המערכת.
 *
 * operationCounts:
 * כמה פעמים כל פעולה נקראה בהצלחה.
 *
 * operationTotalTimeMs:
 * כמה זמן כולל לקחו כל הפעולות מכל סוג.
 * כדי לחשב ממוצע נחלק את הזמן הכולל במספר הקריאות.
 *
 * invalidOperationsCount:
 * כמה פעולות לא חוקיות התרחשו בסך הכול.
 */
const metrics = {
  operationCounts: {
    '+': 0,
    '-': 0,
    '*': 0,
    '/': 0,
  },

  operationTotalTimeMs: {
    '+': 0,
    '-': 0,
    '*': 0,
    '/': 0,
  },

  invalidOperationsCount: 0,
};

const metricOperations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }

    return a / b;
  },
};

function calculateWithMetrics(a, b, operator) {
  const operation = metricOperations[operator];

  if (!operation) {
    metrics.invalidOperationsCount += 1;
    console.error(`Invalid operator: ${operator}`);
    return null;
  }

  const startTime = performance.now();

  try {
    const result = operation(a, b);
    const durationMs = performance.now() - startTime;

    metrics.operationCounts[operator] += 1;
    metrics.operationTotalTimeMs[operator] += durationMs;

    console.info(
      `Received operands ${a} and ${b} with operator ${operator}. The result is ${result}.`
    );

    return result;
  } catch (error) {
    metrics.invalidOperationsCount += 1;
    console.error(`Calculation failed: ${error.message}`);
    return null;
  }
}

function getAverageTimeMs(operator) {
  const count = metrics.operationCounts[operator];

  if (count === 0) {
    return 0;
  }

  return metrics.operationTotalTimeMs[operator] / count;
}

function printMetrics() {
  console.log('--- Metrics ---');

  for (const operator of Object.keys(metrics.operationCounts)) {
    console.log(
      `${operator}: count=${metrics.operationCounts[operator]}, averageTimeMs=${getAverageTimeMs(operator)}`
    );
  }

  console.log(`invalidOperationsCount=${metrics.invalidOperationsCount}`);
}

calculateWithMetrics(10, 5, '+');
calculateWithMetrics(10, 5, '+');
calculateWithMetrics(10, 5, '-');
calculateWithMetrics(10, 5, '*');
calculateWithMetrics(10, 5, '/');
calculateWithMetrics(10, 0, '/');
calculateWithMetrics(10, 5, '%');

printMetrics();


/* ============================================================
   8. MONITORING & ALERTING
   ניטור פעולות לא חוקיות והדפסת Alert
   ============================================================ */

console.log('\n==================== 8. MONITORING & ALERTING ====================\n');

/**
 * נשמור timestamps של פעולות לא חוקיות.
 *
 * למה timestamps ולא רק מונה?
 * כי הדרישה היא:
 * "יותר מ-3 פעולות לא חוקיות בחמש הדקות האחרונות"
 *
 * כדי לדעת מה קרה בחמש הדקות האחרונות,
 * צריך לדעת מתי כל פעולה לא חוקית קרתה.
 */
const invalidOperationTimestamps = [];

const alertingOperations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }

    return a / b;
  },
};

function recordInvalidOperation(reason, details = {}) {
  const now = Date.now();

  invalidOperationTimestamps.push(now);

  log('ERROR', 'Invalid operation', {
    reason,
    ...details,
  });

  checkInvalidOperationAlert(now);
}

function checkInvalidOperationAlert(now) {
  const fiveMinutesInMs = 5 * 60 * 1000;
  const cutoff = now - fiveMinutesInMs;

  /**
   * מסירים מהמערך פעולות ישנות יותר מחמש דקות.
   *
   * לדוגמה:
   * אם עכשיו 10:05,
   * לא מעניינות אותנו פעולות לא חוקיות מ-09:59.
   */
  while (
    invalidOperationTimestamps.length > 0 &&
    invalidOperationTimestamps[0] < cutoff
  ) {
    invalidOperationTimestamps.shift();
  }

  /**
   * אם יש יותר מ-3 פעולות לא חוקיות בחמש הדקות האחרונות,
   * נדפיס Alert.
   */
  if (invalidOperationTimestamps.length > 3) {
    log('ALERT', 'Too many invalid operations in the last 5 minutes', {
      invalidOperationsInLastFiveMinutes: invalidOperationTimestamps.length,
      threshold: 3,
    });
  }
}

function calculateWithAlerting(a, b, operator) {
  const operation = alertingOperations[operator];

  if (!operation) {
    recordInvalidOperation('Unknown operator', {
      operator,
      operands: [a, b],
    });

    return null;
  }

  try {
    const result = operation(a, b);

    log('INFO', 'Calculation completed', {
      operator,
      operands: [a, b],
      result,
    });

    return result;
  } catch (error) {
    recordInvalidOperation(error.message, {
      operator,
      operands: [a, b],
    });

    return null;
  }
}

calculateWithAlerting(10, 5, '%');
calculateWithAlerting(10, 0, '/');
calculateWithAlerting(8, 2, '?');
calculateWithAlerting(7, 0, '/');


/* ============================================================
   SUMMARY
   סיכום קצר
   ============================================================ */

/**
 * Logs:
 * אירועים נקודתיים שהמערכת מדפיסה.
 *
 * Structured Logs:
 * לוגים בפורמט JSON עם שדות קבועים.
 *
 * Traces:
 * מעקב אחרי מסלול של פעולה או פונקציה.
 *
 * Metrics:
 * מדדים מספריים, למשל כמה פעמים פעולה קרתה וכמה זמן היא לקחה.
 *
 * Monitoring:
 * מעקב לאורך זמן אחרי המדדים.
 *
 * Alerting:
 * התרעה כשמדד חורג מסף שהגדרנו.
 */
