import { Selector } from 'testcafe';
import { config, register, capture, currentUrl, warning } from './helpers';
fixture('T005 | F5 User Registration')
  .page('https://opencart.abstracta.us/index.php?route=account/register');

test('T005-S1 | Register a new account', async t => {
  // Positive input: a previously unused address, matching passwords, consent.
  await register(t, config.email);
  await capture(t, 'T005-S1');
  await t
  .expect(currentUrl())
  .contains('route=account/success')
  .expect(Selector('#content').innerText)
  .contains(
    'Congratulations! Your new account has been successfully created!'
  );
});

test('T005-S2 | Reject a duplicate email', async t => {
  // TestCafe starts each test with isolated cookies; S1's server account remains.
  await register(t, config.email);
  await capture(t, 'T005-S2');
  await t.expect(warning.innerText).match(/E-Mail Address is already registered/i)
    .expect(currentUrl()).contains('route=account/register');
});

test('T005-S3 | Reject mismatched password confirmation', async t => {
  // Unique address prevents the duplicate-email rule from masking this test.
  const [local, domain] = config.email.split('@');
  await register(t, `${local}+mismatch${Date.now()}@${domain}`, 'Different123!');
  await capture(t, 'T005-S3');
  await t.expect(Selector('.text-danger').withText('Password confirmation does not match password!').exists).ok()
    .expect(currentUrl()).contains('route=account/register');
});
