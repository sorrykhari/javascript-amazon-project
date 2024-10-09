/*
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});
xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

fetch('https://supersimplebackend.dev/greeting').then(response => {
    return response.text();
}).then((greeting) => {
    console.log(greeting);
});
 */

async function getGreeting() {
    const response = await fetch('https://supersimplebackend.dev/greeting');
    const greeting = await response.text();
    console.log(greeting);
}

async function sendName(yourName) {
    await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: yourName
        })
    });
}

async function hiAmazon() {
  try{
    const response = await fetch('https://amazon.com');
    console.log(await response.json());
  }
  catch (error) {
    console.log('CORS error. Your request was blocked by the backend.');
  }
}

async function messedUp() {
  try{
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    });
  
    if (response.status >= 400) {
      throw response;
    }
    const text = await response.text();
    console.log(text);
  }

  catch (error){
    if (error.status === 400) {
      const theErr = await error.json();
      console.log(theErr);
    }
    else {
      console.log('Network error. Please try again later.')
    }
  }
}
