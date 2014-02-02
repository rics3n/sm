#load 'deploy' if respond_to?(:namespace) 
# include uberspacify base recipes
require "bundler/capistrano"
require 'capistrano/ext/multistage'
#

set :stages, ["staging", "production"]
set :default_stage, "staging"
#set :stage_dir,     "app/deploy"

set :repository, "git@github.com:rics3n/sm.git"  # Your clone URL
set :scm, :git

set :application, "smallternative"

#set(:user)  { fetch(:uber_user) }
set(:branch) { uber_branch }

role(:web) { uber_server }
role(:app) { uber_server }
role(:db, :primary => true) { uber_server }

set :default_environment, {
  'PATH' => "$PATH:$HOME/bin"
}

def abort_red(msg)
  abort "  * \e[#{1};31mERROR: #{msg}\e[0m"
end


# optional variables
set(:domain)                { nil }
set(:passenger_port)        { 3001 } # random ephemeral port

set(:deploy_via)            { :remote_cache }
set(:git_enable_submodules) { 1 }

set(:keep_releases)         { 3 }

# uberspace presets
set(:deploy_to)               { "/var/www/virtual/#{user}/rails/#{application}" }
set(:home)                    { "/home/#{user}" }
set(:use_sudo)                { false }


ssh_options[:forward_agent] = true
default_run_options[:pty]   = true


after   'deploy:setup',           'daemontools:setup_daemon'
after   'deploy:setup',           'apache:setup_reverse_proxy'
after   'deploy:setup',           'postgres:setup_db'
before  'deploy:assets:precompile', 'bower:install'
before  'deploy:finalize_update', 'deploy:symlink_shared'
after   'deploy',                 'deploy:cleanup'

#namespace :deploy do
 # namespace :assets do
  #  task :precompile, :roles => :web, :except => { :no_release => true } do
   #   logger.info "Skipping asset pre-compilation because app is not using it"
    #end
  #end
#end

  # custom recipes
  namespace :uberspace do
    task :setup_svscan do
      run 'uberspace-setup-svscan ; echo 0'
    end
  end

  namespace :bower do
    task :install do
      run   "cd #{release_path} && bower install --quiet"
    end
  end

  namespace :postgres do
    task :setup_db do
      my_cnf = capture('cat ~/.my.cnf')
      config = {}
     
      config[stage] = {
        'adapter' => 'postgresql',
        'encoding' => 'unicode',
        'database' => "#{fetch :user}_rails_#{fetch :application}_#{stage}",
        'host' => 'localhost'
      }

      my_cnf.match(/^pg_user=(\w+)/)
      config[stage]['username'] = $1

      my_cnf.match(/^pg_password=(\w+)/)
      config[stage]['password'] = $1



      run "createdb #{config[stage]['database']} -E unicode -T template0; true"

      run "mkdir -p #{fetch :shared_path}/config"
      put config.to_yaml, "#{fetch :shared_path}/config/database.yml"
    end
  end


  namespace :daemontools do
    task :setup_daemon do
      daemon_script = <<-EOF
#!/bin/bash
export HOME=#{fetch :home}
source $HOME/.bash_profile
cd #{fetch :deploy_to}/current
exec bundle exec passenger start -p #{fetch :passenger_port} -e production 2>&1
      EOF

      log_script = <<-EOF
#!/bin/sh
exec multilog t ./main
      EOF

      run                 "mkdir -p #{fetch :home}/etc/run-rails-#{fetch :application}"
      run                 "mkdir -p #{fetch :home}/etc/run-rails-#{fetch :application}/log"
      put daemon_script,  "#{fetch :home}/etc/run-rails-#{fetch :application}/run"
      put log_script,     "#{fetch :home}/etc/run-rails-#{fetch :application}/log/run"
      run                 "chmod +x #{fetch :home}/etc/run-rails-#{fetch :application}/run"
      run                 "chmod +x #{fetch :home}/etc/run-rails-#{fetch :application}/log/run"
      run                 "ln -nfs #{fetch :home}/etc/run-rails-#{fetch :application} #{fetch :home}/service/rails-#{fetch :application}"

    end
  end

  namespace :apache do
    task :setup_reverse_proxy do
      htaccess = <<-EOF
RewriteEngine On
RewriteRule ^smallternative/(.*)$ http://localhost:#{fetch :passenger_port}/$1 [P]
      EOF
      path = fetch(:domain) ? "/var/www/virtual/#{fetch :user}/#{fetch :domain}" : "#{fetch :home}/html"
      run                 "mkdir -p #{path}"
      put htaccess,       "#{path}/.htaccess"
      run                 "chmod +r #{path}/.htaccess"
      run                 "uberspace-add-domain -qwd #{fetch :domain} ; true" if fetch(:domain)
    end
  end

  namespace :bower do
    task :install do
      run   "cd #{release_path} && bower install --quiet"
    end
  end


  namespace :deploy do
    task :start do
      run "svc -u #{fetch :home}/service/rails-#{fetch :application}"
    end
    task :stop do
      run "svc -d #{fetch :home}/service/rails-#{fetch :application}"
    end
    task :restart do
      run "svc -du #{fetch :home}/service/rails-#{fetch :application}"
    end

    task :symlink_shared do
      run "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    end
  end



# optional stuff from here

# By default, your app will be available in the root of your Uberspace. If you
# have your own domain set up, you can configure it here
# set :domain, 'www.dummyapp.com'

# By default, uberspacify will generate a random port number for Passenger to
# listen on. This is fine, since only Apache will use it. Your app will always
# be available on port 80 and 443 from the outside. However, if you'd like to
# set this yourself, go ahead.
# set :passenger_port, 55555

# By default, Ruby Enterprise Edition 1.8.7 is used for Uberspace. If you
# prefer Ruby 1.9 or any other version, please refer to the RVM documentation
# at https://rvm.io/integration/capistrano/ and set this variable.
#set :rvm_ruby_string, '1.9.3@rails-Tandemploy'

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
#namespace :deploy do
 #  task :start do ; end
  # task :stop do ; end
   #task :restart, :roles => :app, :except => { :no_release => true } do
     #run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
    # end
#end