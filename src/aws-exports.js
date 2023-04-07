const awsmobile = {
    "aws_appsync_graphqlEndpoint": process.env.REACT_APP_aws_appsync_graphqlEndpoint,
    "aws_appsync_region": process.env.REACT_APP_aws_appsync_region,
    "aws_appsync_authenticationType": 'AMAZON_COGNITO_USER_POOLS',
    "aws_appsync_apiKey": null,
    "aws_cognito_user_pool_id": process.env.REACT_APP_aws_cognito_user_pool_id,
    "aws_cognito_user_pool_client_id": process.env.REACT_APP_aws_cognito_user_pool_client_id,
    "aws_cognito_username": process.env.REACT_APP_aws_cognito_username,
    "aws_cognito_pass": process.env.REACT_APP_aws_cognito_pass

};

export default awsmobile;