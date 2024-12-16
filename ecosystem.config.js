module.exports = {
  apps: [{
    name: 'quizzq',
    script: 'npm',
    args: 'start',
    env: {
      PORT: 4000,
      NODE_ENV: 'production'
    },
    watch: false,
    autorestart: true
  }]
} 