# Node Blog Api

## Api Point

```
localhost:8000/api/v1/auth/signup
{
    "name":"admin",
    "email":"admin@gmail.com",
    "password":"1234567"
}
```

```
localhost:8000/api/v1/auth/signin
{
    "email":"admin@gmail.com",
    "password":"1234567"
}
```

```
localhost:8000/api/v1/auth/send-verification-email
```

### All End Point

### Technology

- Node
- Express
- Mongoose
- MongoDb
- Express Validator
- bcryptjs
- jsonwebtoken
- nodemailer
