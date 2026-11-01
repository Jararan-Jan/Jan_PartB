import { Selector } from 'testcafe';
import { config, url, email, submit, capture, currentUrl, warning } from './helpers';
fixture('T006 | F6 Password Recovery').page(url('forgotten'));

test('T006-S1 | Request recovery for a registered email', async t => {
  await t.typeText(email, config.email).click(submit);
  await capture(t, 'T006-S1');
  // This checks the UI acknowledgement, not actual delivery or reset completion.
  await t.expect(Selector('.alert-success').innerText).match(/e-mail.*(confirmation|reset)|confirmation.*e-mail/i)
    .expect(currentUrl()).contains('route=account/login');
});

test('T006-S2 | Reject an unregistered email', async t => {
  const [local, domain] = config.email.split('@');
  await t.typeText(email, `${local}+unregistered${Date.now()}@${domain}`).click(submit);
  await capture(t, 'T006-S2');
  await t.expect(warning.innerText).match(/E-Mail Address was not found in our records/i)
    .expect(currentUrl()).contains('route=account/forgotten');
});

test('T006-S3 | Reject an empty recovery email', async t => {
  await t.click(submit);
  await capture(t, 'T006-S3');
  await t.expect(warning.innerText).match(/E-Mail Address was not found in our records/i)
    .expect(currentUrl()).contains('route=account/forgotten')
    .expect(Selector('.alert-success').exists).notOk();
});
