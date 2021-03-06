let moment = require("moment");
let nodeMailer = require("nodemailer");
const pool = require("../modules/pool");

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "checkandconnect101@gmail.com",
    pass: "1check&connect01"
  }
});

const htmlEmail = `
<h4>Greetings Local C&C Trainer,</h4>
<p>
If you have not done so already, please sign the Check & Connect TTT Terms of Agreement and send this document to your national trainer. A signed copy of this document is due within 10 days of your Initial TTT Workshop.

Best regards,
</p>
<h4>Your National C&C Training Team</h4>



`





let sendEmail = (notificaitonType , notificationInfo) => {
    
    let cohortId = notificationInfo.cohort_id;

    pool.query(`SELECT * FROM local_trainers WHERE cohort_ref_id = ${cohortId}`)
        .then(results => {
            console.log(results.rows);

            results.rows.forEach(localTrainer => {
                let mailOptions = {
                    from: "checkandconnect@gmail.com",
                    to: localTrainer.email,
                    subject: "testMail",
                    text: "hello"
                  };

            transporter.sendMail(mailOptions, (err , info) => {
                if(err) {
                    console.log(err)
                }else {
                    console.log('email sent' + info.response);
                }

            })
            })
            
        })
}
let notifier = () => {
  // console.log(new Date());
  pool
    .query("SELECT * FROM cohort_requirements WHERE cohort_req_id = 49 ")
    .then(response => {
      console.log(response.rows[0]);

      console.log(
        moment(response.rows[0].notification_1_date).format("YYYY-MM-DD")
      );
      console.log(moment().format("YYYY-MM-DD"));

      if (
        moment(response.rows[0].notification_1_date).format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
      ) {
          sendEmail('notification_1', response.rows[0]);
        console.log("today is the day ");
      }
    });

  
};



module.exports = notifier;
