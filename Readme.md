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
{
    "email":"mohammadjobairhossain@gmail.com"
}

```

```
localhost:8000/api/v1/auth/verify-user
{
    "email":"mohammadjobairhossain@gmail.com",
    "code":"367566"
}
```

```
localhost:8080/api/v1/auth/forget-password-code
{

    "email":"mohammadjobairhossain@gmail.com"
}

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
