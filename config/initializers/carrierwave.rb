require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key:  ENV["AWS_SECRET_ACCESS_KEY"],
    region: 'ap-northeast-1',
    region:                ENV['ARTIFACTS_REGION']
  }

  config.fog_directory  = 'upload-chatspace1'
  config.asset_host = 'https://ap-northeast-1.amazonaws.com/upload-chatspace1'
end

# Default value for default_env is {}
