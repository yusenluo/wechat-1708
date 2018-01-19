DROP DATABASE IF EXISTS db;
CREATE DATABASE db
  DEFAULT CHARACTER SET utf8;

-- table message
DROP TABLE IF EXISTS db.message;
CREATE TABLE db.message (
  id       INT AUTO_INCREMENT PRIMARY KEY
  COMMENT 'id PK',
  question TEXT NOT NULL
  COMMENT 'question',
  answer   TEXT NOT NULL
  COMMENT 'answer'
)
  DEFAULT CHARACTER SET utf8
  COMMENT 'message table';

INSERT INTO db.message VALUE (NULL, '聊天吧', '好~');
INSERT INTO db.message VALUE (NULL, '你叫什么名字？', '我是机器人');
INSERT INTO db.message VALUE (NULL, '今天天气怎么样', '晴天，挺好的');

SELECT *
FROM db.message;