export const fetchData = async (object) => {
  try {
      const response = await fetch(object.urlApi, {
          method: object.methods,
          headers: object.headers,
          body: object.bodyData ? JSON.stringify(object.bodyData) : null,
      });

      const result = await response.json();
      return result;
  } catch (err) {
      if (!window.navigator.onLine) {
          console.log("Sprawdz połączenie z internetem!");
      }

      const timeOut = (url) => {
          setTimeout(function () {
              fetch(url);
          }, 5000);
      };

      timeOut(object.urlApi);
  }
};