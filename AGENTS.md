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

- Content pages use TanStack file routes and the shared AgencyLayout navigation/footer so every section is reachable as a standalone page.
- Source-based services and articles live in browser-safe data modules; page metadata uses pageMeta so each content route has its own social and search description.
