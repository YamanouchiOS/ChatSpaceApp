# READMEEs

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, unique: true|
|mail|string|null: false|

### Association
- has_many:groups,through:members
- has_many:messages
- has_many:members


##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, unique: true|

### Association
- has_many:users,though:members
- has_many:messages
- has_many:members


##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|string||

### Association
- belong_to:users
- belong_to:groups


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
