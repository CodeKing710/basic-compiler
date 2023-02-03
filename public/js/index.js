//File gets loaded once all elements are created
async function sendInput() {
  const input = document.getElementById('input').value;
  const output = document.getElementById('output');

  try {
    const data = await fetch('/process', {
      method: 'post',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({input: input})
    });

    const results = await data.json();
    output.innerHTML = JSON.stringify(results.output, null, 2);
  } catch (e) {console.error(e); output.innerHTML = "<h1>Error in Input!</h1>"}
}