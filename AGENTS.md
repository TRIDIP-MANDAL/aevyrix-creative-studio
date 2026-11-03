<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Packages, FAQ and official contacts remain in site-data; published site_content overlays service defaults and adds concept portfolio entries through public server functions, preserving the original artwork before owner content is supplied.
- Official team defaults live in team-data and use one shared TeamGrid on home and team pages; published CMS profiles override matching keys or names without duplication so owner edits remain supported.
- Admin operations use authenticated server functions plus database role policies; no self-service role assignment or automatic first-user admin, to prevent privilege escalation.
- Quotations are saved as downloadable drafts only; saving does not imply email delivery, payment, or order confirmation.
- Public forms insert through server functions in src/lib/forms.functions.ts using a publishable client + anon INSERT-only RLS; no public reads of inquiries/messages.
- Quantize computed diagram coordinates before rendering so server and browser floating-point differences cannot cause hydration mismatches.
- Public content routes own self-referencing canonical and Open Graph URLs; use relative paths until a public domain exists and never inherit a root canonical. Structured data reflects only verified agency details and published services, without draft pricing, ratings or invented locations.
