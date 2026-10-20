# Game On! — 29 December 2026

A complete green-and-purple redesign for the gaming fundraiser, ready for GitHub Pages. No build step, account, API key or paid service is required.

## The new games room

- Eight illustrated console stations, each connected to a CRT television.
- Click a game cover to animate its cartridge, disc or game card into the console.
- Short YouTube previews play inside the CRT, muted by default, with play/pause, sound and eject controls. Previews repeat unless reduced motion is enabled.
- All 13 games have a synopsis, developer, publisher, genre and release year. Years refer to the first release on the console shown, rather than a particular country or the original arcade release.
- Filter the full games list by fighting, racing, arcade/action, sports or tournaments. A game selected from the list loads into its console above.
- Tournament badges appear in the game shelf, game details and catalogue.

Console choices illustrate the games and do not promise particular hardware at the event. Rocket League uses promotional artwork; the other games use box art. Source links and video credits are included on the site.

## Event details

- Tuesday 29 December 2026, 11am–5pm, UK time.
- Location TBC.
- Wii Sports Bowling, Mario Kart 8 and Street Fighter 2 tournaments.
- Pokémon and Magic: The Gathering trading, Beyblade and board games.
- Fundraising for My Shining Star, with a link to the charity's official donation page.

The year is carried forward from the previous event page. 29 December 2026 is a Tuesday. The calendar download uses GMT, which is UK local time on this date. Tournament times, rules, admission details and a venue have not been invented.

## Preview locally

Extract the entire ZIP before opening the website. Opening `index.html` directly shows the page, artwork, animations and filters, but embedded YouTube playback needs the page to be served over HTTP or HTTPS. The site explains this and offers the original video link when opened as a local file.

For a full local preview, open a terminal in the extracted folder and run:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. Alternatively, upload the files to GitHub Pages. An internet connection is required for the videos; all other artwork, graphics, styling and interactions are bundled locally. Videos are loaded only after a game is selected. Browser autoplay rules may require pressing Play, even though sound starts muted.

The site does not download or redistribute gameplay videos. It uses the official YouTube player with source links and creator attribution. Video owners, regional restrictions, privacy settings and content blockers can affect availability. If a video fails, the CRT offers a direct link and a retry button.

## Publish on GitHub Pages

1. Extract this ZIP.
2. Upload **all the extracted files and the entire `assets` folder** to the root of your GitHub repository. Upload the contents, not the ZIP or an enclosing folder.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose your branch (usually `main`) and **/ (root)**, then save.
6. GitHub will display the website address when deployment finishes.

Keep these together:

```text
index.html
styles.css
app.js
data.js
consoles.js
credits.html
game-on-29-december.ics
.nojekyll
assets/
```

The README is optional on the live website. If replacing the previous single-file design, replace `index.html` and add all the new files and the assets folder. Relative paths support both a root domain and a GitHub repository subpath.

Official GitHub guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Future updates

- **Event text and tournament cards:** `index.html`.
- **Game facts, console associations and video selection:** `data.js`.
- **Colours, typography and responsive layout:** `styles.css`.
- **Console illustrations:** `consoles.js`.
- **Interactions and video handling:** `app.js`.
- **Source attribution:** `credits.html`.

When the venue is confirmed, replace every `Location TBC` in `index.html` and update the `LOCATION` field in the calendar file. Update the title, page description, visible dates and calendar together if the schedule changes.

To replace a video, edit its `videoId`, `videoCredit`, `videoTitle`, `start` and `clipLength` in `data.js`, and update the corresponding credit. Use a public video whose owner permits embedding. Start and clip length are in seconds.

## Verification

JavaScript syntax, all local asset paths, image decoding, event date and calendar formatting have been checked. Automated DOM checks exercise all 13 game selections, eight consoles, six filters, tournament markers, the insertion animation paths, playback controls, loop behavior, quick switching, eject, reduced motion and failure recovery. Video-control tests use a simulated player; they do not verify live playback.

The managed preview server was unavailable in the build environment. A visual browser check, mobile rendering check and live YouTube playback check remain unverified. Review the hosted page on desktop and mobile before announcing it.

This package is ready to upload and has not been published to GitHub.
