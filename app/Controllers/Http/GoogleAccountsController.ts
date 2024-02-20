// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { google } from "googleapis";
import GoogleAccount from "App/Models/GoogleAccount";

export default class GoogleAccountsController {
  async createURL({ auth, response }) {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
      const scopes = [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/userinfo.profile",
      ];

      let url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: auth.user.id,
      });

      return response.send({ message: "Success.", url });
    } catch (error) {
      console.error(error);
      return response.status(400).send(error);
    }
  }

  async callback({ request, response }) {
    try {
      const { code, state } = request.all();
      console.log(state, "callback query", code);
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
      const res = await oauth2Client.getToken(code);

      oauth2Client.setCredentials(res.tokens);
      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2",
      });
      const { data } = await oauth2.userinfo.get();
      console.log(data);

      const existingAccount = await GoogleAccount.findBy('googleId', data.id)
      if(existingAccount){
        return response.send({message: "Fail", description: "This account is already authorized."})
      }

      let googleAccount = new GoogleAccount();
      googleAccount.googleId = data.id;
      googleAccount.name = data.name;
      googleAccount.token = code;
      googleAccount.userId = state;
      await googleAccount.save();

      return response.send({ message: "Success." });
    } catch (error) {
      console.error(error);
      return response.status(400).send(error);
    }
  }

  async getEvents({ auth, response }) {
    try {
      let googleAccounts = await GoogleAccount.query().where(
        "user_id",
        auth.user.id
      );
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.REDIRECT_URI
      );

      let results: any = [];
      for (var googleAccount of googleAccounts) {
        const data = await oauth2Client.getToken(googleAccount.token);
        console.log(data);

        oauth2Client.setCredentials(data.tokens);

        const calendar = google.calendar({
          version: "v3",
          auth: oauth2Client,
        });

        const eventsList = await calendar.events.list({
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime",
        });
        const events = eventsList.data.items;
        results.push({
          id: googleAccount.googleId,
          name: googleAccount.name,
          events,
        });
      }

      return response.send({ message: "Success.", data: results });
    } catch (error) {
      console.error(error);
      return response.status(400).send(error);
    }
  }
}
