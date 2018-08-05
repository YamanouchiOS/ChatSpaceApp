# config valid only for current version of Capistrano
lock '3.11.0'

set :application, 'ChatSpaceApp'
set :repo_url,  'git@github.com:YamanouchiOS/ChatSpaceApp.git'


set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.3.1'
set :pty, true

set :ssh_options, auth_methods: ['publickey'],
                  keys: ['/Users/yamanouchitomoaki/.ssh/chatspacekey.pem']

set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end

set :default_env, {
  rbenv_root: "/usr/local/rbenv",
  path: "/usr/local/rbenv/shims:/usr/local/rbenv/bin:$PATH",
  IMG_UP_AWS_S3_ACCESS_KEY_ID: ENV["IMG_UP_AWS_S3_ACCESS_KEY_ID"],
  IMG_UP_AWS_S3_SECRET_ACCESS_KEY: ENV["IMG_UP_AWS_S3_SECRET_ACCESS_KEY"]
}
end
