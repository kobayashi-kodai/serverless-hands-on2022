'use strict';

const aws = require('aws-sdk');
const docClient = new aws.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: 'ap-northeast-1',
});

module.exports.handler = async (event, context) => {
  const params = {
    // DynamoDBのテーブル名を指定
    TableName: 'YOUR DDB TABLE NAME',
    Key: {
      // DynamoDBのKeyを指定
      'id': 'YOUR KEY',
    },
  };

  let redirectUrl;
  try {
    // DynamoDBのテーブルにurlというKeyを追加し、その値に任意のリダイレクト先を指定
    const result = await docClient.get(params).promise();
    redirectUrl = result.Item.url;
  } catch (e) {
    // 失敗した場合はエラーメッセージを出力してデフォルトのリダイレクト先を指定
    console.error(e, e.stack);
    redirectUrl = 'https://www.google.co.jp';
  }

  return {
    location: redirectUrl,
  };
};
