# PROJECT WORKFLOW & EXECUTION RULES

**Project:** Mr. Amit Haldar — GenAI Developer & Machine Learning Engineer Portfolio  
**Live Site:** https://amit-mlengineer.zynova.co.in/  
**GitHub Repository:** https://github.com/Martish-cloud/Amit-Halder-Machine-Learning-Engineer-  
**Target Branch:** `main`

These persistent project rules apply to all tasks performed in this codebase.

---

## 1. Fast and Focused Execution Mode
- Work in an implementation-first, efficient manner.
- Do not perform broad or speculative repository-wide scans.
- Inspect only the specific files directly relevant to the current user request (components, styles, assets, or config).
- Avoid repetitive re-inspection of files that have already been verified and unchanged.
- Proceed directly to implementation once requirements and target files are identified.
- Prioritize concise, actionable reporting over long theoretical preambles.

## 2. Dependency Management & Terminal Safety
- **No Unnecessary Installs:** Do not run `npm install` or `npm ci` for UI, styling, content, or asset changes. Only touch dependencies when `package.json` dependencies are explicitly added or modified.
- **Reproducible Lockfile:** When dependency operations are required, preserve versions and use `npm.cmd ci` with the validated lockfile.
- **Safe Command Handling:** Never leave long-running or unresponsive terminal commands active.
- **Process Monitoring:** Always verify background tasks and terminate any stalled or hanging processes immediately using task management tools. Never allow installation processes to block agent turns.

## 3. Mandatory GitHub Commit & Push After Every Task
- **Non-Negotiable Completion Condition:** Every completed task or code modification must be committed and pushed to the remote repository.
- A task is **ONLY** considered complete when:
  1. The requested code or design change is implemented.
  2. Targeted verification (`npm run build`) passes cleanly with zero errors.
  3. The changes are staged and committed with a descriptive commit message.
  4. The commit is pushed to `origin main` (`https://github.com/Martish-cloud/Amit-Halder-Machine-Learning-Engineer-`).
  5. The remote state is verified: `git rev-parse HEAD` equals `git rev-parse origin/main`.
- Never claim a task is completed if the remote repository does not contain the pushed commit.

## 4. Safe Git Protocols
- **Protect Existing Work:** Never discard uncommitted work or user changes.
- **Strictly Forbidden:**
  - `git reset --hard`
  - `git clean -fd`
  - Force pushing (`git push --force` or `-f`)
- Always inspect `git status` and `git diff` before staging to ensure only intended project files are included.
- In the event of a push failure or divergence, report the exact error honestly and resolve cleanly without overwriting work.

## 5. Platform & Environment Architecture
- **Workspace:** `c:\Users\askfo\OneDrive\Documents\WEBSITES\Machine Learning Engineer`
- **Build / Git Mirror:** `C:\Users\askfo\AppData\Local\Temp\portfolio_repo`
- Because Windows child terminal sessions run in a sandboxed security context where OneDrive NTFS permissions may restrict direct child file writes, file modifications are performed via IDE tools directly into the workspace, synchronized to the local mirror for clean building (`npm run build`) and git operations (`git push origin main`).
