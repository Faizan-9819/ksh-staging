module.exports = {
  apps: [
    {
      name: "ksh-2026-infra",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 5000",
      cwd: __dirname,
      // Single instance in fork mode — on a 2GB server, cluster mode's extra
      // Next.js worker processes cost more RAM than the throughput gain is
      // worth here and raise real OOM risk; this is the safe default for
      // this box's size.
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      restart_delay: 3000,
      max_restarts: 50,
      min_uptime: "10s",
      // The actual fix for "gets slower the longer it stays up": a long-
      // running Next.js server's heap grows over days/weeks (route cache,
      // image-optimization buffers, held request contexts) until GC has to
      // work harder to keep up, which is what reads as a gradual slowdown.
      // PM2 kills and cleanly restarts the process the moment its RSS
      // crosses this ceiling — sized to leave headroom under a 2GB box
      // (OS + Cloudways' own services + Apache/nginx reverse proxy already
      // claim a meaningful slice) rather than waiting for an actual crash.
      max_memory_restart: "700M",
      // Caps Node's old-space heap to match — without this the process can
      // still balloon toward max_memory_restart's ceiling purely from V8
      // deferring garbage collection as long as it's allowed to, rather
      // than collecting proactively.
      node_args: "--max-old-space-size=600",
      // PM2's own stdout/stderr logs grow unbounded by default — on a
      // small disk that eventually slows I/O for everything, including the
      // app itself. `pm2 install pm2-logrotate` (a one-time step on the
      // server, not something this config file can install on its own)
      // keeps that in check; see the note in pm2-deploy.sh.
      out_file: "logs/pm2-out.log",
      error_file: "logs/pm2-error.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
