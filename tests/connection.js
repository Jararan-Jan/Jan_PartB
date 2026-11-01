import { Selector } from 'testcafe';

// Diagnostic only; never count these checks as assignment F4-F6 scenarios.
fixture('Connection diagnostic 1: local browser automation')
  .page(process.env.PARTB_PROBE_URL);
test('LOCAL | Can Safari execute TestCafe commands?', async t => {
  console.log('[LOCAL] Test body started');
  await t.typeText('#probe', 'automation works')
    .expect(Selector('#probe').value).eql('automation works');
  console.log('[LOCAL] Typing and assertion passed');
});

fixture('Connection diagnostic 2: website access')
  .page('https://opencart.abstracta.us/index.php?route=account/register');
test('REMOTE | Is the registration form accessible?', async t => {
  console.log('[REMOTE] Test body started');
  await t.takeScreenshot({path: 'connection-remote.png', fullPage: true});
  await t.expect(Selector('#input-firstname').visible).ok('No visible registration form: inspect screenshot for block/error page');
  console.log('[REMOTE] Registration form found; NO account submitted');
});
