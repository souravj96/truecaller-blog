# Truecaller Blog Website Using WordPress REST API

 - ReacJS
 - Redux
 - Saga
 - Ant Design
 - Storybook
 
 
Run the application locally

``` 
npm i
npm start
```

 local url:
[http://localhost:3000](http://localhost:3000)
public url:
[https://truecaller-blog.s3.ap-south-1.amazonaws.com/index.html](https://truecaller-blog.s3.ap-south-1.amazonaws.com/index.html)

For wordpress POST API i have used AWS Lambda with APIgateway
Lambda code:
```
var request = require('request');
exports.handler = (event, context, cb) => {
    request.post({url: 'https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/'+JSON.parse(event.body).postId+'/related',form: {size:3}}, function (error, response, body) {
        cb(null, {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
              },
            body
        })
    });
};
```

To navigate Home page click on Truecaller logo.

Due to the time concern, I'm not able to write test scripts for this assessment and didn't test every edge case.
Hope this assessment will reflect my skills.