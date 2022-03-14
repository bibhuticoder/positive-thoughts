const Instagram = require('instagram-web-api')
const fs = require("fs");
const { username, password } = { username: 'p.o.s.i.t.i.v.e.thoughts', password: 'vivelatales' }
const imaps = require("imap-simple");
const _ = require("lodash");
const simpleParser = require("mailparser").simpleParser;

module.exports.uploadImage = async () => {
    const client = new Instagram({ username, password });
    let caption = fs.readFileSync('./assets/latest_quote.txt');

    try {
        await client.login();
        await client.uploadPhoto({ photo: './assets/quote.jpg', caption, post: 'feed' });
        console.log("Uploaded Image");
    } catch (e) {
        console.log("Login failed", e.error);

        if (e.status === 403) {
            console.log("Throttled");
            return;
        }

        if (e.error && e.error.message === "checkpoint_required") {
            const challengeUrl = err.error.checkpoint_url;

            await client.updateChallenge({ challengeUrl, choice: 1 });

            const emailConfig = {
                imap: {
                    user: `almighty569@gmail.com`,
                    password: `thisisfake@google#123`,
                    host: "imap.gmail.com",
                    port: 993,
                    tls: true,
                    tlsOptions: { servername: "imap.gmail.com", rejectUnauthorized: false },
                    authTimeout: 30000,
                },
            };

            // Connect to email and solve Instagram challenge after delay
            const delayedEmailFunction = async (timeout) => {
                setTimeout(() => {
                    imaps.connect(emailConfig).then(async (connection) => {
                        return connection.openBox("INBOX").then(async () => {
                            // Fetch emails from the last hour
                            const delay = 1 * 3600 * 1000;
                            let lastHour = new Date();
                            lastHour.setTime(Date.now() - delay);
                            lastHour = lastHour.toISOString();
                            const searchCriteria = ["ALL", ["SINCE", lastHour]];
                            const fetchOptions = {
                                bodies: [""],
                            };
                            return connection
                                .search(searchCriteria, fetchOptions)
                                .then((messages) => {
                                    messages.forEach((item) => {
                                        const all = _.find(item.parts, { which: "" });
                                        const id = item.attributes.uid;
                                        const idHeader = "Imap-Id: " + id + "\r\n";
                                        simpleParser(idHeader + all.body, async (err, mail) => {
                                            if (err) {
                                                console.log(err);
                                            }

                                            console.log(mail.subject);

                                            const answerCodeArr = mail.text
                                                .split("\n")
                                                .filter(
                                                    (item) =>
                                                        item && /^\S+$/.test(item) && !isNaN(Number(item))
                                                );

                                            if (mail.text.includes("Instagram")) {
                                                if (answerCodeArr.length > 0) {
                                                    // Answer code must be kept as string type and not manipulated to a number type to preserve leading zeros
                                                    const answerCode = answerCodeArr[0];
                                                    console.log(answerCode);

                                                    await client.updateChallenge({
                                                        challengeUrl,
                                                        securityCode: answerCode,
                                                    });

                                                    console.log(
                                                        `Answered Instagram security challenge with answer code: ${answerCode}`
                                                    );

                                                    await client.login();

                                                    await client.uploadPhoto({ photo: './assets/quote.jpg', caption, post: 'feed' });
                                                    console.log("Uploaded Image");
                                                }
                                            }
                                        });
                                    });
                                });
                        });
                    });
                }, timeout);
            };

            await delayedEmailFunction(40000);
        }
    }
}
