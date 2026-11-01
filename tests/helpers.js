import { Selector, ClientFunction } from 'testcafe';
const config = require('../config.cjs');
export { config };
export const url = route => `https://opencart.abstracta.us/index.php?route=account/${route}`;
export const currentUrl = ClientFunction(() => window.location.href);
export const email = Selector('#input-email');
export const password = Selector('#input-password');
export const warning = Selector('.alert-danger');
export const submit = Selector('#content input[type="submit"]');

// Save BEFORE assertions so an unexpected website response is preserved as evidence.
export async function capture(t, id) {
  console.log('[evidence] Saving ' + id);
  await t.takeScreenshot({ path: `${id}.png`, fullPage: true });
}

export async function register(t, address, confirmation = config.password) {
  console.log('[registration] Test body started; opening registration form');
  // Registration fixture already opens this page. Avoid a redundant navigation.
  await t.expect(Selector('#input-firstname').visible).ok('Registration form is unavailable');
  console.log('[registration] Form found; filling first name');
  await t.typeText('#input-firstname', config.firstName);
  console.log('[registration] Filling remaining fields');
  await t.typeText('#input-lastname', config.lastName)
    .typeText(email, address)
    .typeText('#input-telephone', config.telephone)
    .typeText(password, config.password)
    .typeText('#input-confirm', confirmation)
    .click(Selector('input[name="agree"]'));
  console.log('[registration] Submitting form');
  await t.click(submit);
  console.log('[registration] Submission action completed; checking result next');
}

// An authenticated sidebar contains Logout; its absence is checked in negative tests.
export const logout = Selector('#column-right a').withAttribute('href', /route=account\/logout/);
export async function rejectedLogin(t) {
  await t.expect(warning.innerText).match(/No match for E-Mail Address and\/or Password/i)
    .expect(currentUrl()).contains('route=account/login')
    .expect(logout.exists).notOk();
}
