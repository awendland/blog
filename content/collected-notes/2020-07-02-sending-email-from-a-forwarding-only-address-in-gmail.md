{
  "title": "Sending email from a forwarding-only address in Gmail",
  "date": "2020-07-02T21:02:16.532Z",
  "lastmod": "2020-07-02T21:17:01.326Z",
  "layout": "post",
  "originalUrl": "https://collectednotes.com/awendland/sending-email-from-a-forwarding-only-address-in-gmail",
  "visibility": "public"
}

The Harvard Alumni Association offers a forwarding-only email address for alums at `custom_username@alumni.harvard.edu` (anyone with a Harvard Key can access it [here](https://www.pin1.harvard.edu/cas/login?service=https%3A%2F%2Fcommunity.alumni.harvard.edu%2Flogin%2Fcas)). They state that,

> A forwarding address is not a stand-alone email account. Rather, it is a service that will forward messages to your existing email address. ... By default, your outgoing mail will display the email address to which your `name@alumni.harvard.edu` address is forwarding

However, email allows messages to be sent on behalf of other accounts. Officially Gmail doesn't support this for accounts that it can't log into using SMTP, but there is a workaround that lets you use Gmail's own SMTP servers to send the messages.

This stackexchange answer discusses how: [(John) you can simply use the Gmail SMTP server, as long as you use Google two-step authentication](https://web.archive.org/web/20190821190319/https://webapps.stackexchange.com/questions/66228/add-new-alias-to-gmail-without-smtp-forwarding-only-address/72975#72975).

The first time you attempt to add the account it may fail (I received some generic "Service is temporarily unavailable" for both accounts I setup) but on a second attempt immediately after it worked fine.

If you're just setting up the forwarding address don't forget to wait a few hours for it to get configured because you'll have to enter a confirmation code sent to it to finalize things.
