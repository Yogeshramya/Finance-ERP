export async function sendSMS({
  number,
  message,
}) {

  try {

    const response =
      await fetch(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          method: "POST",

          headers: {
            authorization:
              process.env
                .FAST2SMS_API_KEY,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            route: "q",

            message,

            language:
              "english",

            flash: 0,

            numbers: number,
          }),
        }
      );

    const text =
      await response.text();

    console.log(
      "FAST2SMS RESPONSE:",
      text
    );

    try {

      return JSON.parse(text);

    } catch {

      return {
        raw: text,
      };
    }

  } catch (error) {

    console.log(
      "SEND SMS ERROR:",
      error
    );

    throw error;
  }
}