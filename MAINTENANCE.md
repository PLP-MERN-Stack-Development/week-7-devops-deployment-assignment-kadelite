# 🛠️ Maintenance & Operations Plan

## 1. Regular Updates & Patches
- **Dependencies:**
  - Run `pnpm update` monthly for both client and server.
  - Review and apply security patches as soon as they are released.
- **Node.js:**
  - Monitor for new LTS releases and update as needed.
- **Render Platform:**
  - Check for platform notices and apply updates as recommended.

## 2. Monitoring
- **Uptime Monitoring:**
  - Use UptimeRobot or Render’s built-in monitoring.
  - Monitor `/api/health` endpoint for backend health.
- **Error Tracking:**
  - Sentry is integrated for both frontend and backend.
  - Review Sentry dashboard weekly for new issues.
- **Performance Monitoring:**
  - Use Sentry APM for slow transactions and bottlenecks.
  - Use Render dashboard for server resource usage (CPU, RAM).

## 3. Backups
- **MongoDB Atlas:**
  - Enable automated daily backups in the Atlas dashboard.
  - Test restores quarterly.
- **Self-hosted MongoDB:**
  - Use `mongodump` to create daily backups.
  - Store backups securely (e.g., AWS S3, Google Cloud Storage).
  - Automate with a cron job or Render cron job.

## 4. Rollback Procedures
- **Frontend/Backend:**
  - If a deployment causes issues, revert to the previous commit in GitHub and push to trigger redeploy.
  - Use Render’s “Manual Deploy” to redeploy a previous successful build if needed.
- **Database:**
  - Restore from the most recent backup using MongoDB Atlas or `mongorestore`.

## 5. Documentation
- **Deployment:**
  - See `PRODUCTION_CHECKLIST.md` for deployment steps.
- **Rollback:**
  - Document the last known good commit SHA after each successful deployment.
  - Keep a log of backup/restore operations.

## 6. Scheduling
- **Weekly:**
  - Review Sentry and Render dashboards for errors and performance.
  - Check for dependency updates.
- **Monthly:**
  - Test backup and restore procedures.
  - Review and update documentation.
- **Quarterly:**
  - Review security settings and access controls.

---

**For questions or incidents, document all actions and notify the team.** 