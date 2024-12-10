import { test, expect } from '@playwright/test';
/* 
In JavaScript, a truthy value is anything that is not:
false
0
"" (empty string)
null
undefined
NaN

In JavaScript, truthy values include:
true
Non-empty strings ("hello")
Non-zero numbers (42)
Objects ({})
Arrays ([])
Any value that is not falsy.
*/
test('toBeTruthy() example', async ({page}) => {
    // Values that pass with toBeTruthy()
    expect(true).toBeTruthy();        // Passes
    expect("non-empty").toBeTruthy(); // Passes
    expect(1).toBeTruthy();           // Passes
    expect([]).toBeTruthy();          // Passes
  
    // Values that fail with toBeTruthy()
    // expect(false).toBeTruthy();       // Fails
    // expect("").toBeTruthy();          // Fails
    // expect(0).toBeTruthy();           // Fails
    // expect(null).toBeTruthy();        // Fails
    // expect(undefined).toBeTruthy();   // Fails
  });