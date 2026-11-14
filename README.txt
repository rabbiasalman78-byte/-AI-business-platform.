NEXORA BUSINESS: customer website package

OPEN IT NOW (NOT LIVE, ON YOUR OWN COMPUTER)
Unzip, then double-click public/index.html. Click "Open workspace" to see the customer dashboard.
AI buttons will not work in this preview until you run the server with an API key (below).
Your private cost chart is a separate file (founder-costs-PRIVATE.html). Never upload it.

PUT IT ONLINE WITH GITHUB (do this, not GitHub Pages)
1. Unzip first. Upload the UNZIPPED files (server.js, package.json, .gitignore, README.txt and the public folder) to a new GitHub repository. Do not upload the .zip itself. Make the repository private if you can.
2. NEVER put your API key in GitHub or in any file. It goes only in the host's settings (step 3).
3. GitHub Pages cannot run server.js and does not allow commercial sites, so use a Node.js host that deploys from GitHub (for example Render or Railway; check their current plans). Connect your repository, set the start command to: npm start, and add the environment variable ANTHROPIC_API_KEY.
4. Open the address the host gives you.
If you only want the pages without AI, any static host works (for example Netlify or Cloudflare Pages), but the AI buttons will not work.

WHAT IS INSIDE
public/index.html  Landing page customers see first
public/app.html    The customer workspace (dashboard, Business AI, departments, projects, library)
server.js          Small server that serves the site and connects the AI (keeps your key secret)
package.json       Start command

WHAT WORKS
- The whole workspace works in the browser.
- AI features work once the server has your Anthropic API key (step 2 below).
- Each visitor's projects, library and answers are saved only in their own browser.
  There are NO accounts, logins or payments yet, and no admin dashboard across customers.
  Those need a database and sign-in, which a developer should add next.

STEPS (beginner friendly)
1. Get an API key from console.anthropic.com. API use is paid by you, per request.
2. Choose a host that runs Node.js 18 or newer (for example Render, Railway or Fly.io; check their current plans).
   Upload this folder, set the start command to:  npm start
   Add an environment variable named ANTHROPIC_API_KEY with your key.
3. Open your site address. The landing page opens first; "Open workspace" goes to the app.

TEST ON YOUR OWN COMPUTER
- Install Node.js, open a terminal in this folder, then run:
    ANTHROPIC_API_KEY=your_key node server.js      (Mac/Linux)
    set ANTHROPIC_API_KEY=your_key && node server.js   (Windows)
- Visit http://localhost:3000

WHICH AI MODEL IS USED
Chat and department results use Haiku 5.5 (cheap). Full product creation uses Sonnet 5.5 (better for long writing).
Change them with the host variables MODEL_SMALL and MODEL_BIG if you want.

PROTECT YOUR MONEY
- server.js limits each visitor to 30 AI requests per hour. Change the number in server.js if needed.
- Anyone can use your AI until you add accounts. Set a spending limit in your Anthropic console.
- Pricing, plans and a real terms/privacy page are placeholders you must complete before launch.

NEXT STEPS FOR A DEVELOPER
User accounts and login, a database for customer data, payments, plan limits, an admin dashboard for you, email, storefront integrations.

MAKE IT AN INSTALLABLE APP (already built in)
Once the site is live on https (not on your own computer), customers can install it:
- Android Chrome: menu > Install app / Add to Home screen.
- iPhone Safari: Share > Add to Home Screen.
It then opens full screen with the NEXORA icon, like an app.
Files that do this: public/manifest.webmanifest, public/sw.js, the icon PNG files.
For Google Play and the App Store you need a store wrapper (PWABuilder or Capacitor) and a developer account.
