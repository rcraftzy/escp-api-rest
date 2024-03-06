module.exports = {
  apps : [{
    name: 'api',
    script: 'index.js',
    cwd: "/home/admin01/projects/api/src",
    autorestart: true,
    watch: false,
    max_memory_restart: '16',    
    env: {
      NODE_ENV: 'production' // Definir correctamente el entorno de producción
    }
  }],

  deploy : {
    production : {
      user : 'admin01',
      host : '192.168.0.4',
      ref  : 'origin/main',
      repo : 'git@github.com:rcraftzy/escp-api-rest',
      fetch: 'all',
      path : '/home/admin01/projects',
      'post-deploy' : 'git fetch && git merge origin/main && npm install && pm2 reload ecosystem.config.js --env production'     
    }
  }
}
