# si5-prog-web-project - Backend repository

## Team members
- [Anthony Barna](https://github.com/Anthony-Barna)
- [Leo Burette](https://github.com/LeoBurette)
- [Hadrien Bonato Pape](https://github.com/Hadrien-Bonato-Pape)
- [Jérôme Froment](https://github.com/JeromeFroment)

## Frontend repository
https://github.com/JeromeFroment/gas-price-ui

## How to start the project :
```bash
$ ./build.sh
$ ./run.sh
```

## You can see the api documentation on :
```text
GET localhost:8080/api
```

## How to send request on jwt protected endpoint
A jwt token is returned on a successful login. The token is valid one hour.  

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
