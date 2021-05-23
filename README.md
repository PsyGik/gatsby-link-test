# REF: https://github.com/gatsbyjs/gatsby/discussions/31548

## Application Structure:

I have a nav bar with 3 `Links`. 
- `/` = Home Page
- `/about/` = About Page
- `/contact/` = Contact Page

The main layout is pretty straightforward:

```jsx
import { Link } from "gatsby";
import React from "react";
import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="page-container">
      <nav className="nav">
        <Link className="link" activeClassName="active" to="/">
          Home
        </Link>
        <Link className="link" activeClassName="active" to="/about/">
          About
        </Link>
        <Link className="link" activeClassName="active" to="/contact/">
          Contact
        </Link>
      </nav>
      <main className="main">{children}</main>
      <footer className="footer">A Simple Gatsby Site</footer>
    </div>
  );
};
```

Since this is a Layout, I use it in `wrapRootElement` in `gatsby-browser.js` and `gatsby-ssr.js`. 

```jsx
import React from "react";
import { Layout } from "./src/components/Layout";

// Wraps every page in a component
export const wrapRootElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
```

The page looks like this:
![image](https://user-images.githubusercontent.com/5432911/119249371-9ea4b080-bbb5-11eb-8004-3bb9db6cf3d7.png)

## Problem:

Initial page load is fine. `activeClassName` adds the class to `Home` as expected. The problem however, occurs on a page reload. Here's a video which demonstrates that:

https://user-images.githubusercontent.com/5432911/119249393-e3c8e280-bbb5-11eb-927a-99104ad4b6df.mov

**Steps to replicate:**
- Clone the repo: https://github.com/PsyGik/gatsby-link-test
- `npm install` && `npm run build` && `npm run serve`
- Navigate to browser
- Goto to either `/about/` or `/contact/`
- Reload the page
- `Home` is highlighted, even though the page is on `/about/` or `/contact/`
- If I am on `/about/`, clicking on `/about/` has no effect. 
- In order to have the `activeClassName` working as before, I need to navigate to `/` and then it works like before. 

## Questions:

- Is this the intended behaviour of `activeClassName`?
- `partiallyActive` is not being used here. So why is the `/` still getting active styles even though it isn't the active page?
- If I have to use [`getProps`](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#use-getprops-for-advanced-link-styling) to fix this behaviour, then isn't this a bug with `Link` component?

