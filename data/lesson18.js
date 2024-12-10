//------18.a------
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log("xhr.response :>> ", xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/greeting");
xhr.send();

//------18.b------
const greetingFetch = fetch("https://supersimplebackend.dev/greeting")
  .then((response) => {
    return response.text();
  })
  .then((greetingText) => {
    console.log("greetingText1 :>> ", greetingText);
  });

//------18.c------
const greetingFetchAsync = async () => {
  const respone = await fetch("https://supersimplebackend.dev/greeting");
  const greeingText = await respone.text();
  console.log("greeingText2 :>> ", greeingText);
};
greetingFetchAsync();

//------18.d------
const greetingWithPostRequest = async () => {
  const respone = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Filip",
    }),
  });
  const greetingText = await respone.text();
  console.log("greetingText3 :>> ", greetingText);
};
greetingWithPostRequest();

//------18.d & 18.f------
const getRequestAmazon = async () => {
  try {
    const respone = await fetch("https://amazon.com");
    const greetingFromAmazon = await respone.json();
    console.log("greetingFromAmazon :>> ", greetingFromAmazon);
  } catch (error) {
    console.error("error :>> ", error);
  }
};
getRequestAmazon(); // Getting CORS error by Amazon's backend because of security reasons
