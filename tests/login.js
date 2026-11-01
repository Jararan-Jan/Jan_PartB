import { Selector } from 'testcafe';
import { config, url, email, password, submit, capture, currentUrl, logout, rejectedLogin } from './helpers';
fixture('T004 | F4 User Login').page(url('login'));

test('T004-S1 | Login with valid credentials', async t => {
  await t.typeText(email, config.email).typeText(password, config.password).click(submit);
  await capture(t, 'T004-S1');
  await t.expect(currentUrl()).contains('route=account/account')
    .expect(Selector('#content h2').withText('My Account').exists).ok()
    .expect(logout.exists).ok();
});

test('T004-S2 | Reject an incorrect password', async t => {
  await t.typeText(email, config.email).typeText(password, 'WrongPass123!').click(submit);
  await capture(t, 'T004-S2');
  await rejectedLogin(t);
});

test('T004-S3 | Reject empty login fields', async t => {
  // Empty fields are submitted without typing; do not insert spaces.
  await t.click(submit);
  await capture(t, 'T004-S3');
  await rejectedLogin(t);
});
