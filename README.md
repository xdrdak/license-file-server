# licenses-file-server

Dumb way to list available licenses that can be easily `curl`-ed locally.

## Starting Locally

```
deno run --watch --allow-net --allow-read mod.ts
```

And then visit `localhost:8000`.

## Syncing data from choosealicense.com

```
./sync.sh
```

## Contributing a new license

Please prefer contributing to [choosealicense](https://github.com/github/choosealicense.com).
