import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class InfluxReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    const token = process.env.INFLUX_TOKEN;
    const url = "http://localhost:8086";
    const org = "my-org";
    const bucket = "playwright-results";

    const status = result.status === 'passed' ? 1 : 0;
    const line = `test_results,test_name=${test.title.replace(/ /g, '_')},env=integration status=${status},duration=${result.duration}`;

    try {
      await fetch(`${url}/api/v2/write?org=${org}&bucket=${bucket}&precision=ns`, {
        method: 'POST',
        headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'text/plain; charset=utf-8' },
        body: line,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(`Erreur envoi test: ${e.message}`);
      } else {
        console.log(`Erreur envoi test: ${String(e)}`);
      }
    }
  }

  async onEnd() {
    console.log("--------------------------------------------------");
    console.log("TOUS LES TESTS SONT DANS INFLUXDB !");
    console.log("--------------------------------------------------");
  }
}
export default InfluxReporter;