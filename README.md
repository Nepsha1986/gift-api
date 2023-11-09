# gift-api

## Development

### Database
At this time we do not have a strict flow for development. That is why we are trying to keep DB dumps locally.
As we are using MongoDB Atlass as a service, we are making dumps mannually and save them locally, we are using 'mongodump' and 'mongorestore' for this reason.

The flow is to make a dump of production database:

```
    mongodump --uri=<mongodb-uri> -d=gift-ideas
```
After dump is ready, it will create a folder "gift-ideas". To create a dev version - rename "gift-ideas" to "gift-ideas_dev" and run:

```
 mongorestore --uri=<mongodb-uri>
```