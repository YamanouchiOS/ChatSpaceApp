
json.id   @message.id
json.name @message.user.name
json.content @message.content
json.created_at @message.created_at.to_s
json.image @message.image.url
