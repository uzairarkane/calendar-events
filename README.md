```npm install```

# Set following env variables additional to .env.example file

```GOOGLE_CLIENT_ID=...```
```GOOGLE_CLIENT_SECRET=...```
```REDIRECT_URI=http://localhost:3333/google/callback```

# After setting the env run the following commands
```node ace migration:run```
```node ace serve --watch```


# Following is the order of endpoints that you need to utilize.
1. Signup (name, email, password)
2. Login (email, password)
3. Get google auth URL (place retrieved URL in any browser to log into your google account.)
4. Get events list
