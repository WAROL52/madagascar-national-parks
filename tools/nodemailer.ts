import nodemailer from "nodemailer";
const optionEmail = {
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: "raberolio@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello Rabe text world?", // plain text body
  html: "<b>Hello world? html</b>", // html body
};
const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: "rabetsyrolio@gmail.com", // generated ethereal user
    pass: "juqrcgqlrukuudld", // generated ethereal password
  },
});
export async function sendMail(option: typeof optionEmail = optionEmail) {
  let info = await transporter.sendMail(option, (err, infoSuccess) => {
    if (err) {
      console.log("(---------[nodemailer.error]----------");
      console.log(err);
      console.log("---------[nodemailer.error]----------)");
      return err;
    }
    console.log("(---------[nodemailer.success]----------");
    console.log(`
        from:${option.from}
        to:${option.to}
        subject:${option.subject}

        info:${infoSuccess}
    `);
    console.log("---------[nodemailer.success]----------)");
  });
  return info;
}
