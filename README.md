# si5-prog-web-project
## Backend repository

## How to start the project :
```bash
$ cd app/main
$ docker-compose up -d  
$ npm i 
$ npm start
```

## You can see the api documentation on :
```text
GET localhost:8080/api
```

## How to send request on jwt protected endpoint
A jwt token is returned on a successful login.

On postman, you can send a request on a protected endpoint by this way : https://learning.postman.com/docs/sending-requests/authorization/#bearer-token  

Here is a way in React to add the jwt in a header : 

```typescript
showTransactionList = () => {
    superagent
        .post('http://localhost:8080/api/sales-points')
        .set('Authorization', 'Bearer ' + this.token)
        .accept('application/json')
        .then(res => {
            const posts = JSON.stringify(res.body);
            console.log(posts);
        })
        .catch((err) => {
            console.log(err);
            throw err;                    
        });
}
```

## How to populate backend remotely :
```text
POST localhost:8080/api/sales-points?method=remote
```
