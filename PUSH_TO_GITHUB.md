# Push to GitHub

Your project is committed locally. To push to GitHub:

## 1. Create a new repository on GitHub

1. Go to [github.com/new](https://github.com/new).
2. Set **Repository name** (e.g. `NzbServices` or `nizamabad-services`).
3. Choose **Public**.
4. Do **not** add a README, .gitignore, or license (you already have them).
5. Click **Create repository**.

## 2. Add remote and push

In a terminal, from the project folder run (replace `YOUR_USERNAME` and `REPO_NAME` with your GitHub username and repo name):

```bash
cd C:\Users\suman\OneDrive\Desktop\NzbServices

git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

**Example:** If your repo URL is `https://github.com/suman/nizamabad-services`:

```bash
git remote add origin https://github.com/suman/nizamabad-services.git
git branch -M main
git push -u origin main
```

If GitHub asks for credentials, use a **Personal Access Token** (not your password): GitHub → Settings → Developer settings → Personal access tokens.

## 3. Later: push more changes

```bash
git add -A
git commit -m "Your message"
git push
```
