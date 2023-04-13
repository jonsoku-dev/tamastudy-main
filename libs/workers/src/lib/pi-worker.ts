// https://stackoverflow.com/a/39575124
import axios from 'axios';

function pi(n: number) {
  let v = 0;
  for (let i = 1; i <= n; i += 4) {
    // increment by 4
    v += 1 / i - 1 / (i + 2); // add the value of the series
  }
  return 4 * v; // apply the factor at last
}

// This is a module worker, so we can use imports (in the browser too!)
// We're in the browser, so we need to use a worker loader
// eslint-disable-next-line no-restricted-globals
addEventListener('message', async (event: MessageEvent<number>) => {
  postMessage(pi(event.data));
  const response = await axios.get('/api/posts');
  console.log(response.data);
});
