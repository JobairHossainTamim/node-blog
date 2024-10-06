# Node Blog Api

## Api Point

```
Post:localhost:8000/api/v1/auth/signup
{
    "name":"admin",
    "email":"admin@gmail.com",
    "password":"1234567"
}
```

```
Post:localhost:8000/api/v1/auth/signin
{
    "email":"admin@gmail.com",
    "password":"1234567"
}
```

```
Post:localhost:8000/api/v1/auth/send-verification-email
{
    "email":"mohammadjobairhossain@gmail.com"
}

```

```
Post:localhost:8000/api/v1/auth/verify-user
{
    "email":"mohammadjobairhossain@gmail.com",
    "code":"367566"
}
```

```
Post:localhost:8080/api/v1/auth/forget-password-code
{

    "email":"mohammadjobairhossain@gmail.com"
}

```

```
Post:localhost:8080/api/v1/auth/recover-password

{

    "email":"mohammadjobairhossain@gmail.com",
    "code":"892273",
    "password":"12345678"
}
```

```
Get :{{url}}auth/current-user
```

# changed signin and generate token

- save it authorization : Bearer token_data

```
Put: localhost:8080/api/v1/auth/changed-password
{
    "oldPassword":"12345678",
    "newPassword":"Tamim123"
}
```

## update Profile

```
Put:localhost:8080/api/v1/auth/update-profile

{
    "name":"Tamijm" ,
    "email":""
}
```

# Category

```
Post : /api/v1/category


    {

    "title":"News",
    "desc":"Technology"
}

```

### Update category

```
Put : /api/v1/category/id
    {

    "title":"News",
    "desc":"Technology"
}

delete: /api/v1/category/id

get:/api/v1/category

```

### Get Query Search

```
Get: localhost:8080/api/v1/category?title=n
GET:localhost:8080/api/v1/category?size=2&page=1

```

### Upload File

```
Post: /file/upload

Delete : /file/image-del?key=653591415092_1727856686088_.jpg

```

- form data input image

#### Add Post

```
/post/

add
patch
delete
{
    "title":"TikTok purges accounts tied to Russian media over ‘covert influence’ efforts ahead of US election",
    "desc":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem  including versions of Lorem Ipsum.",
    "category":"66e7ceb872db07317faf4005",
    "file":"67021df40e95c04beb714cb2"
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
- multer
- path
-
