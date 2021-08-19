# 👷 Cloudflare Worker

Cloudflare Worker code for https://gamezbd-info.pages.dev
This project also need https://github.com/WeirdWood/gamez-telegram-scraper to be deployed

#### Wrangler

The project needs 2 secret environment variables to work correctly, to set them, use:

```
wrangler secret put PRESHARED_AUTH_HEADER_KEY
{enter your auth header key when asked, ex: "my-psk"}
wrangler secret put PRESHARED_AUTH_HEADER_VALUE
{enter your auth header value when asked, preferably a secure hash, ex: "3cd044d4e727811d192d67243b2289811d2daa42ba9762e16d13566b9a5397d8"}
```

Create a namespace named "BOSSES"
```
wrangler kv:namespace create "BOSSES"
```

Setting up your wrangler.toml file
```
...
account_id = "08bf68295952bbf06870b876cdf80ef3" # put your account_id here
...
{ binding = "BOSSES", id = "722c9229c21f4d17a060f70838e5ec70" } # put your BOSSES kv_id here
...
```

Running in development mode, you need to change kv_id in wrangler_toml from "id" to "preview_id", or create a different kv key for preview
```
wrangler preview
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

#### Worker whitelisting
Setup worker whitelist in "src/lib/utils.js"